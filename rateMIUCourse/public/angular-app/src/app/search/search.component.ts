import { Component, OnInit } from '@angular/core';
import { coursesDataService } from '../courses-data.service';
import { Course } from '../courses/courses.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title: string= "";
  courses: Course[]= [];

  constructor(private courseService: coursesDataService) { }

  ngOnInit(): void {
  }

  search(): void {
    this.courseService.searchCourses(this.title).then(response => this.fillMoviesFromService(response));
    // location.reload();
  }

  private fillMoviesFromService(courses: Course[]) {
    this.courses= courses;
    // location.reload();
  }

}
