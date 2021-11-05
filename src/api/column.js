import axios from "axios";

// (Получение всех колонок )
function loadAll() {
  return axios.get("/api/column").then((data) => data.data);
}

// (Создание  колонок  (Отправление колонок )
function create(body) {
  return axios.post(`/api/column`, body).then((data) => data.data);
}

// (Редактирование  колонок (Отправление колонок )
function update(body) {
  return axios.put(`/api/column`, body).then((data) => data.data);
}

// Удаление по id
function delete(id) {
  return axios.delete(`/api/column?id=${id}`).then((data) => data.data);
}

export const ColumnApi = {
  loadAll,
  create,
  update,
  delete,
};
