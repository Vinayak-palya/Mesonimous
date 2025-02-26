import mongoose, { Schema, Document } from "mongoose";

// interface definition for typesafety of the data
export interface Message extends Document{
    content:string;
    createdAt:Date;
}

const MessageSchema : Schema<Message> = new Schema ({
    content: {
        type:String, 
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
    }
});

export interface User extends Document {
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    messages:Message[];
};
const UserSchema: Schema<User> = new Schema({
    username: {
        type:String,
        required:[true, "Usrname is required"],
        unique:true,
        trim:true,
        minlength:[3, "Username must be atleast 3 characters long"],
        maxlength:[20, "Username must be atmost 20 characters long"],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"],
    },
    password:{
        type:String,
        required:true,
        minlength:[6, "Password must be atleast 6 characters long"],
    },
    isVerified:{
        type:Boolean,
        required:true,
        default:false,
    },
    verifyCode:{
        type:String,
        required:[true, "Verification code is required"],
    },
    verifyCodeExpiry: {
        type:Date,
        required:[true, "Verification code expiry is required"],
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true,
    },
    messages:[MessageSchema],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));
export default UserModel;