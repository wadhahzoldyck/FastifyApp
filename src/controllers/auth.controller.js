import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, reply) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return reply.status(400).send({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({ fullName, email, password: hashedPassword });
    const userResponse = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    };

    reply.status(201).send({ message: 'User registered successfully', user: userResponse });
  } catch (err) {
    reply.status(500).send({ error: 'Registration failed', details: err.message });
  }
};


const login = (req, reply) => {
  const { email, password } = req.body;

  db.User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return reply.code(404).send({ error: 'User not found!' });
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return reply.code(401).send({ error: 'Invalid credentials!' });
        }

        const token = req.server.jwt.sign({ id: user.id, email: user.email });

        reply.send({
          message: 'Login successful!',
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName, 
          },
          token: token, 
        });
      });
    })
    .catch((err) => {
      reply.code(500).send({ error: 'Login failed!', details: err.message });
    });
};


export default { register, login };
