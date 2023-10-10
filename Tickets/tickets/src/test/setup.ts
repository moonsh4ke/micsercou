import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app'
import request from 'supertest';
import jwt from 'jsonwebtoken'
import {Ticket} from '../models/ticket'

declare global {
    function signin(loginData?: {id: string, email: string}): string[];
    function createTicket(): Promise<request.Response>;
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'dfasdsfa';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
})

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})

global.signin = (loginData?: {id: string, email: string}) => {
  // Generar un payload
  let payload = {
    id: "123456",
    email: "test@test.com"
  }
  
  if(loginData) {
    payload = loginData
  }

  // Generar JWT usando KEY del entorno
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Encriptar el token usando base64
  const sessionObj = JSON.stringify({jwt: token})
  const base64session = Buffer.from(sessionObj).toString('base64');
  // Agregar formato de sesion
  return [`session=${base64session}`]
}

global.createTicket = async () => {
  let payload = {
    title: "Lorem Concert",
    price: 10
  }

  return await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send(payload)
    .expect(201);
}
