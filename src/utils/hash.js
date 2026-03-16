import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// compare password
export const isMatch = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
