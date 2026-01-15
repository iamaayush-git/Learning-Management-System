import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./config/db.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import authRouter from "./routes/authRoute.js";
import courseRouter from "./routes/courseRoute.js";

const app = express();
dotenv.config();
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// api endpoints

app.get("/", (req, res) => {
  res.send("API Running")
})

app.use("/api/auth", authRouter)
app.use("/api/course", courseRouter)


//custome error middleware 
app.use(errorMiddleware)

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}}`)
})


