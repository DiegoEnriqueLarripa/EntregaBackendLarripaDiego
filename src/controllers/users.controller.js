import { usersService } from "../services/index.js";

const getUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.json({ status: "success", payload: users });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await usersService.create(req.body);
        res.status(201).json({ status: "success", payload: newUser });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await usersService.getUserById(req.params.uid);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        res.json({ status: "success", payload: user });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await usersService.update(req.params.uid, req.body);
        if (!updatedUser) {
            return res.status(404).json({ status: "error", message: "User not found or not updated" });
        }
        res.json({ status: "success", message: "User updated" });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await usersService.delete(req.params.uid);
        if (!deletedUser) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        res.json({ status: "success", message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};