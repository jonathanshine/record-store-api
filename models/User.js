// IMPORTS ------------------------------------------
import jwt from "jsonwebtoken";
import config from '../config/config.js';
import bcrypt from "bcryptjs";
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
// --------------------------------------------------


// SCHEMA -------------------------------------------
const AddressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    streetNo: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    }
},
{
    _id: false,
    versionKey: false
});

const UserSchema = new Schema({
    username: {
        type: String,
        // validate: {
        //     validator: async (value) => {
        //         const User = mongoose.model("User");
        //         const user = await User.findOne({ username: value} );
        //         if (user) return false;
        //         else return true;
        //     },
        //     message: props => `${props.value} is already taken!`
        // },
        required: [ true, "Username name is required" ],
        unique: true
    },
    email: {
        type: String,
        required: [ true, "Email name is required" ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, "Password name is required" ]
    },
    firstName: {
        type: String,
        required: [ true, "First name is required" ]
    },
    lastName: {
        type: String,
        required: [ true, "Last name is required" ]
    },
    birthday: {
        type: Date,
        required: false
    },
    cart: [
        {
            record: { type: Schema.Types.ObjectId, ref: "Record", required: false },
            quantity: { type: Number, required: false}
    }, { _id: false }],
    address: AddressSchema
},
{
    versionKey: false,
    timestamps: true,
    id: false,
    toJSON: {
        virtuals: true
    }
});
// --------------------------------------------------



// VIRTUALS -----------------------------------------
UserSchema.virtual("fullName").get(function() {
    return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual("age").get(function() {
    if (this.birthday) {
    const dateInMil = new Date() - this.birthday;
    return Math.floor( dateInMil / 31536000000 );
    };
});
// --------------------------------------------------


// HASHING ------------------------------------------
UserSchema.pre("save", function(next) {
    const user = this;
    if(!user.isModified("password")) return next();
    user.password = bcrypt.hashSync(user.password, 10);
    next();
});

// UserSchema.pre("findOneAndUpdate", function() {
//     const user = this;
//     if(user.isModified("password")) {
//         user.password = bcrypt.hashSync(user.password, 10);
//         console.log("I AM THE USER TO BE UPDATED -->", user);  
//     };
// });
// --------------------------------------------------


// METHODS ------------------------------------------
UserSchema.methods.generateAuthToken = function () {
    const user = this;

    const token = jwt.sign({ _id: user._id }, config.secretKey, { expiresIn: "2d" });
    
    console.log(`We created a token for user ${user._id} --> ${token}`);

    return token;
};
// --------------------------------------------------


// STATICS ------------------------------------------
UserSchema.statics.findByToken = function (token) {
    const User = this;
    
    try {

    let decodedInfo = jwt.verify(token, config.secretKey);

    return User.findOne({ _id: decodedInfo._id });
    } catch (error) {
        return;    
    }
};
// --------------------------------------------------


// MODEL --------------------------------------------
const User = model("User", UserSchema);

export default User;