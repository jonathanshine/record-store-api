// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
const { Schema, model } = mongoose;



// SCHEMA -------------------------------------------
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
    }
},
{
    versionKey: false,
    timestamps: true
});
// --------------------------------------------------



// MODEL --------------------------------------------
const Record = model("Record", RecordSchema);

export default Record;