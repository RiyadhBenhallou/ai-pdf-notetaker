import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const saveFile = mutation({
  args: {
    storageId: v.string(),
    fileName: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    const fileId = await ctx.db.insert("pdfFiles", {
      fileUrl: url as string,
      fileName: args.fileName,
      createdBy: args.createdBy,
    });

    return { fileId, url };
  },
});

// export const getFileUrl = mutation({
//   args: {
//     storageId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     return await ctx.storage.getUrl(args.storageId);
//   },
// });

export const getFileById = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("_id"), args.fileId))
      .collect();
    return file[0];
  },
});
