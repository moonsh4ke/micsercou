import {Router, Request, Response, NextFunction} from 'express'
import { Ticket } from '../models/ticket'
import {NotFoundError} from '@sn1006/common'

const router = Router();

router.get('/api/tickets/:id', async (req: Request, res: Response, next: NextFunction) => {
  const {id: ticketId} = req.params

  const ticket = await Ticket.findOne({_id: ticketId})
  if(!ticket) {
    return next(new NotFoundError())
  }

  return res.status(200).send(ticket);
})

export { router as showTicketRouter };
