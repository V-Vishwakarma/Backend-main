import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

export default auth;                                                    