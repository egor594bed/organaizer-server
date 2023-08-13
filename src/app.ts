import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

const whitelist = [
  "http://localhost:3000",
  "chrome-extension://eeoggfdodffpimkodhnpnmdhglfdjjde",
];

const corsOptions = {
  credentials: true,
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();

app.use(express.json({ extended: true } as any));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/notes", require("./routes/note.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI as string;

async function start() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    } as mongoose.ConnectOptions);
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e: any) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
