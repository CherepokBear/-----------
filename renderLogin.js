import { fetchLogin } from "./api.js";
import { renderComments } from "./renderComments.js";

export const renderLogin = (isInitiaLoading, comments, app, isPosting) => {
  app.innerHTML = `
    <div class="container">
    <div class="add-form">
      <h3 class="title">Форма входа</h3>
      <input class = 'add-form-name add-form-login' type="text" placeholder="Введите логин" id="login"/>
      <input class = 'add-form-name add-form-login' style="margin-top: 20px" type="password" placeholder="Введите пароль" id="password"/>
      <button class="auth-button add-form-button" id="auth-button">Войти</button>
      <button class="auth-button add-form-button auth-toggle" style="margin-top: 20px" id="auth-toggle-button">Зарегистрироваться</button>
    </div>
  </div> 
    `;
  const authButton = document.getElementById("auth-button");
  authButton.addEventListener("click", () => {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    fetchLogin(login, password).then((response) => {
      renderComments(isInitiaLoading, comments, app, isPosting, response.user);
    });
  });
};
