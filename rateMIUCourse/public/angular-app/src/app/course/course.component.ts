import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { coursesDataService } from '../courses-data.service';
import { Course } from '../courses/courses.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  get isLoggedIn(){
    return this.authservice.isLoggedIn;
  }
  courseId!:string;
  course!:Course;
  constructor(private courseService: coursesDataService, private route: ActivatedRoute, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    const courseId: string= this.route.snapshot.params["courseId"];
    this.courseService.getCourse(courseId).then(response => this.fillMovieFromService(response));

    this.courseId = this.route.snapshot.params["courseId"];
    this._updateCourse();

  }

  private fillMovieFromService(course: Course): void {
    this.course= course;
  }

  onDelete(courseId: string) {
    this.courseService.deleteCourse(courseId).then(() => this.router.navigate(["courses"]));
    
  }

  onBack(){
    this.router.navigate(["courses"]);
  }

  onCourseChange(status:number){
    this._onDataChanges(status);
  }
  _onDataChanges(status:number){
    if(status==200){
      this._updateCourse();
    }
  }

  _updateCourse(){
    this.courseService.getCourse(this.courseId).then(
      (result)=>(this.course = result ), 
    );
  }
}
