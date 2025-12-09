const notes = [];

module.exports = class Note {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  save() {
    notes.push(this);
  }

  static fetchAll() {
    return notes;
  }
};
