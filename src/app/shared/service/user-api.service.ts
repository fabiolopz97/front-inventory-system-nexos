import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, CONTENT_TYPE } from 'src/app/global';

const CONTROLLER = 'users/';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  index(): Observable<any[]> {
    let headers = { 'Content-Type': CONTENT_TYPE };

    return this.httpClient.get<any[]>(`${BASE_URL}${CONTROLLER}`, {
      headers: headers,
    });
  }
}
