import { renderComments } from "./renderComments.js";
const host = "https://wedev-api.sky.pro/api/v1/dima-vorobev/comments";

export function fetchComments() {
  return fetch(host)
    .then((res) => res.json())
    .then((responseData) => {
      let appComents = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date,
          coments: comment.text,
          likes: comment.likes,
          isActiveLike: false,
        }
      });
      return appComents;
    });
}

export function postComment() {
  return fetch(host, {
    method: 'POST',
    body: JSON.stringify(
      {
        text: textInputElement.value,
        name: nameInputElement.value,
      })
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