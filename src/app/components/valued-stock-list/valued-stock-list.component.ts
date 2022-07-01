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
import { Subject, throwError } from 'rxjs';
import { prcRegCvretMGetKitValorizzataReturnModel } from '../../interfaces/models';
import { StockItemDataService } from '../../services/stock-items-data.service';
import { CommonDataService } from '../../services/common-data.service';
import { ApiResult, Filterbag, textValue, Totals } from '../../interfaces/shared';
import { formatDate } from '@angular/common';
import { ExcelService } from '../../services/shared-service.service';

import { MessageService } from '../messages/message.service';
import { Message } from '../messages/message.model';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-valued-stock-list',
  templateUrl: './valued-stock-list.component.html',
  styleUrls: ['./valued-stock-list.component.css']
})
export class ValuedStockListComponent implements OnInit {

  public displayedColumns: string[] = ['dataRiferimento', 'articolo', 'giacenza', 'costoMedio', 'valCostoMedio', 'valore', 'descrizione', 'colore', 'listinoRetail'];
  public gridItems: MatTableDataSource<prcRegCvretMGetKitValorizzataReturnModel>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "articolo";
  public defaultSortOrder: string =  "asc";

  defaultFilterColumn: string = "articolo";
  filterQuery: string = null;

  public sel: Filterbag;
  public selForExport: Filterbag;
  navigationSubscription;


  public regCvRets: textValue[];

  public selectedCodCliFatt: string;
  public selectedCodart: string;
  public selectedDataStatoA: Date;
  public defaultDataStatoA: Date;


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
    this.defaultDataStatoA = new Date();
    this.defaultDataStatoA.setDate(this.defaultDataStatoA.getDate());
    this.selectedDataStatoA = this.defaultDataStatoA;

    this.loadData(null);
  }

  ngOnInit() {

    this.commonDataService
      .get_Dict('Generic', 'Get_D_RegCvret','false')
      .subscribe(data => {
        this.regCvRets = data;
        // this.regCvRets.unshift({ 'text': 'Tutti', 'value': '' });
        this.selectedCodCliFatt = data[0].value;

        this.loadData(null);

      });


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
    dataStatoA: formatDate(this.selectedDataStatoA, 'yyyyMMdd', 'it', null)

    };
    this.dataService.getValorizzata<ApiResult<prcRegCvretMGetKitValorizzataReturnModel>>(this.sel)
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.gridItems = new MatTableDataSource<prcRegCvretMGetKitValorizzataReturnModel>(result.data);
        this.totals = result.totals;
      }, error => console.error(error));
  }

  isNullOrEmpty(s: string): boolean {
    return !s;
  }


  resetFilter() {
    this.initialize();
  }

  exportAsXLSX(): void {
    const confirmed = new Subject<boolean>();

    this.selForExport = {
      pageIndex : 0,
      pageSize : 16384,
      sortColumn:"",
      sortOrder:"asc",
      codCliFat: this.selectedCodCliFatt,
      dataStatoA: formatDate(this.selectedDataStatoA, 'yyyyMMdd', 'it', null)
    };

    const responses: [string, (string) => void][] = [
      [
        'Si',
        () => {
          this.working = true;
          this.dataService.getValorizzataForExport(this.selForExport).subscribe(
            res => {
              this.working = false;
              this.excelService.exportAsExcelFile(
                <any[]>res,
                `Valorizzata_REGCVRetail_al_ ${this.selForExport.dataStatoA}_Cliente_${this.regCvRets.find(d => d.value == this.selForExport.codCliFat).text}`
              );
            },
            error => {
              this.working = false;
              throwError(
                `Error:${error.message || error} - ${error.statusText} (${error.status
                })`
              );
            }
          );

          this.messageService.reportMessage(null);
        }
      ],
      [
        'No',
        () => {
          this.messageService.reportMessage(null);
        }
      ]
    ];
    this.messageService.reportMessage(
      new Message(
        `Confermi il download della valorizzata della selezione corrente?`,
        false,
        responses
      )
    );
  }

}
