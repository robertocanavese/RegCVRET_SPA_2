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
import { vwRegCvretChiusure } from '../../interfaces/models';
import { ClosingsDataService } from '../../services/closings-data.service';
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
  templateUrl: './closings-list.component.html',
  styleUrls: ['./closings-list.component.css']
})
export class ClosingsListComponent implements OnInit {

  public displayedColumns: string[] = ['cvName', 'anno', 'mese', 'okDdt', 'okValorizzata', 'dt_DataChiusuraValorizzata', 'dt_DataChiusuraGiacenza', 'opeDesc', 'datvar','close'];
  public gridItems: MatTableDataSource<vwRegCvretChiusure>;



  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "";
  public defaultSortOrder: string = "asc";

  defaultFilterColumn: string = "";
  filterQuery: string = null;

  public sel: Filterbag;
  public selForExport: Filterbag;
  navigationSubscription;

  public movement_DialogRef: MatDialogRef<MonthlyAdjustmentComponent>;

  public regCvRets: textValue[];

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
    public dataService: ClosingsDataService,
    public movementsDataService: MovementsDataService,
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

    this.loadData(null);

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
    this.dataService.getData<ApiResult<vwRegCvretChiusure>>(this.sel)
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.gridItems = new MatTableDataSource<vwRegCvretChiusure>(result.data);
        this.totals = result.totals;
      }, error => console.error(error));
  }

  isNullOrEmpty(s: string): boolean {
    return !s;
  }


  resetFilter() {
    this.initialize();
  }

  openMonthAdj(row) {

    this.movement_DialogRef = this.dialogService.open(MonthlyAdjustmentComponent, {
      width: '90%',
      minWidth: '1100px',
      data: { opener:"ClosingsListComponent", title:"Rettifiche di compensazione non eseguite", fieldValues: row}
    });
    this.movement_DialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doClosing(result)
      }
    });
  }

  doClosing(row) {
    if (
      confirm(
        'Confermi la chiusura del mese ' + row.fieldValues.mese + ' ' + row.fieldValues.anno + '?'
      )
    ) {
      this.working = true;
      this.dataService.doClosing(row.fieldValues).subscribe(
        res => {
          this.eventEmitterService.onStatusChanged(null);
          this.loadData();
          window.alert('La chiusura è stata registrata con successo.');
          this.working = false;
        },
        error => {
          throwError(
            `Error:${error.message || error} - ${error.statusText} (${error.status
            })`
          );
          this.working = false;
        }
      );
    } else {
      alert('Operazione annullata');
    }
  }


}
