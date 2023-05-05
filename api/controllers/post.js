import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import moment from 'moment/moment.js';

// Get posts
export const getPosts = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("You are not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("You are not authorized!");
        // req.userId = userInfo.id;

        const q = userId 
        ? `SELECT p.*, u.id AS userId, fname, lname, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.postDate DESC` 
        : `SELECT p.*, u.id AS userId, fname, lname, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
        LEFT JOIN relationships AS r ON (p.userId = r.fellowedUserId) WHERE r.fellowerUserId = ? OR p.userId = ? ORDER BY p.postDate DESC`;

        db.query(q, [userId ? userId : userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
}

// Add post
export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("You are not authorized!");

        const q = "INSERT INTO posts (`userId`, `desc`, `image`, `postDate`) VALUES (?)";

        const values = [
            userInfo.id,
            req.body.desc,
            req.body.image,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post added successful.");
        });
    });
}