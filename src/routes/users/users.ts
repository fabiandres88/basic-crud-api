import express from "express";
import {
  createUsers,
  deleteUsers,
  getAllUsers,
  getUser,
  updateUsers,
} from "../../controllers/users/users.controller";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:userId", getUser as any);
router.post("/users", createUsers as any);
router.put("/users/:userId", updateUsers as any);
router.delete("/users/:userId", deleteUsers as any);

export default router;
