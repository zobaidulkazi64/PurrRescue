// express server for notification service

import express from "express";
import sendNotification from "./sender";
import receiveNotifications from "./worker";


receiveNotifications();


sendNotification();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const port = process.env.PORT || 4004;


app.listen(port, () => {
    console.log(`Notification service listening on port ${port}`);
})

app.get("/", (_req, res) => {
    res.status(200).json({ status: "UP" });
})

export default app