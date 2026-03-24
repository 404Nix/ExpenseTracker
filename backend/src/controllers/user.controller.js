import { User } from "../models/user.model.js";
import generateToken from "../utils/token.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    const alreadyRegistered = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (alreadyRegistered) {
        return res.status(409).json({ message: "Email already in use" });
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
        message: "User registered Successfully",
        token,
        user: {
            id: String(user._id),
            username: user.username,
            email: user.email,
        },
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).json({ message: "User does not found" });

    const decoded = await bcrypt.compare(password, user.password);
    if (!decoded)
        return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({
        message: "User loggedIn Successfully",
        token,
        user: { id: String(user._id), name: user.name, email: user.email },
    });
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            user: { id: String(user._id), name: user.username, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
