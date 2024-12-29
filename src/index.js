import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';

import authRoutes from './routes/auth.routes.js';
import db from '../models/index.js';

dotenv.config();


const fastify = Fastify({ logger: true });

fastify.register(cors);
fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET });

fastify.decorate('auth', (handlers) => async (req, reply) => {
  for (const handler of handlers) {
    await handler(req, reply);
  }
});

authRoutes.forEach((route) => fastify.route(route(fastify)));

const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:4000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};



start();
