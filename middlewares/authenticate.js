const authenticate = (req, res, next) => {
    const { username, password } = req.body;
    const validUsername = process.env.BLOG_ADMIN_USERNAME || "admin";
    const validPassword = process.env.BLOG_ADMIN_PASSWORD || "password";

    if (username === validUsername && password === validPassword) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default authenticate;
