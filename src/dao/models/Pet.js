import mongoose from 'mongoose'; // Importación por defecto

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specie: { type: String, required: true },
    age: { type: Number, required: true },
    birthDate: { type: String, required: true }, // Podría ser de tipo Date, pero si lo manejas como string está bien.
    adopted: { type: Boolean, default: false }
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;