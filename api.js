import { renderComments } from "./renderComments.js";
import { delay } from "./utils.js";

const host = "https://wedev-api.sky.pro/api/v1/dima-vorobev/comments";
const loginHost = "https://wedev-hw-api.versel.app/api/user/login"

export function fetchComments() {

  return fetch(host)
    .then((res) => res.json())
    .then((responseData) => {
      let appComents = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          coments: comment.text,
          likes: comment.likes,
          isActiveLike: false,
        }
      });
      return appComents;
    });
}

export function fetchLogin(login, password) {
  return fetch(loginHost, {
    method: 'POST',
    body: JSON.stringify(
      {
        login,
        password,
      })
  })
    .then((response) => {

      return response.json();
    })
}

export function postComment(text) {
  return fetch(host, {
    method: 'POST',
    body: JSON.stringify(
      {
        text,
      }),
    headers: {
      Autorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 500) {
        return new Error("Ошибка сервера");
      }

      if (response.status === 400) {
        return new Error("Неверный запрос");
      }
    })
    .then(() => delay())
    .then(() => {
      return fetchComments();
    })
    .then((data) => delay(data));
}
