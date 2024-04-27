// express server for notification service

import express from "express";

const app = express();

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "UP" });
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

export default app