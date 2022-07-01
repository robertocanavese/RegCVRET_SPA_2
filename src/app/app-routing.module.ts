import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { StockItemsListComponent } from './components/stock-items-list/stock-items-list.component';
import { MovementsListComponent } from './components/movements-list/movements-list.component';
import { ClosingsListComponent } from './components/closings-list/closings-list.component';
import { ValuedStockListComponent } from './components/valued-stock-list/valued-stock-list.component';


const routes: Routes = [
  { path: '', component: StockItemsListComponent , pathMatch: 'full' },
  { path: 'stock-items-list', component: StockItemsListComponent, runGuardsAndResolvers: 'always' },
  { path: 'movements-list', component: MovementsListComponent, runGuardsAndResolvers: 'always' },
  { path: 'closing-list', component: ClosingsListComponent, runGuardsAndResolvers: 'always' },
  { path: 'valued-stock-list', component: ValuedStockListComponent, runGuardsAndResolvers: 'always' },
  { path: 'configuration', component: ConfigurationComponent, runGuardsAndResolvers: 'always' },
  { path: 'login', component: LoginComponent },
  { path: 'jump/:tck', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
