import PaymentService from "@/services/users/payment.service";
import { catchAsync } from "@/utils/errors";
import respond from "@/utils/respond";
import { Request, Response } from "express";

export const paymentWebhook = async (req: Request, res: Response) => {
  await PaymentService.setupWebhook(req);
  respond(res, 200, "recieved");
};

export const subscribe = catchAsync(async (req, res) => {
  const session = await PaymentService.generateCheckoutLink(req);
  respond(res, 201, "Successfully created Payment link", {
    url: session.url,
  });
});
