import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

// Access using dot notation in the key name
const myname = process.env["my.myusername"];

console.log(myname);
