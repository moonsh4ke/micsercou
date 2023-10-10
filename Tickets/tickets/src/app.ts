import express from "express";
import { json } from "body-parser";
import { errorHandler } from "@sn1006/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { currentUser } from "@sn1006/common";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";

const app = express();

app.use(json());
app.set("trust proxy", true); // Express is aware of a proxy (ingress nginx)
app.use(
  cookieSession({
    signed: false, // diable encryption
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
app.use(errorHandler);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

export { app };
