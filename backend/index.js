// require('dotenv').config();
// import { config } from "dotenv";
// config();
import "dotenv/config"
import express from "express";
import cors from "cors";
const PORT = 4000;
import authRouter from "./routes/auth-route.js";
const app = express();
import connectDB from "./utils/db.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import contactRouter from "./routes/contact-route.js";
import serviceRouter from "./routes/service-route.js";

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
    credential: true    
}

app.use(cors(corsOptions));
app.use(express.json());



// Mount the Router
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);
// error middleware
app.use(errorMiddleware);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Your server is running at port: ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});