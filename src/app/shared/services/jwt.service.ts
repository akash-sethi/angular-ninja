import {Injectable} from '@angular/core';

@Injectable()
export class JwtService {

  private JWT_TOKEN = 'jwtToken';

  getToken(): String {
    return window.localStorage[this.JWT_TOKEN];
  }

  setToken(token: String) {
    window.localStorage[this.JWT_TOKEN] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(this.JWT_TOKEN);
  }
}
