import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HackerNewsService } from '../services/hacker-news.service';
import {
  Subscription,
  debounceTime,
  forkJoin,
  fromEvent,
  map,
  race,
  repeat,
  take,
} from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],
})

/**
 * @class StoryListComponent
 * @description Class used for displaying new stories
 */
export class StoryListComponent implements OnInit {
  public isLoading: boolean = true;
  private stories: { title: string; url: string }[] = [];
  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['title', 'url'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private inputSubscription!: Subscription;
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private hackerNewsService: HackerNewsService) {}

  ngOnInit(): void {
    this.loadNewStory();
  }

  /**
   * @description This method is used to load new stories
   * @memberof StoryListComponent
   */
  private loadNewStory() {
    this.hackerNewsService
      .getNewStories()
      .subscribe((storyData: any) => {
          this.stories = storyData;
          this.dataSource = new MatTableDataSource(this.stories);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
      });
  }

  ngAfterViewInit() {
    this.processSearchInput();
  }

  /**
   * @description This method is used to process the search input, handle debounce and keyup/blur event
   * @memberof StoryListComponent
   */
  private processSearchInput() {
    const searchTermKeyup = fromEvent<any>(
      this.searchInput.nativeElement,
      'keyup'
    ).pipe(
      map((event) => event.target.value),
      debounceTime(500)
    );
    const searchTermBlur = fromEvent<any>(
      this.searchInput.nativeElement,
      'blur'
    ).pipe(
      map((event) => event.target.value),
      debounceTime(0)
    );
    this.inputSubscription = race(searchTermKeyup, searchTermBlur)
      .pipe(take(1), repeat())
      .subscribe((item) => {
        this.onSearch(item);
      });
  }

  /**
   * @description This method is used to filter stories based on search input data
   * @memberof StoryListComponent
   */
  private onSearch(filterValue: string) {
    this.dataSource.filter = filterValue; // Apply the filter
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.inputSubscription.unsubscribe();
  }
}
