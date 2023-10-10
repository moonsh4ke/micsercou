import request from 'supertest';
import { app } from '../../app'

it('returns 200 on succesfull get', async () => {
  await global.createTicket();
  await global.createTicket();
  await global.createTicket();

  const response = await request(app)
    .get('/api/tickets')
    .expect(200);

  expect(response.body.length).toEqual(3);
})
