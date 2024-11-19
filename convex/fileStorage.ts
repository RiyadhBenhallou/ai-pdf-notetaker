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
      storageId: args.storageId,
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

export const getUserFiles = query({
  args: {
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const files = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createdBy"), args.createdBy))
      .collect();
    return files;
  },
});

export const deleteFile = mutation({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("_id"), args.fileId))
      .collect();
    if (file.length > 0) {
      await ctx.storage.delete(file[0].storageId);
      await ctx.db.delete(file[0]._id);
      const note = await ctx.db
        .query("notes")
        .filter((q) => q.eq(q.field("fileId"), args.fileId))
        .collect();
      if (note.length > 0) {
        await ctx.db.delete(note[0]._id);
        const documents = await ctx.db
          .query("documents")
          .filter((q) => q.eq(q.field("metadata"), { fileId: args.fileId }))
          .collect();
        if (documents.length > 0) {
          for (const document of documents) {
            await ctx.db.delete(document._id);
          }
        }
      }
    }
  },
});

export const saveNote = mutation({
  args: {
    fileId: v.string(),
    note: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const note = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    if (note.length > 0) {
      await ctx.db.patch(note[0]._id, {
        note: args.note,
      });
    } else {
      await ctx.db.insert("notes", {
        fileId: args.fileId,
        note: args.note,
        createdBy: args.createdBy,
      });
    }
  },
});

export const getNote = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const note = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    if (note.length > 0) {
      return note[0];
    } else {
      return null;
    }
  },
});

export const deleteNote = mutation({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const note = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    if (note.length > 0) {
      await ctx.db.delete(note[0]._id);
      return { success: true };
    } else {
      return { success: false, message: "Note not found" };
    }
  },
});

export const getAllFiles = query(async (ctx) => {
  const files = await ctx.db.query("pdfFiles").collect();
  return files;
});

export const getAllNotes = query(async (ctx) => {
  const notes = await ctx.db.query("notes").collect();
  return notes;
});
