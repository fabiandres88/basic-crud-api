import { User } from "../../types/types";

export const validateUser = (user: Partial<User>): boolean => {
  const { username, age, hobbies } = user;
  if (
    typeof username !== "string" ||
    typeof age !== "number" ||
    !Array.isArray(hobbies)
  ) {
    return false;
  }
  return true;
};
