// import express from "express";
// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
// import cors from "cors";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload-minimal";
// import { typeDefs } from "../graphql/schema/index.js";
// import { resolvers } from "../graphql/resolvers/index.js";
// import { connectDB } from "../config/db.js";
// import { logger } from "../utils/logger.js"; // Custom logger using a library like Winston
// import { verifyToken } from "../utils/auth.js"; // Token verification logic moved to utility function

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4000;
// const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// // Establish database connection
// connectDB();

// // Async function to start the server
// async function startServer() {
//   const apolloServer = new ApolloServer({
//     typeDefs,
//     resolvers: {
//       Upload: GraphQLUpload,
//       ...resolvers,
//     },
//     formatError: (error) => ({
//       message: error.message,
//       status: error.extensions?.code || "SERVER_ERROR",
//     }),
//   });

//   await apolloServer.start();

//   // Middlewares
//   app.use(
//     cors({
//       origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Configurable origin
//       credentials: true,
//     })
//   );
//   app.use(express.json());
//   app.use(morgan("dev"));
//   app.use(graphqlUploadExpress({ maxFileSize: MAX_FILE_SIZE, maxFiles: 1 })); // Configurable file upload limits

//   // GraphQL middleware
//   app.use(
//     "/graphql",
//     expressMiddleware(apolloServer, {
//       context: async ({ req }) => {
//         const token = req.headers.authorization?.split("Bearer ")[1] || null;
//         const userId = await verifyToken(token); // Handle token verification
//         return { userId };
//       },
//     })
//   );

//   // Health check endpoint
//   app.get("/health-check", (req, res) => {
//     res.status(200).json({ status: "ok" });
//   });

//   // Error handling middleware
//   app.use((err, req, res, next) => {
//     logger.error(err.stack);
//     res.status(500).json({ message: "Internal server error" });
//   });

//   app.listen(PORT, () => {
//     logger.info(`🚀 Server running at http://localhost:${PORT}`);
//     logger.info(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
//   });
// }

// // Start the server with proper error handling
// startServer().catch((err) => {
//   logger.error("Failed to start server:", err);
// });

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

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
      credentials: true, // Allow credentials (cookies, authorization headers)
    })
  );
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
