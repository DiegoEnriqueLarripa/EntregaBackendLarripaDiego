import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const generateMockPet = () => {
    return {
        _id: new mongoose.Types.ObjectId(),
        name: faker.animal.type() + ' ' + faker.person.firstName(),
        specie: faker.animal.type(),
        age: faker.number.int({ min: 1, max: 15 }),
        birthDate: faker.date.past({ years: 10 }).toISOString().split('T')[0],
        adopted: faker.datatype.boolean()
    };
};

const generateMockPets = (count = 1) => {
    const pets = [];
    for (let i = 0; i < count; i++) {
        pets.push(generateMockPet());
    }
    return pets;
};

const generateMockUser = async () => {
    const hashedPassword = await bcrypt.hash('coder123', 10);

    return {
        _id: new mongoose.Types.ObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 99 }),
        password: hashedPassword,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: []
    };
};

const generateMockUsers = async (count = 1) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(await generateMockUser());
    }
    return users;
};

export {
    generateMockPet,
    generateMockPets,
    generateMockUser,
    generateMockUsers
};