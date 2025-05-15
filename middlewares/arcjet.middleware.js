import arcjet, {
  shield,
  // detectBot, // commented out for dev testing
  tokenBucket,
} from "@arcjet/node";
import { ARCJET_KEY } from "../config/env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),

    // Bot detection disabled for now
    // detectBot({
    //   mode: "LIVE",
    //   allow: ["CATEGORY:SEARCH_ENGINE"],
    // }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // 5 requests per interval
      interval: 10, // every 10 seconds
      capacity: 10, // max 10 tokens in bucket
    }),
  ],
});

const arcjetMiddleware = async (req, res, next) => {
  try {
    const result = await aj.protect(req);

    if (result?.action === "block") {
      return res.status(403).json({
        message: "Blocked by Arcjet",
        reason: result?.reason || "unknown",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet failed:", error);
    next(); // Proceed even if Arcjet throws
  }
};

export default arcjetMiddleware;
