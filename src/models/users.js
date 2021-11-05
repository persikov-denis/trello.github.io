export class User {
  icon = "";
  name = "";
  surname = "";
  fullName = "";
  id = 0;
  isActive = false;
  login = "";
  password = 0;
  isRegistered = false;
  filterCard = false;

  constructor({ icon, name, surname, login, password }) {
    if (typeof surname !== "string") {
      alert("забыли передать фамилию");
    }
    this.icon = icon || require("../assets/img/anonymous.jpg");
    this.name = name;
    this.surname = surname;
    this.id = Math.floor(Date.now() * Math.random());
    this.fullName = name + " " + surname;
    this.login = login;
    this.password = password;
  }
}
