import {
  CreateUser,
  DeleteUser,
  getUser,
  Login,
  UpdateUser,
} from "./user.service.js";
export const createUserController = async (req, res, next) => {
  const user = req.body;
  try {
    const result = await CreateUser(user);
    res.status(201).json({
      message: "User created successfully",
      userId: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
export const loginUserController = async (req, res, next) => {
  const user = req.body;
  try {
    const result = await Login(user);
    res.status(200).json({
      message: "Login successfully",
      token: result.token,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req, res, next) => {
  const id = req.user.id;
  const { password, ...data } = req.body;
  try {
    const result = await UpdateUser(id, data);
    res.status(200).json({
      message: "User updated successfully",
      result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req, res, next) => {
  const id = req.user.id;
  try {
    const result = await DeleteUser(id);
    res.status(200).json({
      message: "User deleted successfully",
      result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (req, res, next) => {
  const id = req.user.id;
  try {
    const result = await getUser(id);
    res.status(200).json({
      message: "User retrieved successfully",
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
