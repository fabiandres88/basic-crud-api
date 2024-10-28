import { createServer, IncomingMessage, ServerResponse } from "http";
import { db } from "./db//db";
import { v4 as isValidUUID, V4Options } from "uuid";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4000;

const parseBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
};

const server = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url?.split("/");
    const method = req.method;

    if (!url || !method) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    if (url[1] === "api" && url[2] === "users") {
      const userId = url[3] as V4Options;

      // Get all users
      if (method === "GET" && !userId) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(db.getUsers()));
      }

      // Get user by ID
      else if (method === "GET" && userId) {
        if (!isValidUUID(userId)) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Invalid user ID");
          return;
        }

        const user = db.getUser(userId as string);
        if (!user) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("User not found");
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));
      }

      // Create a new user
      else if (method === "POST" && !userId) {
        try {
          const body = await parseBody(req);
          const { username, age, hobbies } = body;

          if (!username || typeof age !== "number" || !Array.isArray(hobbies)) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Missing or invalid fields");
            return;
          }

          const newUser = db.addUser(username, age, hobbies);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newUser));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error parsing request body");
        }
      }

      // Update a user by ID
      else if (method === "PUT" && userId) {
        try {
          const body = await parseBody(req);
          const { username, age, hobbies } = body;

          if (!isValidUUID(userId)) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Invalid user ID");
            return;
          }

          const updatedUser = db.updateUser(
            userId as string,
            username,
            age,
            hobbies
          );
          if (!updatedUser) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("User not found");
            return;
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(updatedUser));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error parsing request body");
        }
      }

      // Delete a user by ID
      else if (method === "DELETE" && userId) {
        if (!isValidUUID(userId)) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Invalid user ID");
          return;
        }

        const success = db.deleteUser(userId as string);
        if (!success) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("User not found");
          return;
        }

        res.writeHead(204);
        res.end();
      }

      // Invalid Route
      else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Route not found");
      }
    }

    // Handle non-existing endpoints
    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Endpoint not found");
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
