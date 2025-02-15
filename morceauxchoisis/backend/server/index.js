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
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload-minimal";

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 4000;

/**
 * Starts the server.
 *
 * @returns {Promise<void>}
 */
async function startServer() {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
      Upload: GraphQLUpload,
      ...resolvers,
    },
    /**
     * Format error to return to client.
     * @param {import("graphql").GraphQLError} error The error to format.
     * @returns {Object} An object with `message` and `status` properties.
     *   `message` is the error message to return to the client.
     *   `status` is the error status code to return to the client.
     *   If `error` does not have an `extensions.code` property, defaults to `"SERVER_ERROR"`.
     */
    formatError: (error) => {
      return {
        message: error.message,
        status: error.extensions?.code || "SERVER_ERROR",
      };
    },
  });

  await server.start();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:3001",
      credentials: true, // Allow credentials (cookies and/or authorization headers)
    })
  );
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 })); // Limit file size to 10 MB

  app.use(
    "/graphql",
    expressMiddleware(server, {
  /**
   * A function that returns context for each GraphQL resolver.
   * The context is an object that is passed to each resolver.
   * In this case, it will contain the user ID if a valid token is provided.
   * @param {import("express").Request} req - The Express request object.
   * @returns {Object} - An object with a `userId` property.
   *   `userId` is the user ID if a valid token is provided.
   *   Otherwise, `userId` is `null`.
   */
      context: async ({ req }) => {
        // Get token from header
        const token = req.headers.authorization?.split("Bearer ")[1] || "";
        console.log("Token *********:", token);

        if (token) {
          try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token*******:", decoded);

            return { userId: decoded.userId };
          } catch (err) {
            console.error("Token verification error:", err);
            return { userId: null };
          }
        }
        console.log("No token provided");
        return { userId: null };
      },
    }),
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
