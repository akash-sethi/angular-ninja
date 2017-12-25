import {Injectable} from '@angular/core';
import {JwtService} from './jwt.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private jwtService: JwtService,
              private http: HttpClient) {
  }

  private setHeader(): HttpHeaders {
    const config = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    };
    if (this.jwtService.getToken()) {
      config['Authorization'] = this.jwtService.getToken();
    }
    return new HttpHeaders(config);
  }

  post(path: String, body: Object = {}): Observable<any> {
    return this.http.post(environment.api_base_url + path, body, {headers: this.setHeader()})
      .map(res => res)
      .catch(this.parseError);
  }

  private parseError(error: any) {
    return Observable.throw(error);
  }
}
