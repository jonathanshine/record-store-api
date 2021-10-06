// IMPORTS ------------------------------------------
import createError from 'http-errors';
import User from '../models/User.js';
import config from '../config/config.js';
import bcrypt from "bcryptjs";
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
    const info = req.body;
    try {
        const user = new User( info );
        const verificationToken = user.generateVerificationToken();
        user.verified.token = verificationToken;

        const savedUser = await user.save();
        req.user = savedUser;
        next();
    } catch (error) {
        next( error );
    };
};


export const sendUser = async (req, res, next)=> { 
    try {    
        const token = req.user.generateAuthToken();
       
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 172800000),
            sameSite: config.env == "production" ? "None" : "lax",
            secure: config.env == "production" ? true : false
        } ).send( req.user );
    } catch (error) {
        next( error );
    }
};


export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        let user = await User.findByIdAndUpdate( 
            id,
            newData,
            { new: true}
            ).populate("cart.record");
        // let user = await User.findById( id );
        // Object.assign(user, newData);
        // const userUpdated = await user.save();
        if (!user) throw new createError(404, `No user with id --> ${id} was found`);
        res.send( user );
        // if (!userUpdated) throw new createError(404, `No user with id --> ${id} was found`);
        // res.send( userUpdated );
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
        

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        console.log("Are the hash and the pass matching --> ", passwordIsValid);
        if(!passwordIsValid) next(createError(404, "Password is not valid"));

        const token = user.generateAuthToken();

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 172800000),
            sameSite: config.env == "production" ? "None" : "lax",
            secure: config.env == "production" ? true : false
        } ).send( user );
    } catch (error) {
        next( error );
    }
};

export const verifyCookie = async (req, res, next) => {
    res.send(req.user);
}