import { v4 as uuidv4 } from "uuid";
import { usersDb } from "./users";

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = usersDb;

export const db = {
  getUsers: () => users,
  getUser: (id: string) => users.find((user) => user.id === id),
  addUser: (username: string, age: number, hobbies: string[]) => {
    const newUser: User = { id: uuidv4(), username, age, hobbies };
    users.push(newUser);
    return newUser;
  },
  updateUser: (
    id: string,
    username: string,
    age: number,
    hobbies: string[]
  ) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;
    users[userIndex] = { id, username, age, hobbies };
    return users[userIndex];
  },
  deleteUser: (id: string) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  },
};
