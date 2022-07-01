import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { SelectionModel } from '@angular/cdk/collections';
import { DataService } from '../../services/data.service';
import { MovementsDataService } from '../../services/movements-data.service';
import { CommonService } from '../../services/common.service';
import { Filterbag, Totals } from '../../interfaces/shared';
import { AuthService } from '../../services/auth.service';
import { ApiResult } from '../../interfaces/shared';
import { vwRegCvretMovimenti } from '../../interfaces/models';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-monthly-adjustment',
  templateUrl: './monthly-adjustment.component.html',
  styleUrls: ['./monthly-adjustment.component.css']
})
export class MonthlyAdjustmentComponent implements OnInit {

  public displayedColumns: string[] = ['selected', 'idRec', 'dataMov', 'magaGestDesc', 'codArt', 'segnoMov', 'desCausaleMov', 'quantita', 'valoreMov', 'datIns'];
  public gridItems: MatTableDataSource<vwRegCvretMovimenti>;
  public totals: any;
  public minDate: Date;
  public maxDate: Date;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 8192;
  public defaultSortColumn: string = "codArt";
  public defaultSortOrder: string = "asc";

  defaultFilterColumn: string = "codArt";
  filterQuery: string = null;

  public sel: Filterbag;

  public canCreateAdjs: boolean;
  public canClose: boolean;

  navigationSubscription;
  //selection = new SelectionModel<any>(true, []);


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(public dialogRef: MatDialogRef<MonthlyAdjustmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject(MovementsDataService) private movementsDataService: MovementsDataService,
    @Inject(DataService) private dataService: DataService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(CommonService) public commonService: CommonService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {

    this.chechAuth();

  }

  initialize() {

    const initialSelection = [];
    const allowMultiSelect = true;
    //this.selection = new SelectionModel<any>(allowMultiSelect, initialSelection);

    this.loadData(null);
    this.canCreateAdjs = (this.data.opener == "MovementsListComponent");
    this.canClose = (this.data.opener == "ClosingsListComponent");

  }

  ngOnInit() {
    this.initialize();
  }

  chechAuth() {
    if (this.authService.isLoggedIn() == false) { this.dialogRef.close(); this.router.navigate(["login"]); }
  }


  loadData(query: string = null) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    if (query) {
      this.filterQuery = query;
    }
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {

    this.sel = {

      codCliFat: (this.data.opener == "MovementsListComponent" ? this.data.data : this.data.fieldValues.codRegCv),

      pageIndex: event.pageIndex,
      pageSize: event.pageSize,

      sortColumn: (this.sort)
        ? this.sort.active
        : this.defaultSortColumn,

      sortOrder: (this.sort)
        ? this.sort.direction
        : this.defaultSortOrder,

      filterColumn: (this.filterQuery)
        ? this.defaultFilterColumn
        : null,

      filterQuery: (this.filterQuery)
        ? this.filterQuery
        : null,



    };
    this.movementsDataService.getMonthlyAdjustments<ApiResult<vwRegCvretMovimenti>>(this.sel)
      .subscribe(result => {
        this.gridItems = new MatTableDataSource<vwRegCvretMovimenti>(result.data);
        this.totals = result.totals;
        if (this.gridItems?.data.length > 0) {
          var vDataMov = new Date(this.gridItems.data[0].dataMov);
          this.minDate = new Date(vDataMov.getFullYear(), vDataMov.getMonth(), 1);
          this.maxDate = vDataMov;
        }
      }, error => console.error(error));
  }

  isNullOrEmpty(s: string): boolean {
    return !s;
  }


  changeSelection(row: vwRegCvretMovimenti) {

    if (row.selected == true) {
      this.commonService.addToSelection(row.idRec.toString(), null, JSON.stringify(row));
    }
    else {
      this.commonService.removeFromSelection(row.idRec.toString(), null);
    }
    this.canCreateAdjs = (this.data.opener == "MovementsListComponent");
  }




}
