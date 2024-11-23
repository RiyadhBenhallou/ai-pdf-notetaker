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

export const updateNotePage = mutation({
  args: {
    pageNumber: v.number(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    if (record.length === 0) {
      return "Error";
    } else {
      await ctx.db.patch(record[0]._id, {
        pageNumber: args.pageNumber,
      });
    }
  },
});

export const getPageNumber = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    return record[0]?.pageNumber;
  },
});

export const getNotes = query({
  handler: async (ctx) => {
    const notes = await ctx.db.query("notes").collect();
    return notes;
  },
});

export const getNotesByUserId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("createdBy"), args.userId))
      .collect();
    return notes;
  },
});

export const deleteNote = mutation({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const deleteNoteByFileId = mutation({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    if (record.length > 0) {
      await ctx.db.delete(record[0]._id);
    }
  },
});

export const deleteNotesByUserId = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("createdBy"), args.userId))
      .collect();
    for (const note of notes) {
      await ctx.db.delete(note._id);
    }
  },
});
