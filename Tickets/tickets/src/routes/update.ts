import { Router, Request, Response, NextFunction } from "express";
import { Ticket } from "../models/ticket";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  validateRequest,
} from "@sn1006/common";
import { body } from "express-validator";

const router = Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      // find ticket
      const ticket = await Ticket.findById(id);

      if (!ticket) {
        return next(new NotFoundError());
      }

      // check user ownership
      if (ticket.userId !== req.currentUser!.id)
        return next(new NotAuthorizedError());

      ticket.set(updateData)
      await ticket.save();
      return res.send(200).send(ticket);

    } catch (err) {
      return next(err);
    }
  }
);

export { router as updateTicketRouter };
