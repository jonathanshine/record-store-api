// IMPORTS ------------------------------------------
import createError from 'http-errors';
import Record from '../models/Record.js';
// --------------------------------------------------


export const getRecords = async (req, res, next) => {
    try {
        const records = await Record.find();
        res.json(records);
    } catch (error) {
        next( error )
    }
};

export const getRecord = async (req, res, next) => {
    try {
        const { id } = req.params;
        const record = await Record.findById( id );
        if(!record) throw new createError(404, `No record with id --> ${id} was found`);
        res.json( record );
    } catch (error) {
        next( error );
    }
};

export const createRecord = async (req, res, next) => {
    try {
        const body = req.body;
        const record = await Record.create( body );
        res.json( record );
    } catch (error) {
        next( error );
    }
};

export const updateRecord = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const record = await Record.findByIdAndUpdate( 
            id,
            newData,
            { new: true}
            );
        if (!record) throw new createError(404, `No record with id --> ${id} was found`);
        res.json( record );
    } catch (error) {
        next( error );
    }
};

export const deleteRecord = async (req, res, next) => {
    try {
        const { id } = req.params;
        const record = await Record.findByIdAndDelete( id );
        if (!record) throw new createError(404, `No record with id --> ${id} was found`);
        res.json({
            success: `Record with id:${id} was deleted.`,
            record: record
        });
    } catch (error) {
        next( error );
    }
};