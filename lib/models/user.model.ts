//this is used for how the data will be saved in mongoDB user.
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  threads: [  //one user can have multiple reference to specific thread stored in database . 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: { //
    type: Boolean,
    default: false,
  },
  communities: [ //one user can belong to multiple communities.
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

// for first time it mongoose model wont exist ,  so first it will create using userSchema from line 4.
const User = mongoose.models.User || mongoose.model("User", userSchema); 

export default User;
