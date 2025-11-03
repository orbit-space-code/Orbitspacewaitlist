import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitWaitlistEntry = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("Email already registered for waitlist");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.email)) {
      throw new Error("Invalid email format");
    }

    // Validate name
    if (args.fullName.trim().length < 2) {
      throw new Error("Full name must be at least 2 characters");
    }

    const waitlistEntry = await ctx.db.insert("waitlist", {
      fullName: args.fullName.trim(),
      email: args.email.toLowerCase().trim(),
      status: "pending",
      submittedAt: Date.now(),
    });

    return waitlistEntry;
  },
});

export const getWaitlistStats = query({
  args: {},
  handler: async (ctx) => {
    const total = await ctx.db.query("waitlist").collect();
    const pending = total.filter(entry => entry.status === "pending").length;
    const approved = total.filter(entry => entry.status === "approved").length;
    
    return {
      total: total.length,
      pending,
      approved,
    };
  },
});

export const checkEmailExists = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase().trim()))
      .first();
    
    return !!existing;
  },
});
