import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MAT_SORT_DEFAULT_OPTIONS, SortDirection } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { vwRegCvretMovimenti } from '../../interfaces/models';
import { MovementsDataService } from '../../services/movements-data.service';
import { CommonDataService } from '../../services/common-data.service';
import { CommonService } from '../../services/common.service';
import { ApiResult, Filterbag, textValue, Totals } from '../../interfaces/shared';
import { MonthlyAdjustmentComponent } from '../monthly-adjustment/monthly-adjustment.component';
import { formatDate } from '@angular/common';
import { ExcelService } from '../../services/shared-service.service';

import { MessageService } from '../messages/message.service';
import { Message } from '../messages/message.model';
import { EventEmitterService } from '../../services/event-emitter.service';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-movements-list',
  templateUrl: './movements-list.component.html',
  styleUrls: ['./movements-list.component.css']
})
export class MovementsListComponent implements OnInit {

  public displayedColumns: string[] = ['idRec', 'dataMov', 'magaGestDesc', 'codArt', 'segnoMov', 'desCausaleMov', 'quantita', 'valoreMov', 'datIns'];
  public gridItems: MatTableDataSource<vwRegCvretMovimenti>;



  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "codArt";
  public defaultSortOrder: string = "asc";

  defaultFilterColumn: string = "codArt";
  filterQuery: string = null;

  public sel: Filterbag;
  public selForExport: Filterbag;
  navigationSubscription;

  public movement_DialogRef: MatDialogRef<MonthlyAdjustmentComponent>;
  
  public regCvRets: textValue[];
  public causaliMov: textValue[];

  public selectedCodCliFatt: string;
  public selectedCodart: string;
  public selectedDataStatoDa: Date;
  public selectedDataStatoA: Date;
  public defaultDataStatoDa: Date;
  public defaultDataStatoA: Date;
  public selectedCausaleMov: string;

  public highlightedRowKey: string;
  public working: boolean;
  public totals: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  filterTextChanged: Subject<string> = new Subject<string>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dataService: MovementsDataService,
    public dialogService: MatDialog,
    public commonDataService: CommonDataService,
    public commonService: CommonService,
    private excelService: ExcelService,
    private messageService: MessageService,
    public eventEmitterService: EventEmitterService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialize();
      }
    });
  }

  initialize() {

    this.selectedCodCliFatt = '';
    this.selectedCodart = '';
    this.defaultDataStatoDa = new Date();
    this.defaultDataStatoA = new Date();
    this.defaultDataStatoDa.setDate(this.defaultDataStatoDa.getDate() - 30);
    this.defaultDataStatoA.setDate(this.defaultDataStatoA.getDate() + 1);
    this.selectedDataStatoDa = this.defaultDataStatoDa;
    this.selectedDataStatoA = this.defaultDataStatoA;
    this.selectedCausaleMov = '';

    this.loadData(null);
  }

  ngOnInit() {

    this.commonDataService
      .get_Dict('Generic', 'Get_D_RegCvret', 'false')
      .subscribe(data => {
        this.regCvRets = data;
        this.regCvRets.unshift({ 'text': 'Tutti', 'value': '' });
      });
    this.commonDataService
      .get_Dict('Generic', 'Get_RegCvretTabCausaliMov', 'false')
      .subscribe(data => {
        this.causaliMov = data;
        this.causaliMov.unshift({ 'text': 'Tutte', 'value': '' });
      });


    this.loadData(null);

  }

  // debounce filter text changes
  // onFilterTextChanged(filterText: string) {
  //   if (this.filterTextChanged.observers.length === 0) {
  //     this.filterTextChanged
  //       .pipe(debounceTime(1000), distinctUntilChanged())
  //       .subscribe(query => {
  //         this.loadData(query);
  //       });
  //   }
  //   this.filterTextChanged.next(filterText);
  // }

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

      codCliFat: this.selectedCodCliFatt,
      codart: this.selectedCodart,
      codCausaleMov: this.selectedCausaleMov,
      dataStatoDa: formatDate(this.selectedDataStatoDa, 'yyyyMMdd', 'it', null),
      dataStatoA: formatDate(this.selectedDataStatoA, 'yyyyMMdd', 'it', null)

    };
    this.dataService.getData<ApiResult<vwRegCvretMovimenti>>(this.sel)
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.gridItems = new MatTableDataSource<vwRegCvretMovimenti>(result.data);
        this.totals = result.totals;
      }, error => console.error(error));
  }

  isNullOrEmpty(s: string): boolean {
    return !s;
  }


  resetFilter() {
    this.initialize();
  }

  openMonthAdj() {

    this.movement_DialogRef = this.dialogService.open(MonthlyAdjustmentComponent, {
      width: '90%',
      minWidth: '1100px',
      data: { opener:"MovementsListComponent", title:"Seleziona rettifiche di compensazione da creare", data: this.selectedCodCliFatt}
    });
    this.movement_DialogRef.afterClosed().subscribe(result => {
      if (result) {
        var adjSel: Filterbag = {};
        adjSel.codCliFat = result.data;
        adjSel.selected = [];
        this.commonService.getSelection().forEach(d => adjSel.selected.push(d.stringifiedData));
        this.commonService.clearSelection();
        this.dataService.setMonthlyAdjustments(adjSel).subscribe(
          res => {
            this.eventEmitterService.onStatusChanged(null);
            this.loadData();
          },
          error => {
            new Error(`Error:${error.message || error} - ${error.statusText} (${error.status})`);
          }
        );
      }
    });
  }

}
