import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getComments = async (req, res) => {
    const q = `SELECT c.*, u.id AS userId, fname, lname, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ? ORDER BY c.postDate DESC`;

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addComment = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("You are not authorized!");

        const q = "INSERT INTO comments (`userId`, `postId`, `desc`, `postDate`) VALUES (?)";

        const values = [
            userInfo.id,
            req.body.postId,
            req.body.desc,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment added successful.");
        });
    });
};