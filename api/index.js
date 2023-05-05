import express from "express";
import userRoutes from "./routes/users.js";
import likeRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import relationshipRoutes from "./routes/relationships.js";

const app = express();

// Middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});
  
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    try {
        return res.status(200).json(file.filename);
    } catch (error) {
        console.error(error);
    }
});

app.use("/api/users", userRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/relationships", relationshipRoutes);

app.listen(8800, () => {
    console.log("It is working");


})