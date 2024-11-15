import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveNote = mutation({
  args: {
    fileId: v.string(),
    note: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    if (record.length === 0) {
      await ctx.db.insert("notes", {
        fileId: args.fileId,
        note: args.note,
        createdBy: args.createdBy,
      });
    } else {
      await ctx.db.patch(record[0]._id, {
        note: args.note,
      });
    }
  },
});

export const getNoteById = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    return record[0]?.note;
  },
});
