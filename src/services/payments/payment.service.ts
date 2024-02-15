import ENV from "@/constants/env.constant";
import { CustomError, getSuccessLink } from "@/utils";
import { Request } from "express";
import Stripe from "stripe";
import UserService from "../users/users.service";

class PaymentRepository {
  stripe: Stripe = null as any;

  constructor() {
    this.stripe = new Stripe(ENV.STRIPE_SECRET_KEY!);
  }

  async generateCheckoutLink(req: Request) {
    const user = req.user;
    const userId = user.id;

    if (user.subStatus === "paid") {
      throw new CustomError("You have already subscribed", 400);
    }

    // creating customers...
    // const customer = await stripe.customers.create({
    //   metadata: {
    //     userId,
    //   },
    // });
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1OjkHNKBNFjd9BeUNsP73XR2",
          quantity: 1,
        },
      ],
      mode: "payment",
      // customer: customer.id,
      payment_intent_data: {
        metadata: {
          userId,
        },
      },
      success_url: getSuccessLink(req),
    });

    return session;
  }

  async setupWebhook(req: Request) {
    const sig = req.headers["stripe-signature"]!;
    let event: Stripe.Event;

    const webhookSecret: string = ENV.STRIPE_WEBHOOK_SECRET;

    try {
      event = this.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      throw new CustomError(`Webhook Error: ${err.message}`, 400);
    }

    // Successfully constructed event
    // console.log("✅ Success:", event.id);
    console.log("body>>", req.body);
    console.log("event>>", event);
    if (event.type === "payment_intent.succeeded") {
      const data = event.data.object;
      const { userId } = data.metadata;
      await UserService.subscribe(userId);
    }

    // Handle More cases
    // if (event.type === "checkout.session.completed") {
    //   const data = event.data.object;
    //   // const customer = await stripe.customers.retrieve(data.customer as string);
    //   // console.log(customer);
    // }
    return event;
  }
}

const PaymentService = new PaymentRepository();
export default PaymentService;
