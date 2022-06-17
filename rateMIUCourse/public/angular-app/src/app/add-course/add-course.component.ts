import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.dev';
import { coursesDataService } from '../courses-data.service';
import { Course, Professor } from '../courses/courses.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  @ViewChild("courseForm")
  courseForm!:NgForm;
  course!:Course;

  constructor(private service:coursesDataService) { }
  
  ngOnInit(): void {
    setTimeout(()=>{
      // this.setDefaultForm();
    }, 0)
  }

  setDefaultForm(){
    this.course = new Course("", "", "", "", 0);
    this.courseForm.setValue(this.course);
  }
  onSubmit(){
    console.log("onSubmit called");
    if(!this.courseForm.value.title || !this.courseForm.value.code){
      this.displayMessage(environment.MSG_REC_EMP, true);
      return;
    }
    this.service.addOneCourse(this.courseForm.value).subscribe({
      next:(result)=>{
        this.setDefaultForm();      
      }, 
      error:(err)=>{
        console.log("Find an error", err);
        alert("Error Found\n"+err);
        this.displayMessage(err.message, true);
      },
      complete:()=>{
        this.displayMessage(environment.MSG_REC_ADD, false);
        console.log("Get All Course Completed");
      }
    });
  }

  notificationMessage!:string;
  isError:boolean = false;
  isSuccess:boolean = false;
  displayMessage(message:string, isErrMsg:boolean){
    this.notificationMessage = message;
    if(isErrMsg){
      this.isError = true;
      this.isSuccess = false;
    } else{
      this.isError = false;
      this.isSuccess = true;
    }
  }

}
