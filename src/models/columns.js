export class Columns {
  title = "";
  id = 0;

  constructor({ title, id }) {
    this.title = title;
    this.id = id || Math.floor(Date.now() * Math.random());
  }
}
