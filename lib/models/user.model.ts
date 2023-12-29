//To modify our Database

import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    id:{type:String , required :true },
    username :{ type: String , required: true , unique:true },
    name:{type:String,required:true },
    image:String,
    bio:String,
    threads:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Thread'
        }
    ],
    onboarded:{
        type:Boolean,
        default:false,
    },
    communities:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Community'    // reference ot community instances 

        }
    ]

});

const User = mongoose.models.User // this wont exit for the first time it run 
|| mongoose .model('User',userSchema);// (this will run when it will run for first time to make the mongoose based on the user schema  )
                                   


export default User;