import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the provided id does not exist", async () => {
  const updateData = {
    title: "Concert Ipsum",
    price: 10,
  };

  // generated mongoose ObjectId
  const genId = new mongoose.Types.ObjectId().toString();

  await request(app)
    .put(`/api/tickets/${genId}`)
    .set("Cookie", global.signin())
    .send(updateData)
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const updateData = {
    title: "Concert Ipsum",
    price: 10,
  };

  // generated mongoose ObjectId
  const genId = new mongoose.Types.ObjectId().toString();

  await request(app).put(`/api/tickets/${genId}`).send(updateData).expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const response = await global.createTicket();
  const ticketId = response.body.id;

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", global.signin({ email: "test2@test2.com", id: "intrusive" }))
    .send({
      title: "Concert Ipsum",
      price: 10,
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid price", async () => {
  const response = await global.createTicket();
  const ticketId = response.body.id;

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", global.signin())
    .send({
      title: "Concert Ipsum",
      price: -10,
    })
    .expect(400);
});

it("returns a 400 if the user provides an invalid title", async () => {
  const response = await global.createTicket();
  const ticketId = response.body.id;

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const response = await global.createTicket();
  const ticketId = response.body.id;

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", global.signin())
    .send({
      title: "Title Ipsum",
      price: 10,
    })
    .expect(200);
});
