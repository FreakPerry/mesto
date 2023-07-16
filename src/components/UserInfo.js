export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._name = profileName;
    this._about = profileAbout;
    this._avatar = profileAvatar;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };

    return userInfo;
  }

  setUserInfo(data) {
    if (data.name) this._name.textContent = data.name;
    if (data.about) this._about.textContent = data.about;
    this.setAvatar(data);
  }

  setAvatar(data) {
    if (data.avatar) this._avatar.src = data.avatar;
    if (data.name) this._avatar.alt = data.name;
  }
}
