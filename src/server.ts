import express from "express";
import cors from "cors";
import { ENV } from "./constants/env";
import { checkRateLimitMiddleware } from "./middleware/checkRateLimit";
import { productsRouter } from "./routes/productRoutes";
const app = express();
const PORT = ENV.PORT;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(checkRateLimitMiddleware);
app.use(productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
