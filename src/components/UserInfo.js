// A classe UserInfo é responsável por renderizar a informação sobre o usuário na página

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    // retorna um objeto com informação sobre o usuário
    const user = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
    return user;
  }

  setUserInfo({ name, job }) {
    // pega novos dados do usuário e adiciona na página
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
