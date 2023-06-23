
import { sanitizeHtml } from "./utils.js";
import { renderLogin } from "./renderLogin.js";
import { delay } from "./utils.js";
import { postComment, fetchComments } from "./api.js";
import { format } from "./node_modules/date-fns/";

export const renderComments = (isInitiaLoading, comments, app, isPosting, user) => {
    const likeButtonClass = "like-button";

    const now = new Date();
    let commentsHTML = comments.map((comment, index) => {
        return `
        <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${sanitizeHtml(comment.name)}</div>
          <div>${format(now, "MM-dd-yyyy hh:mm")}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${sanitizeHtml(
            comment.text
                .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
                .replaceAll("END_QUOTE%", "</div>")
        )}
          </div>
        </div>

      </li>
      `;
    })
        .join("");
    
    const commentsHtml = comments
    .map((comment) => {
      return `
          <li class="comment">
            <p class="comment-text">
              ${comment.text} (Создал: ${comment.user?.name ?? "Неизвестно"})
              <button data-id="${
                comment.id
              }" class="button delete-button">Удалить</button>
            </p>
            <p><i>Задача создана: ${formatDateToRu(new Date(comment.created_at))}</i></p>
          </li>`;
    })
    .join("");

    const appHtml = `
        <div class="container">
            <ul class = "comments">
                ${isInitiaLoading ? "<div class = 'loading'>Загрузка коментариев...</div>" : commentsHTML}
            </ul>

            ${user ?
            `
        <div class="add-form">
            <h3 class="title">Оставьте свой комментарий</h3>
            <input type="text" class = 'add-form-name'  placeholder="Введите ваше имя" id="name-input" value=" ${user.name}" dasabled/>
            <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4" id="text-input"></textarea>
        </div>
        <div class="add-form">
            <button class="add-button " id="add-form-button">Написать</button>
        </div>
    `
            : ` <div class = "form-loading" style="margin-top: 20px">
                    Что бы добавить комментарий, <a href='#' id="go-to-login" href='#'>авторизуйтесь</a>
                </div> `
        }
        </div>`;
    app.innerHTML = appHtml;

    if (!isInitiaLoading && !isPosting) {
        for (const likeButton of document.querySelectorAll(`.${likeButtonClass}`)) {
            likeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                const comment = comments[likeButton.dataset.index];
                comment.isLikeLoading = true;

                renderComments(isInitiaLoading, comments, app, isPosting);
                delay(2000).then(() => {
                    comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
                    comment.isLiked = !comment.isLiked;
                    comment.isLikedLoading = false;
                    renderComments(isInitiaLoading, comments, app, isPosting, user);
                });
            });
        };

        for (const comment of document.querySelectorAll(".comment")) {
            comment.addEventListener('click', () => {
                const text = document.getElementById("text-input");
                text.value = `
                ${comments[comment.dataset.index].name}:
                ${comments[comment.dataset.index].text}
        `;
            });
        };


        if (!user) {
            const goToLogin = document.getElementById('go-to-login');
            goToLogin.addEventListener("click", (event) => {
                event.preventDefault();
                renderLogin(isInitiaLoading, comments, app, isPosting, user)
            })
        }

        if (user) {
            const addButton = document.querySelector('.add-button');
            addButton.addEventListener("click", () => {
                const text = document.getElementById('text-input').value;
                const name = document.getElementById('name-input').value;
                if (text) {
                    postComment(text, name, user.token).then(() => {
                        return fetchComments();
                    }).then((data) => {
                        renderComments(isInitiaLoading, data, app, isPosting, user);
                    });
                }
            })
        }
        
    }
};