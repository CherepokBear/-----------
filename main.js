import { renderComments} from "./renderComments";
import { fetchComments, postComment} from "./api";
import { delay, sanitizeHtml} from "./utils";

 const name = document.getElementById('name-input');
 const text = document.getElementById('text-input');

 export let comments = [];

 let isInitiaLoading = true;
 let isPosting = false;

 fetchComments()
 .then((data) => delay(data))
 .then((data) => {
    comments = data; 
    isInitiaLoading = false;
    renderComents(isInitialLoading, comments);
 })
 .catch((error) => {
  alert(error.message)
})

 
renderComments(isInitialLoading, comments);

const addButton = document.getElementById('add-button');
const handlePostClick = ()=> {
  if (!name.value || !text.value) {
    alert('Заполните форму');
    return;
  }

  isPostinng = true;
  document.querySelector('.form-loading').style.display = 'block';
  document.querySelector('.add-form').style.display = 'none';
  renderComments(isInitialLoading, comments);
  
  postCommemt(text.value, name.value)
  .then((data)=>{
    name.value = "";
    text.value = "";
    document.querySelector('.form-loading').style.display = 'none';
    document.querySelector('.add-form').style.display = 'flex';
    isPosting = false;
    comments = data;
    renderComments(isInitialLoading, comments);
  })
.catch((error)=>{
  document.querySelector('.form-loading').style.display = 'none';
  document.querySelector('.add-form').style.display = 'flex';
  isPosting = false;

  if (error.message == "Ошибка сервера") {
    handlePostClick();
    alert("Сервер сломался, попробуй  те позже");
  }

  if (error.message == "Неверный запрос") {
    handlePostClick();
    alert("Имя и коментарии должны быть не менее трех символов");

    name.classList.add('-error');
    text.classList.add('-error');
    setTimeout(() => {
      name.classList.remove('-error');
      text.classList.remove('-error');
    }, 2000);
  }
});
renderComments(isInitialLoading, comments);
};

addButton.addEventListener("click", handlePostClick);


