import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    console.log("🚨 WEBHOOK RECEIVED!", new Date());
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    try {
        // Create a svix instance for clerk webhooks verification
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Getting headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        // Verifying headers
        await whook.verify(JSON.stringify(req.body), headers);

        // Getting data from body
        const { data, type } = req.body;

        console.log("Event type:", type);
        console.log("User data from Clerk:", data);

        // Switch cases for different events
        switch (type) {
            case "user.created":
            case "user.updated": {
                // Create user data object with safer field access
                const userData = {
                    _id: data.id,
                    username: `${data.first_name || ''} ${data.last_name || ''}`.trim() || data.username || 'Unknown User',
                    email: data.email_addresses && data.email_addresses[0] ? data.email_addresses[0].email_address : data.primary_email_address || '',
                    image: data.image_url || data.profile_image_url || "",
                };

                console.log("User data to save:", userData);

                if (type === "user.created") {
                    const newUser = await User.create(userData);
                    console.log("User created successfully:", newUser);
                } else {
                    await User.findByIdAndUpdate(data.id, userData);
                    console.log("User updated:", data.id);
                }
                break;
            }
            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                console.log("User deleted:", data.id);
                break;
            }
            default: 
                console.log("Unhandled event type:", type);
                break;
        }

        res.status(200).json({ success: true, message: "webhook received" });
    } catch (err) {
        console.error("Webhook error:", err);
        console.error("Full error:", err);
        res.status(400).json({ success: false, message: err.message });
    }
};

export default clerkWebhooks;