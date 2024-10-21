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
router.get("/users/:userId", getUser);
router.post("/users", createUsers);
router.put("/users/:userId", updateUsers);
router.delete("/users/:userId", deleteUsers);

export default router;
