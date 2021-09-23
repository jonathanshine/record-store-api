// IMPORTS ------------------------------------------
import createError from 'http-errors';
import User from '../models/User.js';
// --------------------------------------------------

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort("lastName").select("-password");
        res.json( users );
    } catch (error) {
        next( error );
    }
};

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById( id ).select("-password");
        if(!user) throw new createError(404, `No user with id --> ${id} was found`);
        res.json( user );
    } catch (error) {
        next( error );
    }
};

export const createUser = async (req, res, next)=> {
    try {
        const body = req.body;
        const user = await User.create( body );
        user.password = undefined;
        res.json( user );
    } catch (error) {
        next( error );
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const user = await User.findByIdAndUpdate( 
            id,
            newData,
            { new: true}
            ).populate("cart.record");
        if (!user) throw new createError(404, `No user with id --> ${id} was found`);
        res.json( user );
    } catch (error) {
        next( error );
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete( id );
        if (!user) throw new createError(404, `No user with id --> ${id} was found`);
        res.json({
            success: `user with id:${id} was deleted.`,
            user: user
        });
    } catch (error) {
        next( error );
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email }).populate("cart.record");
        if (!user) throw new createError(404, `Email not valid`)

        if (user.password !== password) throw new createError(404, `Password not valid`);
        res.send( user );
    } catch (error) {
        next( error );
    }
}