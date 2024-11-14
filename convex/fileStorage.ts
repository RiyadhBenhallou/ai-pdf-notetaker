import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
