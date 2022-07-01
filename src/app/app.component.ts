import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { copyRight } from './interfaces/shared';
import { AuthService } from './services/auth.service';
import { Criticals } from './interfaces/shared';
import { DataService } from './services/data.service';
import { Router, NavigationEnd } from '@angular/router';
import { EventEmitterService } from './services/event-emitter.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //public criticals: Observable<Criticals>;
  public criticals: Criticals;
  navigationSubscription;
  public cd: any;

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  // .pipe(
  //   map(result => result.matches)
  // );

  constructor(
    // private breakpointObserver: BreakpointObserver,
    private router: Router,
    public dataService: DataService,
    public auth: AuthService,
    public eventEmitterService: EventEmitterService,
  ) {

    this.updateCriticals(null);
    interval(60000).subscribe((val) => { this.updateCriticals(null); });
    
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialize();
      }
    });
  }

  initialize() {

  }

  updateCriticals(eventData: string) {

    this.dataService
      .GetCriticals()
      .subscribe(data => {
        this.criticals = data as Criticals;
      });
    console.log('eseguito updateCriticals su app.component!');

  }

  ngOnInit() {

    // this.cd = this.appConfigService.getConfigData();
    this.dataService.GetCompanyUIData().subscribe(data => { this.cd = data; });

    if (this.eventEmitterService.subsVar === undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeCriticalsUpdate.subscribe((eventData: string) => {
          this.updateCriticals(eventData);
        });
    }


  }

  login() {
  }


  logout() {
    if (this.auth.logout()) {
    }
  }

 
}
