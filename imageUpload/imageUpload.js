import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: "dxwndm3zn",
  api_key: "356894492914952",
  api_secret: "5HyojFRk6SzMDJsCpErxj8W_jvA",
});

export default cloudinary;
