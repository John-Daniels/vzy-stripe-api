#!/usr/bin/env -S npm run-script run

import { paymentWebhook, subscribe } from "@/controllers/payments.controller";
import { verifyAuthToken } from "@/middlewares/auth.middleware";
import express, { Router } from "express";

const router = Router();

router.get("/success", (req, res) => {
  res.send(
    "<h1>You have Successfully Subscribed!, Thanks for choosing us</h1>"
  );
});

router.post(
  "/webhook",
  // Stripe requires the raw body to construct the event
  express.raw({ type: "application/json" }),
  paymentWebhook
);

router.use(verifyAuthToken);
router.post("/subscribe", subscribe);

export default router;
