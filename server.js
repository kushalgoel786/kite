import winston from "winston";
import "express-async-errors";
import path from "path";
import express from "express";
import fs from "fs";
import { parse } from "csv";
import pg from "pg";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

logger.info("Starting the Server 🎉 🎉 🎉 !");

// Load ENV Variables
import * as dotenv from "dotenv";
dotenv.config();

// Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
import { Sequelize } from "sequelize";
let sequelize;
if (process.env.NODE_ENV === "development") {
  const dbPath = path.join(process.cwd(), "db.sqlite");
  sequelize = new Sequelize({
    dialect: "sqlite",
    logging: false,
    storage: dbPath,
  });
} else {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialectModule: pg,
    logging: false,
  });
}

// Models
import historicalDataModel from "./models/HistoricalDataModel.js";
import userModel from "./models/UserModel.js";
const HistoricalData = historicalDataModel(sequelize);
const User = userModel(sequelize);
export { HistoricalData, User };

// Morgan - better logging during Dev
import morgan from "morgan";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Cookie parser
import cookieParser from "cookie-parser";
app.use(cookieParser());

// Routers
import historicalDataRouter from "./routes/historicalDataRouter.js";
import userRouter from "./routes/userRouter.js";
import portfolioRouter from "./routes/portfolioRouter.js";
import orderRouter from "./routes/orderRoute.js";

// Middleware
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

// Test endpoint
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "Success! API is all working" });
});

// API Routes
app.use("/api/v1/historical-data", authenticateUser, historicalDataRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/portfolio", authenticateUser, portfolioRouter);
app.use("/api/v1/order", authenticateUser, orderRouter);

// Serve Frontend
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// Route not found
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

// Error in server
app.use(errorHandlerMiddleware);

// Port
const port = process.env.PORT || 8000;

try {
  logger.info("Attempting to connect to DB");
  await sequelize.authenticate();
  if (process.env.NODE_ENV === "development") {
    await sequelize.sync({ force: true });
  } else {
    await sequelize.sync({ alter: true });
  }
  logger.info("Connected to DB");

  if (process.env.NODE_ENV === "development") {
    // Populate with initial data
    const dataPath = path.join(process.cwd(), "assets/historical_prices.csv");

    fs.createReadStream(dataPath)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", async (row) => {
        const [sno, date, price, symbol] = row;
        await HistoricalData.create({
          date,
          price,
          symbol,
        });
      })
      .on("end", () => {
        logger.info("Initial data loaded");
      })
      .on("error", (error) => {
        logger.error(error.message);
      });
  }

  // Spin up the server
  const server = app.listen(port, () => {
    logger.info(`Server running on PORT ${port}... 🎉 🎉 🎉 !`);
  });
} catch (error) {
  logger.error(error);
  process.exit(1);
}

export default app;
