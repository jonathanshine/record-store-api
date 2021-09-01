// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
const { Schema, model } = mongoose;



// SCHEMA -------------------------------------------
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
});
// --------------------------------------------------



// MODEL --------------------------------------------
const User = model("User", UserSchema);

export default User;