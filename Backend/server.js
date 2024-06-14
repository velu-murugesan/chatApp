import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authroutes.js";
import messageRoutes from "./routes/messageroutes.js";
import userRoutes from "./routes/userroutes.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";

import connectTomongoDB from "./db/connectTomongoDb.js";

const __dirname = path.resolve();

const regex =
  /.*throw new Error\(`Failed to parse source map from '\${sourceURL}' file: \${error}`\);*/;

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

// app.get("/", (req, res) => {
//   res.send("<h1>Hello Vite + React</h1>");
// });

server.listen(PORT, () => {
  connectTomongoDB();
  console.log(`app is running on ${PORT}`);
});
