import exp from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { UserModel } from "../models/UserModel.js";

export const adminApp = exp.Router();

// Read all users
adminApp.get("/users", verifyToken("ADMIN"), async (req, res, next) => {
	try {
		const usersList = await UserModel.find({ role: "USER" }, { password: 0 }).sort({ createdAt: -1 });
		res.status(200).json({ message: "users", payload: usersList });
	} catch (err) {
		next(err);
	}
});

// Read all authors
adminApp.get("/authors", verifyToken("ADMIN"), async (req, res, next) => {
	try {
		const authorsList = await UserModel.find({ role: "AUTHOR" }, { password: 0 }).sort({ createdAt: -1 });
		res.status(200).json({ message: "authors", payload: authorsList });
	} catch (err) {
		next(err);
	}
});