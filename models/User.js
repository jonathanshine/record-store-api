// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import jwt from "jsonwebtoken";
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
        validate: {
            validator: async (value) => {
                const User = mongoose.model("User");
                const user = await User.findOne({ username: value} );
                if (user) return false;
                else return true;
            },
            message: props => `${props.value} is already taken!`
        },
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


// METHODS ------------------------------------------
UserSchema.methods.generateAuthToken = function () {
    const user = this;

    const token = jwt.sign({ _id: user._id }, "thisIsTheMostSecretStringEver", { expiresIn: "2d" });
    
    console.log(`We created a token for user ${user._id} --> ${token}`);

    return token;
};
// --------------------------------------------------

// MODEL --------------------------------------------
const User = model("User", UserSchema);

export default User;