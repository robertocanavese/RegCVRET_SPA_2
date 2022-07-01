import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {

    var ticketGUID = this.activatedRoute.snapshot.params["tck"];

    this.authService.land(ticketGUID)
      .subscribe(res => {
        // login successful
        this.router.navigate(["stock-items-list"]);
      },
        err => {
          // login failed
          alert("Autenticazione automatica fallita!")
          this.router.navigate(["login"]);
        });
  }

}
