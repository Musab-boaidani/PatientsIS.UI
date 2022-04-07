import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './patients/details/details.component';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { DeletePatientComponent } from './patients/delete-patient/delete-patient.component';
import { UpdatePatientComponent } from './patients/update-patient/update-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsAPIService } from './patients-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    DetailsComponent,
    AddPatientComponent,
    DeletePatientComponent,
    UpdatePatientComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [PatientsAPIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
