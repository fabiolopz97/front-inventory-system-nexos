import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, CONTENT_TYPE } from 'src/app/global';

const CONTROLLER = 'merchandise/';
const headers = { 'Content-Type': CONTENT_TYPE };

@Injectable({
  providedIn: 'root',
})
export class MerchandiseApiService {
  constructor(private httpClient: HttpClient) {}

  index(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${BASE_URL}${CONTROLLER}`, {
      headers: headers,
    });
  }

  showById(identification: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${BASE_URL}${CONTROLLER}${identification}`, {
      headers: headers,
    });
  }

  searchByNameProduct(nameProduct: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${BASE_URL}${CONTROLLER}get-by-name/?name=${nameProduct}`, {
      headers: headers,
    });
  }

  create(merchandise: any): Observable<any> {
    let params = JSON.stringify(merchandise);
    return this.httpClient.post<any>(
      `${BASE_URL}${CONTROLLER}`,
      params,
      {
        headers: headers,
      }
    );
  }

  update(identification: number, merchandise: any): Observable<any> {
    let params = JSON.stringify(merchandise);
    return this.httpClient.put<any>(
      `${BASE_URL}${CONTROLLER}${identification}`,
      params,
      {
        headers: headers,
      }
    );
  }

  delete(identification: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${BASE_URL}${CONTROLLER}${identification}`,
      {
        headers: headers,
      }
    );
  }
}
