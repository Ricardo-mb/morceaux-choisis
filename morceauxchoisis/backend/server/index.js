import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { typeDefs } from "../graphql/schema/index.js";
import { resolvers } from "../graphql/resolvers/index.js";
import { connectDB } from "../config/db.js";
import morgan from "morgan";
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload";

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 4000;

async function startServer() {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
      Upload: GraphQLUpload,
      ...resolvers,
    },
    formatError: (error) => {
      return {
        message: error.message,
        status: error.extensions?.code || "SERVER_ERROR",
      };
    },
  });

  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 })); // Limit file size to 10 MB

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Get token from header
        const token = req.headers.authorization?.split("Bearer ")[1] || "";

        if (token) {
          try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            return { userId: decoded.userId };
          } catch (err) {
            return { userId: null };
          }
        }
        return { userId: null };
      },
    })
  );

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
  });

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
