import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from './patients/patient.model';
import { addPatient } from './patients/add-patient/add-patient.model';
import { updatePatient } from './patients/update-patient/update-patient.model';
import { catchError, lastValueFrom, map, Observable, tap } from 'rxjs';
import { Pager } from './Pager.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsAPIService {
  url = 'https://localhost:5001/api/Patient';
  headerProperty: any;

  constructor(private http: HttpClient) {}

  GetPatient() {
    this.http.get;
  }
  GetPatientsList(
    Name: any = null,
    FileNo: any = null,
    PhoneNumber: any = null,
    Page = 1,
    PageSize = 5
  ) {
    let geturl = this.url + '?';
    if (Name != null) {
      geturl += '&Name=' + Name;
    }
    if (FileNo != null) {
      geturl += '&FileNo=' + FileNo;
    }
    if (PhoneNumber != null) {
      geturl += '&PhoneNumber=' + PhoneNumber;
    }

    geturl += '&Page=' + Page;

    geturl += '&PageSize=' + PageSize;

    return this.http.get<Patient[]>(geturl, { observe: 'response' });
  }

  AddPatient(p: addPatient) {
    return this.http.post(this.url, p);
  }
  UpdatePatient(p: updatePatient) {
    return this.http.put(this.url, p);
  }
  DeletePatient(id: string) {
    let deleteurl = this.url + '/' + id;

    return this.http.delete(deleteurl);
  }
}
