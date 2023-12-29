//To modify our Database

import mongoose from "mongoose";
const communitySchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread'
    },
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

});

const Community = mongoose.models.Community // this wont exit for the first time it run 
    || mongoose.model('Community', communitySchema);// (this will run when it will run for first time to make the mongoose based on the user schema  )
export default Community;