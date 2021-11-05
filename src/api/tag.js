import axios from "axios";

// (Получение всех tag )
function loadAll() {
  return axios.get("/api/tag").then((data) => data.data);
}

// (Получение по id tag )
function loadById(id) {
  return axios.get(`/api/tag?id=${id}`).then((data) => data.data);
}

// (Создание  tag (Отправление tag )
function create(body) {
  return axios.post("/api/tag", body).then((data) => data.data);
}

// (Редактирование  tag (Отправление tag )
function update(body) {
  return axios.put("/api/tag", body).then((data) => data.data);
}

// (Удаление  tag )
function delete(id) {
  return axios.delete(`/api/tag?id=${id}`).then((data) => data.data);
}

export const TagApi = {
  loadAll,
  loadById,
  create,
  update,
  delete,
};
