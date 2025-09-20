// import express from "express"
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks from "./controllers/clerkWebhooks.js";

// connectDB()

// const app = express()
// app.use(cors())  //enable cross-origin resource sharing

// // API to listne to clerkwebhooks
// app.use("/api/clerk",clerkWebhooks)

// // middleware 
// app.use((express.json()))
// app.use(clerkMiddleware())

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

// Enable cross-origin resource sharing
app.use(cors());

// IMPORTANT: Webhook route MUST come BEFORE express.json() middleware
// This is because Clerk sends raw body and express.json() would parse it
// app.use("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhooks);

// Instead of using middleware on the route, handle it differently
app.post("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhooks);

// Other middleware
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send("API is working"));
// Add this route for testing
app.get('/api/clerk/test', (req, res) => {
    console.log("Test route accessed!");
    res.json({ 
        message: "Webhook endpoint is reachable",
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

