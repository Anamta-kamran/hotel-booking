import { json } from "express";
import user from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async(req,res)=>{
    try {
        // create a svix instance with clerk webhook secret 
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // getting Headers
        const headers = {
            "svix_id":req.headers["svix_id"],
            "svix_timestamp":req.headers["svix_timestamp"],
            "svix_signature":req.headers["svix_signature"],
        };
        // verifying headers
        await whook.verify(json.stringify(req.body),headers) 

        // getting data from request body 

        const {data , type} = req.body
        const userData = {
            _id: data.id,
            email:data.email_address[0].email_address,
            username:data.first_name + " " + data.last_name,
            image:data.image_url,
        }
        // switch cases for different events 
        switch(type){
            case "user.created":{
                await user.create(userData);
                break;
            }
              case "user.updated":{
                await user.findByIdAndUpdate(data.id,userData);
                break;
            }
              case "user.deleted":{
                await user.findByIdAndDeleted(data.id);
                break;
            }
            default:
            break;
        }
        res.json({success:true , message:"webhook recieved"})
    } catch (error) {
        console.log(error.message)
         res.json({success:false , message:error.message})
        
    }
}
export default clerkWebhooks;