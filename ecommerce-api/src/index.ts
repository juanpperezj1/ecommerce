import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { json } from 'body-parser';
import pino from 'pino';
import pinoHttp from 'pino-http';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import setupSwagger from './config/swagger';

const app = express();
const prisma = new PrismaClient();
const logger = pino({ transport: { target: 'pino-pretty' } });

app.use(cors()); // Habilitar CORS
app.use(json());
app.use(pinoHttp({ logger }));

setupSwagger(app); // Configurar Swagger

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
