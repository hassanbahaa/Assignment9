import { userRepo } from "../../db/index.js";
import { encryptPhoneNumber } from "../../utils/encrypt.js";
import { hashPassword, isMatch } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

export async function checkExist(filter) {
  return await userRepo.getOne(filter);
}

export async function CreateUser(user) {
  // check exist
  const isExist = await checkExist({ email: user.email });
  if (isExist) {
    throw new Error("Email already exist", { cause: 409 });
  }
  // hash password
  const password = await hashPassword(user.password);
  user.password = password;
  // encrypt phone
  const phone = await encryptPhoneNumber(user.phoneNumber);
  user.phoneNumber = phone;
  const newUser = await userRepo.create(user);
  return newUser._id;
}

export async function Login(user) {
  const isExist = await checkExist({ email: user.email });
  if (!isExist) {
    throw new Error("Email or password is incorrect", { cause: 401 });
  }
  const result = await isMatch(user.password, isExist.password);
  if (!isMatch) {
    throw new Error("Email or password is incorrect", { cause: 401 });
  }
  // generate token
  const token = await generateToken(isExist._id);
  return { token };
}

export async function UpdateUser(id, user) {
  const isExist = await checkExist({ _id: id });
  if (!isExist) {
    throw new Error("User not found", { cause: 404 });
  }

  if (user.email) {
    const isExist = await checkExist({ email: user.email });
    if (isExist) {
      throw new Error("Email already in use, please choose a different email", {
        cause: 409,
      });
    }
  }
  const result = await userRepo.update({ _id: id }, user);
  return;
}

export async function DeleteUser(id) {
  const isExist = await checkExist({ _id: id });
  if (!isExist) {
    throw new Error("User not found", { cause: 404 });
  }
  await userRepo.delete({ _id: id });
}

export async function getUser(id) {
  const isExist = await checkExist({ _id: id });
  if (!isExist) {
    throw new Error("User not found", { cause: 404 });
  }
  return isExist;
}
