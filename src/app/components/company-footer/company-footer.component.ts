import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-company-footer',
  templateUrl: './company-footer.component.html',
  styleUrls: ['./company-footer.component.css']
})
export class CompanyFooterComponent implements OnInit {

  public cd: any;

  constructor(
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.GetCompanyUIData().subscribe(data => { this.cd = data; });

  }

}
