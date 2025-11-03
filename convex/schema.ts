import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  waitlist: defineTable({
    fullName: v.string(),
    email: v.string(),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    submittedAt: v.number(),
  }).index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_submitted_at", ["submittedAt"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
