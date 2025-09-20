// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//     try{
//         // create a svix instance for clerkwebhhoks verification
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         // getting header 
//         const headers = {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         };
//         // verifying headrers 
//         await whook.verify(JSON.stringify(req.body), headers);
//         // getting data form body 
//         const {data , type} = req.body;
//         const userData = {
//             _id : data.id,
//             username : data.first_name + " " + data.last_name,
//             email : data.email_addresses[0].email_address,
//             image : data.image_url,
//         }
//         // switch cases for different events 
//         switch(type){
//             case "user.created" : {
//                 await User.create(userData);
//                 break;
//             }
//             case "user.deleted" : {
//                 await User.findByIdAndDelete(data.id);
//                 break;
//             }
//             case "user.updated" : {
//                 await User.findByIdAndUpdate(data.id,userData);
//                 break;
//             }
//             default: break;
//         }
//         res.json({success : true ,message : "webhook received"})
//     }

//     catch(err){
//         console.log(err);
//         res.json({success : false , message : "webhook error"})
//     }
// }
// export default clerkWebhooks;



import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        console.log("Webhook received:", req.body);
        
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

        // Create user data object with correct field mapping
        const userData = {
            _id: data.id,
            username: data.first_name + " " + data.last_name,
            email: data.email_addresses[0].email_address,
            image: data.image_url || "", // Fixed: changed 'data' to 'image' and added fallback
        };

        console.log("User data to save:", userData);

        // Switch cases for different events
        switch (type) {
            case "user.created": {
                const newUser = await User.create(userData);
                console.log("User created successfully:", newUser);
                break;
            }
            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                console.log("User deleted:", data.id);
                break;
            }
            case "user.updated": {
                await User.findByIdAndUpdate(data.id, userData);
                console.log("User updated:", data.id);
                break;
            }
            default: 
                console.log("Unhandled event type:", type);
                break;
        }

        res.status(200).json({ success: true, message: "webhook received" });
    } catch (err) {
        console.error("Webhook error:", err);
        res.status(400).json({ success: false, message: err.message });
    }
};

export default clerkWebhooks;