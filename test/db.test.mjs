import fs from "node:fs/promises";
import { expect } from "chai";
import sinon from "sinon";
import { getDB, saveDB, insertDB } from "../src/db.js";

describe("db.js", () => {
  let readFileStub, writeFileStub;

  beforeEach(() => {
    readFileStub = sinon.stub(fs, "readFile");
    writeFileStub = sinon.stub(fs, "writeFile");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getDB", () => {
    it("should read and parse the database file", async () => {
      const mockData = JSON.stringify({ notes: [] });
      readFileStub.resolves(mockData);

      const db = await getDB();

      expect(readFileStub.calledWith("../db.json", "utf-8")).to.be.true;
      expect(db).to.deep.equal({ notes: [] });
    });
  });

  describe("saveDB", () => {
    it("should write the database to the file", async () => {
      const mockDB = { notes: [] };

      await saveDB(mockDB);

      expect(
        writeFileStub.calledWith("../db.json", JSON.stringify(mockDB, null, 2))
      ).to.be.true;
    });
  });

  describe("insertDB", () => {
    it("should insert a note into the database and save it", async () => {
      const mockDB = { notes: [] };
      const newNote = { id: 1, content: "Test note" };

      readFileStub.resolves(JSON.stringify(mockDB));
      writeFileStub.resolves();

      const result = await insertDB(newNote);

      expect(readFileStub.calledWith("../db.json", "utf-8")).to.be.true;
      expect(
        writeFileStub.calledWith(
          "../db.json",
          JSON.stringify({ notes: [newNote] }, null, 2)
        )
      ).to.be.true;
      expect(result).to.deep.equal(newNote);
    });
  });
});
