const Note = require("../models/note");

const getAddNote = (req, res, next) => {
  res.send(
    '<form action="/notes" method="POST"><input type="text" name="title"><textarea name="content"></textarea><button type="submit">Add Note</button></form>'
  );
};

const postAddNote = (req, res, next) => {
  const { title, content } = req.body;
  const newNote = new Note(title, content);
  newNote.save();
  res.redirect("/notes");
};

const getNotes = (req, res, next) => {
  const fetchAllNotes = Note.fetchAll();
  if (fetchAllNotes.length === 0) {
    return res.send("<h1>No Notes Available</h1>");
  }

  let noteList = "<h1>All Notes</h1><ul>";
  fetchAllNotes.forEach((note) => {
    noteList += `<li><h2>${note.title}</h2><p>${note.content}</p></li>`;
  });
  noteList += `</ul>`;
  res.send(noteList);
};

module.exports = {
  getAddNote,
  postAddNote,
  getNotes,
};
