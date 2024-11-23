import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    credits: v.number(),
  }),
  pdfFiles: defineTable({
    fileUrl: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    createdBy: v.string(),
  }),
  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    // fileId: v.string(),
    metadata: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 768,
  }),
  notes: defineTable({
    fileId: v.string(),
    createdBy: v.optional(v.string()),
    note: v.string(),
    pageNumber: v.optional(v.number()),
  }),
});
