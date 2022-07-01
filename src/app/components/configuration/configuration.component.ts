import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { configModel } from '../../interfaces/shared';



@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  form: FormGroup;
  editMode: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject(DataService) private dataService: DataService,
    @Inject(AuthService) private authService: AuthService
  ) {

    //this.navigationSubscription = this.router.events.subscribe((e: any) => {
    //  if (e instanceof NavigationEnd) {
    //    this.initialize();
    //  }
    //});

    this.chechAuth();
    //this.title = 'Configurazione'
    this.editMode = true;
    this.createForm();

    this.dataService.Get_RegCvretConfigs()
      .subscribe(res => {
        this.updateForm(<configModel>res);
      }, error => {
        alert(error.error.message);
      });

  }


  ngOnInit() {
  }

  chechAuth() {
    if (this.authService.isLoggedIn() == false) { this.router.navigate(["login"]); }
  }


  createForm() {

    this.form = this.fb.group({

      MinGOrdTrm: ['', Validators.required],
      MinGOrdTrmDescription: [''],
      FreeStock: ['', Validators.required],
      FreeStockDescription: [''],
      MaxCOrdPrt: ['', Validators.required],
      MaxCOrdPrtDescription: [''],
      MaxEOrdPrt: ['', Validators.required],
      MaxEOrdPrtDescription: [''],
    });
    this.form.get('MinGOrdTrmDescription').disable();
    this.form.get('FreeStockDescription').disable();
    this.form.get('MaxCOrdPrtDescription').disable();
    this.form.get('MaxEOrdPrtDescription').disable();
  }

  onSubmit() {

    var tempConfig = <configModel>{};

    tempConfig.MinGOrdTrm = this.form.value.MinGOrdTrm;
    tempConfig.FreeStock = this.form.value.FreeStock;
    tempConfig.MaxCOrdPrt = this.form.value.MaxCOrdPrt;
    tempConfig.MaxEOrdPrt = this.form.value.MaxEOrdPrt;

    this.dataService.Set_RegCvretConfig(tempConfig)
      .subscribe(res => {
        this.updateForm(<configModel>res);
        window.alert("La configurazione è stata salvata.");
      }, error => {
        alert(error.error.message);
      });

  }

  updateForm(configData: configModel) {

    this.form.setValue({

      MinGOrdTrm: configData.MinGOrdTrm,
      MinGOrdTrmDescription: configData.MinGOrdTrmDescription,
      FreeStock: configData.FreeStock,
      FreeStockDescription: configData.FreeStockDescription,
      MaxCOrdPrt: configData.MaxCOrdPrt,
      MaxCOrdPrtDescription: configData.MaxCOrdPrtDescription,
      MaxEOrdPrt: configData.MaxEOrdPrt,
      MaxEOrdPrtDescription: configData.MaxEOrdPrtDescription,

    });

  }

  onBack() {
    this.form.reset();
  }

  // retrieve a FormControl
  getFormControl(name: string) {
    return this.form.get(name);
  }

  // returns TRUE if the FormControl is valid
  isValid(name: string) {
    var e = this.getFormControl(name);
    return e && e.valid;
  }

  // returns TRUE if the FormControl has been changed
  isChanged(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }

  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }


}
