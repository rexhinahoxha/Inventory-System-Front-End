import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import {RouterModule} from '@angular/router';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { ReportsModule } from './reports/reports.module';


@NgModule({
  declarations: [
    AppComponent,    
    WelcomeComponent
  ],
  imports: [
    BrowserModule,   
    HttpClientModule,
    RouterModule.forRoot(
      [        
        {path:'welcome', component: WelcomeComponent},
        {path:'', redirectTo:'welcome',pathMatch:'full'},
        {path:'**', redirectTo:'welcome', pathMatch:'full'},
        {
          path: 'auth',
          loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule)
        }, 
      ]
    ) ,
    ProductsModule,
    SalesModule,
    ReportsModule
  ],
  providers:[],
  bootstrap: [AppComponent] //starting component for our application
})
export class AppModule { }
