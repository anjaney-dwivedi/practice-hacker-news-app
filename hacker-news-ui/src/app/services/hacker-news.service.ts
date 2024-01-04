import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @document service
 * @name HackerNewsService
 * @description Service to handle stories
 */

@Injectable({
  providedIn: 'root',
})
export class HackerNewsService {
  //private apiUrl = 'https://hacker-news.firebaseio.com/v0';
  private apiUrl = 'http://localhost:5100/api';

  constructor(private http: HttpClient) {}

  /**
   * @description This method is used to get new stories
   * @memberof HackerNewsService
   */
  getNewStories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/HackerNews/GetNewestStories`);
  }

}
