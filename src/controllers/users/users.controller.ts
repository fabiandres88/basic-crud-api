import { Request, Response } from "express";
import { v4 as uuidv4, validate as isUuid } from "uuid";
import { User } from "../../types/types";
import { validateUser } from "../../utils/users/users";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../../db/db";

export const getAllUsers = (_: Request, res: Response) => {
  res.status(200).json(getUsers());
};

export const getUser = (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!isUuid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  const user = getUserById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
};

export const createUsers = (req: Request, res: Response) => {
  const { username, age, hobbies } = req.body;
  if (!validateUser(req.body))
    return res.status(400).json({ message: "Invalid user data" });

  const newUser: User = { id: uuidv4(), username, age, hobbies };
  res.status(201).json(createUser(newUser));
};

export const updateUsers = (req: Request, res: Response) => {
  const { userId } = req.params;
  const updatedUser = updateUser(userId, req.body);
  if (!updatedUser) return res.status(404).json({ message: "User not found" });
  res.status(200).json(updatedUser);
};

export const deleteUsers = (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!deleteUser(userId))
    return res.status(404).json({ message: "User not found" });
  res.status(204).send();
};
