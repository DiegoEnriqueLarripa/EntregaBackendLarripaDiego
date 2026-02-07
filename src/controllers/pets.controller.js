import { petsService } from "../services/index.js";

const getPets = async (req, res) => {
    try {
        const pets = await petsService.getAll();
        res.json({ status: "success", payload: pets });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const createPet = async (req, res) => {
    try {
        const newPet = await petsService.create(req.body);
        res.status(201).json({ status: "success", payload: newPet });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};

const getPetById = async (req, res) => {
    try {
        const pet = await petsService.getBy({ _id: req.params.pid });
        if (!pet) {
            return res.status(404).json({ status: "error", message: "Pet not found" });
        }
        res.json({ status: "success", payload: pet });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const updatePet = async (req, res) => {
    try {
        const updatedPet = await petsService.update(req.params.pid, req.body);
        if (!updatedPet) {
            return res.status(404).json({ status: "error", message: "Pet not found or not updated" });
        }
        res.json({ status: "success", payload: updatedPet });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};

const deletePet = async (req, res) => {
    try {
        const deletedPet = await petsService.delete(req.params.pid);
        if (!deletedPet) {
            return res.status(404).json({ status: "error", message: "Pet not found" });
        }
        res.json({ status: "success", message: "Pet deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export {
    getPets,
    createPet,
    getPetById,
    updatePet,
    deletePet,
};