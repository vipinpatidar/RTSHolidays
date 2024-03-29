import express, { Response, type Express, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

// Imports
import errorHandler from "./middlewares/errorHandler";
import { userRouter } from "./routes/user.routes";
import { myHotelsRoutes } from "./routes/my-hotels.routes";
import { uploadImages } from "./routes/upload.routes";
import { hotelRoutes } from "./routes/hotels.routes";
import { bookingRoutes } from "./routes/booking.routes";
import { ApiError } from "./utils/ApiError";
import path from "node:path";

const app: Express = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 400, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req, res) => req.ip || "", //Method to retrieve custom identifiers for clients, such as their IP address, username, or API Key.
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${
        options.max
      } requests per ${options.windowMs / 60000} minutes`
    );
  },
});

//Middlewares
// App limiter for rate limiting
app.use(limiter);

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

//Upload Images and get Images Urls

// Routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/upload", uploadImages);
app.use("/api/v1/my-hotels", myHotelsRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/hotels", hotelRoutes);

// Error Handler
app.use(errorHandler);

// Serve Frontend (good when refresh the page)
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

export default app;
