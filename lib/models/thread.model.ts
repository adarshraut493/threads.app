//To modify our Database

import mongoose from "mongoose";
import { string } from "zod";
const threadSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread'  // recursion calling itself used for comment in thread
    }]
});

const User = mongoose.models.Thread // this wont exit for the first time it run 
    || mongoose.model('Thread', threadSchema);// (this will run when it will run for first time to make the mongoose based on the user schema  )



export default User;