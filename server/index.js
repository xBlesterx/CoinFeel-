import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import usersRoutes from "./routers/users.js";
import currenciesRoutes from "./routers/currencies.js";
import articlesRoutes from "./routers/articles.js";
import forumsRoutes from "./routers/forums.js";
import generalRoutes from "./routers/general.js";
import multer from "multer";

// Data Imports
import User from "./models/Users.js";
import { dummyUsers } from "./data/dummyData.js";
import Currency from "./models/Currencies.js";
import { cryptoData } from "./data/dummyData.js";

/*CONFIGURATION*/

const app = express();
/*.............................................................*/
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "200mb" }));

app.use(bodyParser.json({ limit: "200mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));

//Session Middleware
app.use(
  session({
    secret: process.env.SESSIONKEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: true, // set to true if your site is on HTTPS
      httpOnly: true,
    },
  })
);

app.use("/users", usersRoutes);
app.use("/currencies", currenciesRoutes);
app.use("/articles", articlesRoutes);
app.use("/forums", forumsRoutes);
app.use("/general", generalRoutes);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/*DEBBGING ROUTERS*/
const requestLogger = (request, response, next) => {
  console.log(`${request.method} url:: ${request.url}`);
  next();
};

/*user ath middleware */
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

/*ROUTES*/

app.use(isAuthenticated);
app.use(requestLogger);

//Rmove

/* DataBase Connection */
const PORT = process.env.PORT || 9001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    //Currency.insertMany(cryptoData);
    //User.insertMany(dummyUsers);
  })
  .catch((error) => console.log(error));
