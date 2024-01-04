import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { HackerNewsService } from '../services/hacker-news.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

describe('StoryListComponent', () => {

  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let hackerNewsService:HackerNewsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryListComponent ],
      imports:[HttpClientModule],
      providers:[HackerNewsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    hackerNewsService = TestBed.inject(HackerNewsService);
    component.dataSource = new MatTableDataSource();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    let spy:jasmine.Spy;
    beforeEach(async () => {
      spy = spyOn(hackerNewsService,'getNewStories').and.callThrough();
    });

    it('is loading true...', () => {
      expect(component.isLoading).toBeTrue();
    });

    it('getNewStories should have been called', () =>{
      component.ngOnInit();
      expect(hackerNewsService.getNewStories).toHaveBeenCalled();
    });

  });

  describe('onSearch method', () => {

    it('set filter data to filter', () => {
      component['onSearch']('test');
      expect(component.dataSource.filter).toEqual('test');
    });

  });

});
