export default class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._name = profileName;
    this._about = profileAbout;
  }

  getUserInfo() {
    const userInfo = {
      fullName: this._name.textContent,
      profileAbout: this._about.textContent
    };

    return userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.fullName;
    this._about.textContent = userInfo.profileAbout;
  }
}
