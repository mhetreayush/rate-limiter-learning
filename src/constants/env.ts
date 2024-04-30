import dotenvsafe from "dotenv-safe";

// Load environment variables
dotenvsafe.config({
  allowEmptyValues: true,
  example: ".env.example",
});

export const ENV = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
};
