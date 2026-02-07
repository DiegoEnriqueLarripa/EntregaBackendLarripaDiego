import { generateMockPets, generateMockUsers } from '../utils/mockingUtils.js';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';

const getMockingPets = (req, res) => {
    const mockedPets = generateMockPets(100);
    res.status(200).json({ status: "success", payload: mockedPets });
};

const getMockingUsers = async (req, res) => {
    try {
        const numUsers = parseInt(req.query.count) || 50;
        if (isNaN(numUsers) || numUsers <= 0) {
            return res.status(400).json({ status: "error", message: "El parámetro 'count' debe ser un número positivo." });
        }
        const mockedUsers = await generateMockUsers(numUsers);
        res.status(200).json({ status: "success", payload: mockedUsers });
    } catch (error) {
        console.error("Error al generar usuarios mock:", error);
        res.status(500).json({ status: "error", message: "Error interno del servidor al generar usuarios mock." });
    }
};

const generateMockData = async (req, res) => {
    const { users: numUsers, pets: numPets } = req.body;

    if (isNaN(numUsers) || isNaN(numPets) || numUsers < 0 || numPets < 0) {
        return res.status(400).json({ status: "error", message: "Los parámetros 'users' y 'pets' deben ser números positivos." });
    }

    try {
        const generatedUsers = await generateMockUsers(numUsers);
        const generatedPets = generateMockPets(numPets);

        if (generatedUsers.length > 0) {
            await User.insertMany(generatedUsers);
        }
        if (generatedPets.length > 0) {
            await Pet.insertMany(generatedPets);
        }

        res.status(201).json({
            status: "success",
            message: `Se generaron e insertaron ${generatedUsers.length} usuarios y ${generatedPets.length} mascotas en la base de datos.`
        });
    } catch (error) {
        console.error("Error al generar e insertar datos:", error);
        res.status(500).json({ status: "error", message: "Error al generar e insertar datos.", error: error.message });
    }
};

export {
    getMockingPets,
    getMockingUsers,
    generateMockData
};