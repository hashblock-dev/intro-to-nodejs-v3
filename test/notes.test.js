import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  getDB: jest.fn(),
  saveDB: jest.fn(),
  insertDB: jest.fn(),
}));

const { getDB, saveDB, insertDB } = await import("../src/db.js");
const { newNote, getAllNotes, findNotes, removeNote, removeAllNotes } =
  await import("../src/notes.js");

describe("Notes Module", () => {
  beforeEach(() => {
    getDB.mockClear();
    saveDB.mockClear();
    insertDB.mockClear();
  });

  test("newNote should create a new note", async () => {
    const noteContent = "Test note";
    const tags = ["tag1", "tag2"];
    const expectedNote = { id: Date.now(), content: noteContent, tags };
    insertDB.mockResolvedValue(expectedNote);

    const result = await newNote(noteContent, tags);
    expect(result.content).toEqual(expectedNote.content);
  });

  test("getAllNotes should return all notes", async () => {
    const notes = [
      { id: 1, content: "Note 1", tags: [] },
      { id: 2, content: "Note 2", tags: [] },
    ];
    getDB.mockResolvedValue({ notes });

    const result = await getAllNotes();
    expect(result).toEqual(notes);
  });

  test("findNotes should return filtered notes", async () => {
    const notes = [
      { id: 1, content: "Note 1", tags: [] },
      { id: 2, content: "Note 2", tags: [] },
    ];
    getDB.mockResolvedValue({ notes });

    const result = await findNotes("1");
    expect(result).toEqual([notes[0]]);
  });

  test("removeNote should remove a note by id", async () => {
    const notes = [
      { id: 1, content: "Note 1", tags: [] },
      { id: 2, content: "Note 2", tags: [] },
    ];
    getDB.mockResolvedValue({ notes });

    const result = await removeNote(1);
    expect(result).toEqual([notes[1]]);
    expect(saveDB).toHaveBeenCalledWith({ notes: [notes[1]] });
  });

  test("removeAllNotes should remove all notes", async () => {
    const notes = [
      { id: 1, content: "Note 1", tags: [] },
      { id: 2, content: "Note 2", tags: [] },
    ];
    getDB.mockResolvedValue({ notes });

    const result = await removeAllNotes();
    expect(result).toEqual([]);
    expect(saveDB).toHaveBeenCalledWith({ notes: [] });
  });
});
