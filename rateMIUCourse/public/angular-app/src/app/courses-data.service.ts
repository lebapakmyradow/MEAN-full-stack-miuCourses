import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

import { Course } from './courses/courses.component';

@Injectable({
  providedIn: 'root'
})
export class coursesDataService {
  private apiBaseUrl: string= "http://localhost:3000/api"

  constructor(private http:HttpClient, private _authService: AuthService) { }

  public getCourses(count: number, offset: number): Promise<Course[]> {
    const url: string= this.apiBaseUrl + "/courses?count="+count+"&offset="+offset;
    
    return this.http.get(url).toPromise()
                .catch(this.handleError);
  }

  public getCourse(courseId: string): Promise<Course> {
    const url: string= this.apiBaseUrl + "/courses/" + courseId;
    
    return this.http.get(url).toPromise()
                .catch(this.handleError);
  }
//searches course
public searchCourses(title: string): Promise<Course[]> {
  console.log("Search Service");
  
  const url: string = this.apiBaseUrl + "/courses?search=" + title;
  console.log(url);

  return this.http.get(url).toPromise()
    .catch(this.handleError);
}

  public deleteCourse(courseId: string): Promise<Course> {
    const url: string = this.apiBaseUrl + "/courses/" + courseId;

    return this.http.delete(url, this._authService.geTokenHeader()).toPromise()
      .catch(this.handleError);
  }
  
  addOneCourse(course:Course):Observable<string>{
    const url= this.apiBaseUrl+"/courses";    
    return this.http.post<string>(url, course, this._authService.geTokenHeader()); 
  }
  editOneCourse(courseId:string, course:Course):Observable<string>{
    const url= this.apiBaseUrl+"/courses/"+courseId;
    console.log("editOneCourse", url, courseId, course);
    return this.http.patch<string>(url, course); 
  }
  

  private handleError(error: any):Promise<any> {
    return Promise.reject(error.message || error);
  }
}
