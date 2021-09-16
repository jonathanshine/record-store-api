// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
const { Schema, model } = mongoose;



// SCHEMA -------------------------------------------
const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    records: [{
        record: {
            type: Schema.Types.ObjectId,
            ref: "Record"
        },
        quantity: {type: Number, required: true },
        _id: false    
    }]
}, {
    versionKey: false
});
// --------------------------------------------------



// MODEL --------------------------------------------
const Order = model("Order", OrderSchema);

export default Order;