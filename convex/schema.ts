import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  time: defineTable({
    currentPickupTime: v.number(),
  }),
  users: defineTable({
    name: v.string(),
    minutesWait: v.number(),
  }),
});
