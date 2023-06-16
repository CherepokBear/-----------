import { renderComments} from "./renderComments.js";
import { fetchComments, postComment} from "./api.js";
import { delay} from "./utils.js";


//  const name = document.getElementById('name-input');
//  const text = document.getElementById('text-input');

const app = document.getElementById('app');

  let comments = [];

  let isInitiaLoading = true;
  let isPosting = false;
 
 fetchComments()
 .then((data) => delay(data))
 .then((data) => {
    comments = data; 
    isInitiaLoading = false;
    renderComments(isInitiaLoading, comments, app, isPosting);
 })
 .catch((error) => {
  alert(error.message)
})

 
renderComments(isInitiaLoading, comments, app, isPosting);

const addButton = document.getElementById('add-button');
const handlePostClick = ()=> {
  if (!name.value || !text.value) {
    alert('Заполните форму');
    return;
  }

  isPostinng = true;
  document.querySelector('.form-loading').style.display = 'block';
  document.querySelector('.add-form').style.display = 'none';
  renderComments(isInitiaLoading, comments);
  
  postComment(text.value, name.value)
  .then((data)=>{
    name.value = "";
    text.value = "";
    document.querySelector('.form-loading').style.display = 'none';
    document.querySelector('.add-form').style.display = 'flex';
    isPosting = false;
    comments = data;
    renderComments(isInitiaLoading, comments, app, isPosting);
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

renderComments(isInitiaLoading, comments, app, isPosting);
};



