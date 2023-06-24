import { config } from "dotenv";
import { resolve } from "path";

const env = process.env.NODE_ENV ?? "development";

if (env === "development") {
  config({ path: resolve(__dirname, "../.env.dev") });
} else {
  config({ path: resolve(__dirname, "../.env") });
}

import "./client";
