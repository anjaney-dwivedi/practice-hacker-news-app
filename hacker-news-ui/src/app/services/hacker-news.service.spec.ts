import { TestBed } from '@angular/core/testing';

import { HackerNewsService } from './hacker-news.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('HackerNewsService', () => {

  let service: HackerNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(HackerNewsService);
    //let http = new HttpClient();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getNewStories method', () => {
    spyOn(service['http'], 'get');
    service.getNewStories();
    expect(service['http'].get).toHaveBeenCalledWith(
      'http://localhost:5100/api/HackerNews/GetNewestStories'
    );
  });

});
