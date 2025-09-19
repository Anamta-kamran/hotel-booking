// import express from "express"
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks from "./controllers/clerkWebhooks.js";

// connectDB()

// const app = express()
// app.use(cors())  //enable cross-origin resource sharing

// // middleware 
// app.use((express.json()))
// app.use(clerkMiddleware())

// // API to listne to clerkwebhooks
// app.use("/api/clerk",clerkWebhooks)

// app.get('/' , (req , res)=>res.send("API is working"))
// const PORT = process.env.PORT || 3000;

// app.listen(PORT,()=>console.log(`server running on port ${PORT}`));

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB();

const app = express();

// CORS configuration
app.use(cors());

// Raw body parsing for webhooks (IMPORTANT: This must come before express.json())
app.use('/api/clerk', express.raw({ type: 'application/json' }), (req, res, next) => {
    // Convert raw buffer back to string for webhook verification
    req.body = JSON.parse(req.body.toString());
    next();
}, clerkWebhooks);

// Regular JSON parsing for other routes
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));