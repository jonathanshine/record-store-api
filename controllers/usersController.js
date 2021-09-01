// IMPORTS ------------------------------------------
import createError from 'http-errors';
import User from '../models/User.js';
// --------------------------------------------------

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json( users );
    } catch (error) {
        next( error );
    }
};

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById( id );
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
            );
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