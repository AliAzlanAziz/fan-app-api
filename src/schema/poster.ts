import { model, Schema, Types } from "mongoose";

const posterSchema = new Schema({
  _id: {
    type: Types.ObjectId,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date
  },
  location: { 
    type: String
  },
  description: { 
    type: String 
  },
  fanNotes: { 
    type: String 
  },
  imagesUrls: [
    {
      type: String,
    },
  ],
  totalViews: { 
    type: Number, 
    default: 0
  },
  totalDonations: { 
    type: Number, 
    default: 0
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  },
});

const Poster = model("Poster", posterSchema);

export default Poster;
