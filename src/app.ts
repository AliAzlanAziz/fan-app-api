import cors from "cors";
import * as dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";

import connectDB from "./config/db";
import userRoutes from "./routes/user";
import artistRoutes from "./routes/artist";
import bankRoutes from "./routes/bank";
import posterRoutes from "./routes/poster";
import commonRoutes from "./routes/common";
import favoriteRoutes from "./routes/favorite";
import commentRoutes from "./routes/comment";
import donationRoutes from "./routes/donation";
import packageRoutes from "./routes/package";
import exchangeRoutes from "./routes/exchange";

dotenv.config({ path: __dirname + "/config/config.env" });

connectDB();

const app: Express = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use('/uploadedImages', express.static(__dirname + "/uploadedImages"));
app.use('/uploadedFiles', express.static(__dirname + "/uploadedFiles"));

app.use(cors());

if (process.env.NODE_ENV == "developement") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response, next: NextFunction) =>
  res.status(200).json({ message: "Server running" })
);

app.use("/user", userRoutes);
app.use("/artist", artistRoutes);
app.use("/bank", bankRoutes);
app.use("/poster", posterRoutes);
app.use("/common", commonRoutes);
app.use("/favorite", favoriteRoutes);
app.use("/comment", commentRoutes);
app.use("/donation", donationRoutes);
app.use("/package", packageRoutes);
app.use("/exchange", exchangeRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server ready at http://localhost:${process.env.PORT}`)
);
