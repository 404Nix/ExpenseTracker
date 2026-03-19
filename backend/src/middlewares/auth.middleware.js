import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        throw err;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };

        next();
    } catch (error) {
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        throw err;
    }
};
