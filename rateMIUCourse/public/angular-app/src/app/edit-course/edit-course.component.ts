import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { coursesDataService } from '../courses-data.service';
import { Course } from '../courses/courses.component';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  get isLoggedIn(){
    return this.authservice.isLoggedIn;
  }

  @Input()
  courseId!:string;
  @Input()
  course!:Course;

  @ViewChild("editCourseForm")
  editCourseForm!:NgForm;

  @Output()
  editCourseEmitter: EventEmitter<number> = new EventEmitter<number>();

  isFormVisible = false;

  constructor(private courseService: coursesDataService, private authservice: AuthService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      // this.setDefaultForm();
    }, 0)
  }
  setDefaultForm(){
    console.log("setDefaultForm", this.course, this.editCourseForm);
    this.editCourseForm.setValue(this.course);
  }

  onEditClick(){
    this.isFormVisible = true;
  }

  onCancel(){
    this.isFormVisible = false;
  }

 
  onUpdateClick(){
    console.log("onEdit called", this.editCourseForm.value);
    this.courseService.editOneCourse(this.courseId, this.editCourseForm.value).subscribe({
      next:(result)=>{
      }, 
      error:(err)=>{
        console.log("Find an error", err);
        this.editCourseEmitter.emit(500);
      },
      complete:()=>{
        this.editCourseEmitter.emit(200);
        console.log("Get All Course Completed");
        this.isFormVisible = false;
      }
    });
  }


}
