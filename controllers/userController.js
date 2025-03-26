const User = require("../models/User");
const bcrypt = require("bcrypt");

/**
 * @swagger
 * /api/create-user:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user with first name, last name, email, password, mobile number, and city.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "Password@123"
 *               mobileNumber:
 *                 type: string
 *                 example: "1234567890"
 *               city:
 *                 type: string
 *                 example: "New York"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Internal server error
 */

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobileNumber, city } =
      req.body;

    // Validate input
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !mobileNumber ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        status: "failure",
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        status: "failure",
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNumber,
      city,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: "failure",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/get-all-users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Internal server error
 */

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({role:'user'});
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Users found successfully!",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: "failure",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/update-user/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, status: "failure", message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/delete-user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, status: "failure", message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
