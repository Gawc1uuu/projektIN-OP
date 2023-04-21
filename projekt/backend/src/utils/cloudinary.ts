import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

const config: CloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
};

const cloudinaryInstance = cloudinary.v2;
cloudinaryInstance.config(config);
export default cloudinaryInstance;
