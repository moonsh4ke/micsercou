import express from 'express';
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import cookieSession from 'cookie-session'
import mongoose from 'mongoose'

const app = express();
app.use(json());
app.set('trust proxy', true); // Express is aware of a proxy (ingress nginx)
app.use(
    cookieSession({
        signed: false, // diable encryption
        secure: true
    })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to mongodb');
  } catch (err) {
    console.error(err);
  }
}

app.listen(3000, () => {
    console.log('Listening on port 3000!')
})

start();
