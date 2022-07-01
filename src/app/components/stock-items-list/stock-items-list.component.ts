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
import { debounceTime, distinctUntilChanged, } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { vwRegCvretGiacenza } from '../../interfaces/models';
import { StockItemDataService } from '../../services/stock-items-data.service';
import { CommonDataService } from '../../services/common-data.service';
import { ApiResult, Filterbag, textValue, Totals } from '../../interfaces/shared';
import { formatDate } from '@angular/common';
import { ExcelService } from '../../services/shared-service.service';

import { MessageService } from '../messages/message.service';
import { Message } from '../messages/message.model';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-stock-items-list',
  templateUrl: './stock-items-list.component.html',
  styleUrls: ['./stock-items-list.component.css']
})
export class StockItemsListComponent implements OnInit {

  public displayedColumns: string[] = ['magaGestDesc', 'codArt', 'qtaGiac', 'valGiac', 'dataIns', 'dataUpd'];
  public gridItems: MatTableDataSource<vwRegCvretGiacenza>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "codArt";
  public defaultSortOrder: string =  "asc";

  defaultFilterColumn: string = "codArt";
  filterQuery: string = null;

  public sel: Filterbag;
  public selForExport: Filterbag;
  navigationSubscription;


  public regCvRets: textValue[];
  public selectedCodCliFatt: string;
  public selectedCodart: string;
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
    public dataService: StockItemDataService,
    public commonDataService: CommonDataService,
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

    this.loadData(null);
  }

  ngOnInit() {

    this.commonDataService
      .get_Dict('Generic', 'Get_D_RegCvret','false')
      .subscribe(data => {
        this.regCvRets = data;
        this.regCvRets.unshift({ 'text': 'Tutti', 'value': '' });
      });

    this.loadData(null);

  }

  // debounce filter text changes
  onFilterTextChanged(filterText: string) {
    if (this.filterTextChanged.observers.length === 0) {
      this.filterTextChanged
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(query => {
          this.loadData(query);
        });
    }
    this.filterTextChanged.next(filterText);
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
    pageIndex : event.pageIndex,
    pageSize : event.pageSize,

    sortColumn : (this.sort)
      ? this.sort.active
      : this.defaultSortColumn,

    sortOrder : (this.sort)
      ? this.sort.direction
      : this.defaultSortOrder,

    filterColumn : (this.filterQuery)
      ? this.defaultFilterColumn
      : null,

    filterQuery : (this.filterQuery)
      ? this.filterQuery
      : null,

    codCliFat : this.selectedCodCliFatt,
    codart : this.selectedCodart,

    };
    this.dataService.getData<ApiResult<vwRegCvretGiacenza>>(this.sel)
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.gridItems = new MatTableDataSource<vwRegCvretGiacenza>(result.data);
        this.totals = result.totals;
      }, error => console.error(error));
  }

  isNullOrEmpty(s: string): boolean {
    return !s;
  }


  resetFilter() {
    this.initialize();
  }


}
