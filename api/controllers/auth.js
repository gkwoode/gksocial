import {db} from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// CREATE USERS
export const register = (req, res) => {
    // Check if user exist
    const q = "SELECT * FROM users where email = ?";
    db.query(q, [req.body.email], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exists!");

        // If user doesn't exist, create new user
        // Hash user password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const q = "INSERT INTO users (`fname`, `lname`, `email`, `number`, `dob`, `password`, `gender`) VALUE (?)";
        const values = [req.body.fname, req.body.lname, req.body.email, req.body.number, req.body.dob, hashedPassword, req.body.gender]
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("User created successful.")
        })
    })
}

// LOGIN
export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User not found");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if(!checkPassword) return res.status(400).json("Wrong email or password");

        const token = jwt.sign({id:data[0].id}, "secretkey");
        const {password, ...others} = data[0];
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    })
}

// LOGOUT
export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User logged out")
}