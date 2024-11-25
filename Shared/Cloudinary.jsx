import axios from "axios";
import { nanoid } from "nanoid";
import { Cloudinary } from "cloudinary-core"; // Use cloudinary-core

const cloudinary = new Cloudinary({
    cloud_name: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.EXPO_PUBLIC_CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (image) => {
    try {
        const formData = new FormData();
        formData.append("file", {
            uri: image,
            type: "image/jpeg",
            name: `pets_${Date.now()}.jpg`,
        });
        formData.append("upload_preset", "your_upload_preset"); // Replace with your upload preset

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );

        console.log("Image uploaded to Cloudinary: ", response.data);
    } catch (error) {
        console.error("Error uploading image to Cloudinary: ", error);
    }
};

export { uploadImageToCloudinary };