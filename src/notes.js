import { getDB, saveDB, insertDB } from "./db.js";

export const newNote = async (note, tags) => {
  const newNote = { id: Date.now(), content: note, tags };
  await insertDB(newNote);
  return newNote;
};

export const getAllNotes = async () => {
  const db = await getDB();
  return db.notes;
};

export const findNotes = async (filter) => {
  const db = await getDB();
  const notes = db.notes.filter((note) => {
    return note.content.toLowerCase().includes(filter.toLowerCase());
  });
  return notes;
};

export const removeNote = async (id) => {
  const db = await getDB();
  const notes = db.notes.filter((note) => note.id !== id);
  await saveDB({ notes });
  return notes;
};

export const removeAllNotes = async () => {
  await saveDB({ notes: [] });
  return [];
};
