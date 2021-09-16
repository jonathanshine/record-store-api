// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
const { Schema, model } = mongoose;



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
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: false
    },
    cart: [{ record: { type: Schema.Types.ObjectId, required: false }, quantity: { type: Number, required: false}
    }],
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



// MODEL --------------------------------------------
const User = model("User", UserSchema);

export default User;