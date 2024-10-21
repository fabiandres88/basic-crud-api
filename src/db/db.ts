import { User } from "../types/types";
import { usersDb } from "./users";

usersDb;

export const getUsers = () => usersDb;

export const getUserById = (id: string) =>
  usersDb.find((user) => user.id === id);

export const createUser = (user: User) => {
  usersDb.push(user);
  return user;
};

export const updateUser = (id: string, updatedUser: Partial<User>) => {
  const index = usersDb.findIndex((user) => user.id === id);
  if (index !== -1) {
    usersDb[index] = { ...usersDb[index], ...updatedUser };
    return usersDb[index];
  }
  return null;
};

export const deleteUser = (id: string) => {
  const index = usersDb.findIndex((user) => user.id === id);
  if (index !== -1) {
    usersDb.splice(index, 1);
    return true;
  }
  return false;
};
