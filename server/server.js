import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import taskRouter from "./Routes/taskRoutes.js"
import userRouter from "./Routes/userRoutes.js"




dotenv.config();
const app = express();



app.use(cors({origin:true}));
app.use(express.json());
app.use(morgan("common"));


// ----- Router ----- //
app.use("/api/task" , taskRouter)
app.use("/api/user" , userRouter)





console.log(process.env.MONGO_URL)

const PORT = 5000

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    try {
      app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      );
    } catch (error) {
      console.log(`Error in connecting => ${error}`);
    }
  })
  .catch((error) => {
    console.error(`Invalid database connection ${error.message}`);
  });
