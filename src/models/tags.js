export class Tags {
  backgroundColor = "";
  name = "";
  id = 0;

  constructor({ backgroundColor, name, id }) {
    this.backgroundColor = backgroundColor;
    this.name = name;
    this.id = id || Math.floor(Date.now() * Math.random());
  }
}
