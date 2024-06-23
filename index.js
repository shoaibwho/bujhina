const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./backend/models/User');
const TeacherModel = require("./backend/models/Teacher"); // Ensure correct case
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://127.0.0.1:27017/teaching")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error: ", error);
    });

app.get("/", (req, res) => {
    res.send("Welcome to On demand teaching platform");
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then((user) => {
            if (user) {
                if (user.password == password) {
                    res.json("success");
                } else {
                    res.json("the password is incorrect");
                }
            }
        })
        .catch((err) => res.json(err));
});

app.post("/register", (req, res) => {
    UserModel.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
    },
});

app.post("/reset-password", (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const token = crypto.randomBytes(32).toString("hex");
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
            user.save();

            transporter.sendMail({
                to: email,
                from: "your-email@gmail.com",
                subject: "Password Reset",
                html: `<p>You requested a password reset</p>
               <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>`,
            });

            res.status(200).json({ message: "Password reset email sent" });
        })
        .catch((err) => res.status(500).json({ message: "Server error" }));
});

app.post("/new-password", (req, res) => {
    const { token, newPassword } = req.body;
    UserModel.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
    })
        .then((user) => {
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Token invalid or expired" });
            }
            user.password = newPassword;
            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;
            user.save();
            res.status(200).json({ message: "Password updated successfully" });
        })
        .catch((err) => res.status(500).json({ message: "Server error" }));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
