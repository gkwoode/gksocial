import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
    const q = "SELECT fellowerUserId FROM relationships WHERE fellowedUserId = ?";
    
    db.query(q, [req.query.fellowerUserId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map((relationship) => (relationship.fellowerUserId)));
    });
}

// Add like
export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("You are not authorized!");

        const q = "INSERT INTO relationships (`fellowerUserId`, `fellowedUserId`) VALUES (?)";

        const values = [
            userInfo.id,
            req.body.userId
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Followed successful.");
        });
    });
}

// Delete like
export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("You are not authorized!");

        const q = "DELETE FROM relationships WHERE `fellowerUserId` = ? AND `fellowedUserId` = ?";

        db.query(q, [userInfo.id, req.query.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Unfollowed successful.");
        });
    });
}