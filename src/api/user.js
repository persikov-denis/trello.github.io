import axios from "axios";

// (Получение всех участников)
function loadAll() {
  return axios.get("/api/user").then((data) => data.data);
}

//(Получение по id участника)
function loadById(id) {
  return axios.get(`/api/user?id=${id}`).then((data) => data.data);
}

// Отправляю (body это объект {login, password} )  (Отправка login i password)
function login(body) {
  return axios.post(`/api/user/login`, body).then((data) => data.data);
}

// В этом body лежит объект {id} (Отправка id участника )
function logout(body) {
  return axios.post(`/api/user/login`, body).then((data) => data.data);
}

// (Создание  участника  (Отправление участника))
function create(body) {
  return axios.post(`/api/user`, body).then((data) => data.data);
}

// (Редактирование  участника   (Отправление участника))
function update(body) {
  return axios.put(`/api/user`, body).then((data) => data.data);
}

// Удаление по id
function remove(id) {
  return axios.delete(`/api/user?id=${id}`).then((data) => data.data);
}

export const UserApi = {
  loadAll,
  loadById,
  login,
  logout,
  create,
  update,
  remove,
};
