import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'API de Adopción - Adoptme',
            version: '1.0.0',
            description: 'Documentación oficial de la API de Adoptme'
        }
    },
    
    apis: [`${path.join(__dirname, '../docs/**/*.yaml')}`]
};

export const specs = swaggerJsdoc(swaggerOptions);