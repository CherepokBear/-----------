
import { sanitizeHtml } from "./utils.js";
import { renderLogin } from "./renderLogin.js";
import { delay } from "./utils.js";
import { postComment } from "./api.js";


export const renderComments = (
    isInitiaLoading,
    comments,
    app,
    isPosting,
    user) => {

    const likeButtonClass = "like-button";

    const commentsHTML = comments.map((comment, index) => {
        return `
        <li class="comment" data-index="${index}">
            <div class="comment-header">
            <div>${sanitizeHtml(comment.name)}</div>
            <div>${comment.date.toLocaleDateString()} ${comment.date.toLocaleTimeString()}</div>
                </div>
                <div class="comment-body ">
                <div  class="comment-text">
                    ${comment.text}
                </div>
            </div>
            <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button data-index=${index} class="${likeButtonClass} ${comment.isLiked ?
                "-active-like" : ""}
                ${comment.isLikeLoading ? "-loading-like" : ""}"></button>
            </div>
            </div>
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
            <h3 class="title">Форма входа</h3>
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
        for (const likeButton of document.querySelectorAll(`${likeButtonClass}`)) {
            likeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                const comment = comments[likeButton.dataset.index];
                comment.isLikeLoading = true;

                renderComments(isInitiaLoading, comments, app, isPosting);
                delay(2000).then(() => {
                    comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
                    comment.isLiked = !comment.isLiked;
                    comment.isLikedLoading = false;
                    renderComments(isInitiaLoading, comments, app, isPosting);
                });
            });
        };


        for (const comment of document.querySelectorAll(".comment")) {
            comment.addEventListener('click', () => {
                const text = document.getElementById("text-input");
                text.value = `
                ${comments[commet.dataset.index].name}:
                ${comments[commet.dataset.index].text}
        `;
            });
        };

        if (!user) {
            const goToLogin = document.getElementById('go-to-login');
            goToLogin.addEventListener("click", (event) => {
                event.preventDefault();
                renderLogin()
            })
        }

        if (user) {
            const addButton = document.getElementById('add-button');
            addButton.addEventListener("click", () => {
                const text = document.getElementById('text-input').value;
                if (text) {
                    postComment(text, user.token).then((response) => {
                        renderComments(isInitiaLoading, comments, app, isPosting);
                    })
                }
            })
        }
    }
};