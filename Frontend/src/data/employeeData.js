import { observable, action, makeObservable, runInAction } from "mobx";
import axios from "axios";

class EmployeeData {
  employees = [];
  baseUrl = "https://localhost:7177/api/Employee";

  constructor() {
    makeObservable(this, {
      employees: observable,
      getEmployees: action,
      addEmployee: action,
      updateEmployee: action,
      deleteEmployee: action,
    });
    this.setAuthorized();
  }

  setAuthorized() {
    const token = localStorage.getItem("security_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  async getEmployees() {
    try {
      const response = await axios.get(this.baseUrl);
      runInAction(() => {
        this.employees = response.data;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addEmployee(employee) {
    this.setAuthorized();
    try {
      const response = await axios.post(this.baseUrl, employee);
      runInAction(() => {
        this.employees.push(response.data);
      });
    } catch (error) {
      throw error.response;
    }
  }

  async updateEmployee(id, employee) {
    this.setAuthorized();
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, employee);
      runInAction(() => {
        const index = this.employees.findIndex((e) => e.id === id);
        if (index !== -1) {
          this.employees[index] = response.data;
        }
      });
    } catch (error) {
      throw error.response;
    }
  }

  async deleteEmployee(employee) {
    this.setAuthorized();
    try {
      employee.isActive = false;
      await this.updateEmployee(employee.id, employee);
    } catch (error) {
      employee.isActive = true;
      throw error;
    }
  }
}

export default new EmployeeData();
