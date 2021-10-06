// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
import User from '../models/User.js';
import Record from '../models/Record.js';
import Order from '../models/Order.js';
import faker from 'faker';
import config from "../config/config.js"
// --------------------------------------------------

let usersCreated = [];
let recordsCreated = [];

(async function() {
    // MONGOOSE CONFIG ----------------------------------
    mongoose.connect(config.mongooseURL, {
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
        console.log("---------------------------");
    } catch (error) {
        console.log( error );
    };



    // Delete all records
    try {
        await Record.deleteMany( {} );
        console.log("All records have been deleted");
        console.log("---------------------------");
    } catch (error) {
        console.log( error );
    };

    // Delete all orders
    try {
        await Order.deleteMany( {} );
        console.log("All orders have been deleted");
        console.log("---------------------------");
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
            const verificationToken = user.generateVerificationToken();
            user.verified.token = verificationToken;
            return user.save();
        });

        try {
            usersCreated = await Promise.all( userPromises );
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
            recordsCreated = await Promise.all( recordPromises );
            console.log("----------------------------------------------");
            console.log(`All 20 fake records have been stored to the DB`);
            console.log("----------------------------------------------");
        } catch (error) {
            console.log( error );
        };


    // Create some orders
    const userIds = usersCreated.map(user => user._id); // returns an array of only the IDs from usersCreated
    const recordIds = recordsCreated.map(record => record._id);
    const  orderPromises = Array(30)
        .fill(null)
        .map(() => {
            const orderData = {
                userId: faker.random.arrayElement( userIds ),
                records: [
                    {
                        record: faker.random.arrayElement( recordIds ),
                        quantity: faker.datatype.number( { min: 1, max: 3 } )
                    },
                    {
                        record: faker.random.arrayElement( recordIds ),
                        quantity: faker.datatype.number({ min: 1, max: 3 })
                    }
                ]
            };

            console.log(`An order from ${orderData.userId} has been created`);

            const order = new Order( orderData );
            return order.save();
        });

    try {
        await Promise.all( orderPromises );
        console.log("----------------------------------------------");
            console.log(`All 30 fake orders have been stored to the DB`);
            console.log("----------------------------------------------");
    } catch (error) {
        console.log( error );
    };

    // Close the connection to the DB
    mongoose.connection.close();
})();