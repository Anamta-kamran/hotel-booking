import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async(req, res) => {
    try {
        console.log("Webhook received:", req.body.type);
        
        // Create a svix instance with clerk webhook secret 
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Getting Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verifying headers
        const payload = JSON.stringify(req.body);
        await whook.verify(payload, headers);

        console.log("Webhook verified successfully");

        // Getting data from request body 
        const { data, type } = req.body;
        
        console.log("Event type:", type);
        console.log("User data:", data);

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: (data.first_name || "") + " " + (data.last_name || ""),
            image: data.image_url,
        };

        // Switch cases for different events 
        switch(type) {
            case "user.created": {
                console.log("Creating user:", userData);
                const newUser = await User.create(userData);
                console.log("User created:", newUser);
                break;
            }
            case "user.updated": {
                console.log("Updating user:", data.id);
                const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
                console.log("User updated:", updatedUser);
                break;
            }
            case "user.deleted": {
                console.log("Deleting user:", data.id);
                const deletedUser = await User.findByIdAndDelete(data.id);
                console.log("User deleted:", deletedUser);
                break;
            }
            default:
                console.log("Unhandled event type:", type);
                break;
        }
        
        res.json({ success: true, message: "webhook received" });
    } catch (error) {
        console.log("Webhook error:", error.message);
        console.log("Full error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export default clerkWebhooks;

// PS C:\Users\Muhib Ali SSD\Desktop\hotel-booking>    git push origin main
// >> 
// >> 
// error: src refspec main does not match any
// error: failed to push some refs to 'https://github.com/Anamta-kamran/hotel-booking.git'