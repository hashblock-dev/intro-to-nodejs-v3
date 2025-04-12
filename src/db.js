import fs from "node:fs/promises";

export const getDB = async () => {
  const db = await fs.readFile("../db.json", "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db) => {
  await fs.writeFile("../db.json", JSON.stringify(db, null, 2));
  return db;
};

export const insertDB = async (note) => {
  const db = await getDB();
  db.notes.push(note);
  await saveDB(db);
  return note;
};
