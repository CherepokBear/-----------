
import { sanitizeHtml} from "./main";

export const renderComments = (isInitialLoading, comments) => {
    // const likeButtonClass = "like-button";

    // if (isInitialLoading) {
    //     document.getElementById('comments').innerHTML =
    //         "Пожалуйста подождите, загрузка комментария...";
    //     return;
    // }

    // document.getElementById('comments').innerHTML = comments.map((comment, index) => {
    //     return `
    //     <li class="comment">
    //         <div class="comment-header">
    //         <div>${sanitizeHtml(comment.name)}</div>
    //         <div>${comment.date.toLocaleDateString()} ${comment.date.toLocaleTimeString()}</div>
    //             </div>
    //             <div class="comment-body ">
    //             <div  class="comment-text">
    //                 ${comment.text}
    //             </div>
    //         </div>
    //         <div class="comment-footer">
    //         <div class="likes">
    //             <span class="likes-counter">${comment.likes}</span>
    //             <button data-index=${index} class="${likeButtonClass} ${comment.isLiked ?
    //             "-active-like" : ""}
    //             ${comment.isLikeLoading ? "-loading-like" : ""}"></button>
    //         </div>
    //         </div>
    //     </li>`;
    // })
    //     .join("");

    // for (const likeButton of document.querySelectorAll(`${likeButtonClass}`)) {
    //     likeButton.addEventListener('click', (event) => {
    //         event.stopPropagation();
    //         const comment = comments[likeButton.dataset.index];
    //         comment.isLikeLoading = true;

    //         renderComments();
    //         delay(2000).then(() => {
    //             comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
    //             comment.isLiked = !comment.isLiked;
    //             comment.isLikedLoading = false;
    //             renderComments();
    //         });
    //     });
    // };


    // for (const comment of document.querySelectorAll(".comment")) {
    //     comment.addEventListener('click', () => {
    //         text.value = `%BEGIN_QUOTES${comments[commet.dataset.index].name}:
    //     ${comments[commet.dataset.index].text}END_QUOTE%
    //     `;
    //     });
    // };
    console.log("renderComments");
    app.innerHTML = "Код работает!";
};