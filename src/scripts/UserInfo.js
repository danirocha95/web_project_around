class UserInfo {
  constructor({ nameSelector, infoSelector }) {
      this._nameElement = document.querySelector(nameSelector);
      this._infoElement = document.querySelector(infoSelector);
  }

  setUserInfo({ name, info }) {
      
      if (name !== undefined) {
          this._nameElement.textContent = name;
      }
      if (info !== undefined) {
          this._infoElement.textContent = info;
      }
  }

  getUserInfo() {
      return {
          name: this._nameElement.textContent,
          info: this._infoElement.textContent
      };
  }
}

export default UserInfo;
