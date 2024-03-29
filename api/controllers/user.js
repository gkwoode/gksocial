import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const userId = req.params.userId;
    // const user = users.find((user) => user.id === userId);
    // res.send(user);

    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        const {password, ...info} = data[0];
        // const info = data[0];
        return res.status(200).json(info);
    });
}