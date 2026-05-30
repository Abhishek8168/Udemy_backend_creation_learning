import express from "express";
import cors from "cors";

const app = express();

// basic configurations
// app.use() -> will work as a middleware
app.use(express.json({limit: '16kb'})); // we are allowing frontend to send any json kind of data which is of limit 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"})); // accepting the data comming from url
app.use(express.static("public")); // 

// cors configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || "http://localhost:5173", 
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorizations"]
}));


// import the rotues after cors configurations
import healthchekcRouter from "./routes/healthcheck.routes.js"
app.use("/api/v1/healthcheck", healthchekcRouter);


app.get("/", (req, res) => {
    res.send("Hello world...");
});


export default app; 
// This file i s making app the main(default) value it shares with other files.
// another file can import it like this: import app from "./app.js"