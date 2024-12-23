import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:OeBCUjK59WhF@ep-rapid-queen-a5pt5qf9.us-east-2.aws.neon.tech/neondb?sslmode=require'
  }
}); 
