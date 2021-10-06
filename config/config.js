import dotenv from "dotenv";
import fs from "fs";
import path, { dirname } from "path";
import { env } from "process";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));
console.log("__DIRNAME --> ", __dirname);


if (process.env.NODE_ENV == 'production') {
    dotenv.config();
} else {
    let envPath = path.join(__dirname, "..", ".development.env");
    console.log("OUR PATH TO THE ENV --> ", envPath);

    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
    } else dotenv.config();
}


const config = {
    env: env.NODE_ENV || "development",
    frontendOrigin: env.FRONTEND_ORIGIN_DEV || env.FRONTEND_ORIGIN_PROD,
    secretKey: env.SECRET_KEY_DEV || env.SECRET_KEY_PROD,
    mongooseURL: env.MONGOOSE_DB_DEV || env.MONGOOSE_DB_PROD,
    verificationSecretKey: env.EMAIL_VERIF_KEY_DEV || env.EMAIL_VERIF_KEY_PROD,
    email: env.EMAIL,
    email_pass: env.EMAIL_PASS
};

console.log("------------------------------------");
console.log("OUR ENV SETUP --> ", config.env);
console.log(config);

export default config;