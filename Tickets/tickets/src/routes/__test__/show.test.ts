import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket'

it('returns a 404 if the ticket is not found', async () => {
  const ticketResponse = await request(app)
    .get('/api/tickets/650229792b7a4f9c47843a0f')
    .send()
    .expect(404);
})

it('returns the ticket if ticket is found', async () => {
  const title = "concert"
  const price = 10;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title, price
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
})
