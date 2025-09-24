import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB()

const app = express()
app.use(cors()) //enable cross origin resource sharing

// IMPORTANT: Raw middleware for webhooks BEFORE express.json()
app.use("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhooks)

// middlewares
app.use(express.json())
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send("Api is working"))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});