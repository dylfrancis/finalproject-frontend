import { AxiosService } from "./axiosService";

export class UserService extends AxiosService {
  public constructor() {
    super();
  }

  async login(username: string, password: string) {
    try {
      const response = this.axios.get("/users/login", {
        params: { username, password },
      });
      return response;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async signUp(username: string, password: string) {
    try {
      const response = this.axios.post("/users/signup", {
        username,
        password,
      });
      return response;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export const userService = new UserService();
