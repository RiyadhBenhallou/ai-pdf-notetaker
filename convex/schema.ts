import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  }),
  pdfFiles: defineTable({
    fileUrl: v.string(),
    fileName: v.string(),
    createdBy: v.string(),
  }),
});
