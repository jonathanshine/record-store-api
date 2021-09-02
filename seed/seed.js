// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
import User from '../models/User.js';
import Record from '../models/Record.js';
import faker from 'faker';
// --------------------------------------------------


(async function() {
    // MONGOOSE CONFIG ----------------------------------
    mongoose.connect("mongodb://localhost:27017/record-store-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    })
    .then(() => console.log(`Connected successfully to DB`))
    .catch((err) => console.log("We cannot connect to the DB -->", err));
    // --------------------------------------------------



    // Delete all users
    try {
        await User.deleteMany( {} );
        console.log("All users have been deleted");
    } catch (error) {
        console.log( error );
    };



    // Delete all records
    try {
        await Record.deleteMany( {} );
        console.log("All records have been deleted");
    } catch (error) {
        console.log( error );
    };



    // Create 20 fake users
    const userPromises = Array(20)
        .fill(null)
        .map(() => {
            const userData = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                birthday: faker.date.between("1970", "2005")
            };

            console.log(`User ${userData.username} with email ${userData.email} and password ${userData.password} has been created`);

            const user = new User( userData );
            return user.save();
        });

        try {
            await Promise.all( userPromises );
            console.log("----------------------------------------------");
            console.log(`All 20 fake users have been stored to the DB`);
            console.log("----------------------------------------------");
        } catch (error) {
            console.log( error );
        };

    // Create 20 fake records
    const recordPromises = Array(20)
        .fill(null)
        .map(() => {
            const recordData = {
                cover: faker.image.imageUrl(),
                title: faker.name.firstName() + " " + faker.name.jobType(),
                artist: faker.name.lastName() + " " + faker.name.jobDescriptor(),
                price: faker.commerce.price(10, 100, 2),
                year: faker.date.between("1900", "2020").getFullYear()
            };
            
            console.log(`Record ${recordData.title} by ${recordData.artist} from ${recordData.year} has been created`);
    
            const record = new Record( recordData );
            return record.save();
        });


        try {
            await Promise.all( recordPromises );
            console.log("----------------------------------------------");
            console.log(`All 20 fake records have been stored to the DB`);
            console.log("----------------------------------------------");
        } catch (error) {
            console.log( error );
        };

    // Close the connection to the DB
    mongoose.connection.close();
})();