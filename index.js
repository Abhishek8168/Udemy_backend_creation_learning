import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

let myUserName = process.env.user_name;
console.log(`user name: ${myUserName}`)

console.log("Start of project management backend project...");
console.log("auto restart works perfectly fine...");
