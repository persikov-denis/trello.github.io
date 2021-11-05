import axios from "axios";

// (Получение всех card)
function loadAll() {
  return axios.get("/api/card").then((data) => data.data);
}

// (Получение по id card)
function loadById(id) {
  return axios.get(`/api/card?id=${id}`).then((data) => data.data);
}

// (Создание  card (Отправление card)
function create(body) {
  return axios.post(`/api/card`, body).then((data) => data.data);
}

// (Редактирование  card (Отправление card )
function update(body) {
  return axios.put(`/api/card`, body).then((data) => data.data);
}

// Удаление по id
function delete(id) {
  return axios.delete(`/api/card?id=${id}`).then((data) => data.data);
}

export const CardApi = {
  loadAll,
  loadById,
  create,
  update,
  delete,
};
