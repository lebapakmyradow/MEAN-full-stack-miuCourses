import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  get isLoggedIn(){
    return this.authservice.isLoggedIn;
  }
  constructor(private router:Router, private authservice:AuthService) { }
  ngOnInit(): void {
  }

}
