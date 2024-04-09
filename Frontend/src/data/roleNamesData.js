import { observable, action, makeObservable, runInAction } from "mobx";
import axios from "axios";

class RoleNamesData {
  roles = [];

  baseUrl = `${import.meta.env.VITE_API_URL}/RoleName`;

  constructor() {
    makeObservable(this, {
      roles: observable,
      getRoles: action,
      addRole: action,
    });
    this.getRoles();
    this.setAuthorized();
  }

  setAuthorized() {
    const token = localStorage.getItem("security_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  async getRoles() {
    try {
      const response = await axios.get(this.baseUrl);
      runInAction(() => {
        this.roles = response.data;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addRole(role) {
    try {
      const response = await axios.post(this.baseUrl, role);
      runInAction(() => {
        this.roles.push(response.data);
      });
    } catch (error) {
      throw error.response;
    }
  }
}
export default new RoleNamesData();
