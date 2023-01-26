import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { UserRoles } from "../enum/userRole.enum";
import { MongooseGroup } from "../models/mongooseGroup.model";
import { UserModel } from "../models/user.model";

import { UserSigninModel } from "../models/userSignin.model";
import { UserSignupModel } from "../models/userSignup.model";
import { UserUpdateModel } from "../models/userUpdate.model";
import {
  decrementTotalFavoritesBy1,
  findTopNArtistsByMostFavoritesAndViewsCount,
  findUserByEmailAndRole,
  findUsersByArtistName,
  incrementTotalFavoritesBy1,
  updateUserById,
} from "../repo/user";
import User from "../schema/user";
import { getArtistTotalHearts } from "./donation";
import {
  getUserApprovedHearts,
  getUserHeartsSumGroupByStatus,
  getUserPendingHearts,
} from "./exchange";

const saltRounds = 10;

export const signUp = async (user: UserSignupModel, res: Response) => {
  try {
    const userExist = await findUserByEmailAndRole(user.email, UserRoles.USER);
    if (userExist) {
      return res.status(200).json({
        success: false,
        message: "An account already exists with entered email",
      });
    }

    if (!user.password || !user.confirmPassword) {
      return res.status(200).json({
        success: false,
        message: "Must provide password and confirmPassword",
      });
    }

    if (user.password != user.confirmPassword) {
      return res.status(200).json({
        success: false,
        message: "Password does not match with confirm password!",
      });
    }

    const hash = bcrypt.hashSync(user.password, saltRounds);

    const newUser = new User({
      _id: new Types.ObjectId(),
      name: user.name,
      email: user.email,
      password: hash,
      artist: {
        name: null,
        description: null,
      },
      role: UserRoles.USER,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "15d" }
    );

    return res.status(200).json({
      success: true,
      message: "Successfully signed up!",
        token: token,
        user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error signing up!",
    });
  }
};

export const signIn = async (user: UserSigninModel, res: Response) => {
  try {
    const result = await findUserByEmailAndRole(user.email, UserRoles.USER);
    if (!result) {
      return res.status(200).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const hash = bcrypt.compareSync(user.password, result.password);

    if (hash) {
      const token = jwt.sign(
        {
          id: result._id,
          role: result.role,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: "15d" }
      );

      return res.status(200).json({
        success: true,
        message: "Successfully signed in",
        token: token,
        user: result,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error signing in",
    });
  }
};

export const adminSignUp = async (user: UserSignupModel, res: Response) => {
  try {
    const userExist = await findUserByEmailAndRole(user.email, UserRoles.ADMIN);
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "An account already exists with entered email",
      });
    }

    if (!user.password || !user.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Must provide password and confirmPassword",
      });
    }

    if (user.password != user.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match with confirm password!",
      });
    }

    const hash = bcrypt.hashSync(user.password, saltRounds);

    const newUser = new User({
      _id: new Types.ObjectId(),
      name: user.name,
      email: user.email,
      password: hash,
      artist: {
        name: null,
        description: null,
      },
      role: UserRoles.ADMIN,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Successfully signed up!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error signing up!",
    });
  }
};

export const adminSignIn = async (user: UserSigninModel, res: Response) => {
  try {
    const result = await findUserByEmailAndRole(user.email, UserRoles.ADMIN);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User does not exist!",
      });
    }

    const hash = bcrypt.compareSync(user.password, result.password);

    if (hash) {
      const token = jwt.sign(
        {
          id: result._id,
          role: result.role,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: "15d" }
      );

      return res.status(200).json({
        success: true,
        message: "Successfully signed in!",
        token: token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Incorrect Credentials!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error signing in!",
    });
  }
};

export const userProfile = async (user: UserModel, res: Response) => {
  try {
    if (user.artist.name && user.artist.name.length > 0) {
      // const pendingHearts = await getUserPendingHearts(user._id);
      // const approvedHearts = await getUserApprovedHearts(user._id)
      // const hearts = {
      //   totalHearts,
      //   pendingHearts,
      //   approvedHearts,
      // };
      const [totalHearts, hearts] = await Promise.all([
        getArtistTotalHearts(user._id),
        getUserHeartsSumGroupByStatus(user._id),
      ]);

      const total = (totalHearts[0] as MongooseGroup)?.total || 0;

      return res.status(200).json({
        success: true,
        user: {
          ...user,
          hearts: {
            ...hearts,
            total: total,
            remaining: total - hearts.pending - hearts.approved
          },
        },
      });
    }

    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Interal server error",
    });
  }
};

export const updateUserProfile = async (
  user: UserModel,
  updatedUser: UserUpdateModel,
  res: Response
) => {
  try {
    if (updatedUser.isUpdatingPassword) {
      if (!updatedUser.password) {
        return res.status(400).json({
          success: false,
          message: "Password must be provided when updating password!",
        });
      }

      const hash = bcrypt.hashSync(updatedUser.password, saltRounds);
      updatedUser.password = hash;
    } else {
      delete updatedUser.password;
    }

    await updateUserById(user._id, updatedUser);

    return res.status(200).json({
      success: true,
      name: updatedUser?.name,
      imageUrl: updatedUser?.imageUrl,
      message: "Successfully updated user!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interal server error",
    });
  }
};

export const getTopNArtistsByMostFavoritesAndViewsCount = async (
  count: number
) => {
  return await findTopNArtistsByMostFavoritesAndViewsCount(count);
};

export const getUsersByArtistName = async (name: string) => {
  return await findUsersByArtistName(name);
};

export const incrementUserTotalFavoritesBy1 = (userId: string) => {
  return incrementTotalFavoritesBy1(userId);
};

export const decrementUserTotalFavoritesBy1 = (userId: string) => {
  return decrementTotalFavoritesBy1(userId);
};
