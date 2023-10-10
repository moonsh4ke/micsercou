import {Router, Request, Response, NextFunction} from 'express'
import { Ticket } from '../models/ticket'

const router = Router();

router.get('/api/tickets', async (req, res, next) => {
  try {
    const tickets = await Ticket.find({});
    return res.status(200).send(tickets);
  } catch(err) {
    return next(err)
  }
})

export { router as indexTicketRouter }
