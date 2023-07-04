export default class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._name = profileName;
    this._about = profileAbout;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent
    };

    return userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._about.textContent = userInfo.about;
  }
}
