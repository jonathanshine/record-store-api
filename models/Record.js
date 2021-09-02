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


const RecordSchema = new Schema({
    cover: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    artist: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    address: AddressSchema
},
{
    versionKey: false,
    timestamps: true
});
// --------------------------------------------------



// MODEL --------------------------------------------
const Record = model("Record", RecordSchema);

export default Record;