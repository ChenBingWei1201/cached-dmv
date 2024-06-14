import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const pickupTime = query({
  handler: async (ctx) => {
    const record = await ctx.db.query("time").first();
    return record!.currentPickupTime;
  },
});

export const users = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    users.sort((a, b) => b._creationTime - a._creationTime);
    return users.map((u) => {
      return { id: u._id, name: u.name };
    });
  },
});

export const userWaitTime = query({
  args: {
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.user);
    const dmvTime = await ctx.db.query("time").first();
    const userPickuptime =
      dmvTime!.currentPickupTime + user!.minutesWait * 60_000;
    return {
      time: userPickuptime,
      name: user?.name,
      id: user?._id,
    };
  },
});

export const updateTime = internalMutation({
  handler: async (ctx) => {
    const timeDoc = await ctx.db.query("time").first();
    await ctx.db.patch(timeDoc!._id, {
      currentPickupTime: new Date().getTime(),
    });
  },
});
