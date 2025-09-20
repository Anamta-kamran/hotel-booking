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

// Webhook route - use POST specifically and handle raw body
app.post("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhooks);

// Test route
app.get("/api/clerk/test", (req, res) => {
    console.log("Test route accessed!");
    res.json({ 
        message: "Webhook endpoint is reachable",
        timestamp: new Date().toISOString()
    });
});

// Other middleware
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));