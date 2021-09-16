// IMPORTS ------------------------------------------
import createError from "http-errors";
import Order from "../models/Order.js";
// --------------------------------------------------


export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.params.id }).populate("records.record").populate("userId");
        res.json( orders );
    } catch (error) {
        next( error );
    }
};

export const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById( id ).populate("records.record", "title price").populate("userId");
        if (!order) throw new createError(404, `No order with id --> ${id} was found`);
        res.json( order );
    } catch (error) {
        next( error );
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete( id );
        if (!order) throw new createError(404, `No order with id --> ${id} was found`);
        res.json({
            success: `Order with id: ${id} was deleted.`,
            order: order
        });
    } catch (error) {
        next( error );
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const order = await Order.findByIdAndUpdate(
            id,
            newData,
            { new: true }
        );
        if (!order) throw new createError(404, `No order with id --> ${id} was found`);
        res.json( order );
    } catch (error) {
        next( error );
    }
};

export const createOrder = async (req, res, next) => {
    try {
        const data = req.body;
        const order = await Order.create( data );
        const populatedOrder = await Order.find({ _id: order._id }).populate("records.record").populate("userId");
        res.json( populatedOrder );
    } catch (error) {
        next( error );
    }
}