let { command } = require("../lib");
const NotesDB = require("../lib/database/notes");

command(
  { pattern: "getnote", fromMe: true, desc: 'Get notes' },
  async (message, match) => {
    const _notes = await NotesDB.getNotes();
    const notes = [];
    _notes.map((note) => {
      if (!note.note.includes("IMG;;;")) {
        notes.push("_Saved Notes_" + note.note);
      }
    });
    if (!notes) {
      return await message.reply("_There are no notes saved_");
    }

    await message.reply(notes.join("\n\n"));
  }
);

command(
  { pattern: "savenote", fromMe: true, desc: "Save notes" },
  async (message, match) => {
    const userNote = match || message.reply_message.text;
    if (!userNote && !message.reply_message.text) {
      await message.reply("_Enter a note or reply to a text message_");

      return;
    }

    if (userNote) {
      await NotesDB.saveNote(userNote);
      await message.reply("_Succesfully saved_");

      return;
    } else {
      await message.reply("_Can't save note due to some error_");

      return;
    }
  }
);

command(
  { pattern: "delnote", fromMe: true, desc: 'Delete notes'},
  async (message, match) => {
    await NotesDB.deleteAllNotes();
    return await message.reply("_Succesfully deleted all notes_");
  }
);
