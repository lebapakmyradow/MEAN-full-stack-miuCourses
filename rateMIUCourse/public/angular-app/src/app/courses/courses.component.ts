import { Component, OnInit } from '@angular/core';
import { coursesDataService } from '../courses-data.service';

export class Professor{
  #_id!: string; 
  #_fullname!: string; 
  #_email!: string;
  get _id():string {
    return this.#_id;
  }
  get fullname(): string {
    return this.#_fullname;
  }
  get email(): string {
    return this.#_email;
  }
}

export class Course {
  #_id!: string;
  #title!: string;
  #code!: string;
  #description!: string;
  #rate!: number;
  #professors!: [Professor];
  get _id() { return this.#_id; }
  get title() { return this.#title; }
  set title(title: string) { this.#title = title; } 

  get rate() { return this.#rate; }
  set rate(rate: number){this.#rate = rate ;}

  get code() {return this.#code;}
  set code(code: string){this.#code = code ;}

  get description() {return this.#description;}
  set description(description: string){this.#description = description ;}

  get professors() {return this.#professors;}
  set professors(professors: [Professor]){this.#professors = professors ;}
  constructor (_id:string, title:string, code:string, description: string, rate:number){
    this.#_id = _id;
    this.#title = title;
    this.#code = code;
    this.#description = description;
    this.#rate= rate;
    //this.#professors= professors;
  }

};
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  offset: number = 0;
  #count: number = 5;
  set count(count: string) {
    this.#count = parseInt(count, 10);
  }
  get count(): string { return this.#count + ""; }
  isOffsetZero: boolean = true;
  isCountZero: boolean = false;
  // counts: number[] = [5, 10, 20];
  // state: string = "";
  // states: string[] = [];


  constructor(private courseService: coursesDataService) { }

  ngOnInit(): void {
    this.courseService.getCourses(this.#count, this.offset,).then(response => this.fillMoviesFromService(response));
    //this.courseService.getCourses().then(courses => this.courses = courses)
  }
  private fillMoviesFromService(courses: Course[]) {
    this.courses = courses;
  }

  previous(): void {
    if (this.offset > 0) {
      this.offset = this.offset - this.#count;
    }
    if (this.offset <= 0) {
      this.offset = 0;
      this.isOffsetZero = true;
    }
    this.isCountZero=false;
    this.ngOnInit();
  }

  next(): void {
    
    this.offset = this.offset + this.#count;
    this.isOffsetZero = false;
    if(this.#count<=this.offset){
      this.isCountZero=true;
    }
    this.ngOnInit();
  }

}
