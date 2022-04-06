import { Component, OnInit } from '@angular/core';
import { Patient } from './patient.model';
import { PatientsAPIService } from '../patients-api.service';
import { from, Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  isCollapsed = true;
  NameSQ: any;
  FileNoSQ: any;
  PhoneSQ: any;
  page: number = 1;
  pageSize: number = 5;
  patients!: Patient[] | null;
  pager: any = null;

  constructor(public service: PatientsAPIService) {}
  collaps() {
    this.isCollapsed = !this.isCollapsed;
    this.NameSQ = null;
    this.FileNoSQ = null;
    this.PhoneSQ = null;
    this.page = 1;
    this.refreshList();
  }
  search() {
    this.page = 1;
    this.refreshList();
  }
  clearSearch() {
    this.NameSQ = null;
    this.FileNoSQ = null;
    this.PhoneSQ = null;
    this.page = 1;
    this.refreshList();
  }
  refreshList() {
    this.service
      .GetPatientsList(
        this.NameSQ,
        this.FileNoSQ,
        this.PhoneSQ,
        this.page,
        this.pageSize
      )
      ?.subscribe((res) => {
        this.patients = res.body;
        this.pager = JSON.parse(res.headers.get('X-Pager') as string);
      });
  }
  changePage(pageNo: number) {
    this.page = pageNo;
    this.refreshList();
  }
  counter(start: number, end: number) {
    let i = end - (start - 1);
    let numbers = new Array(i);
    for (i = 0; start <= end; i++) {
      numbers[i] = start;
      start++;
    }
    return numbers;
  }

  ngOnInit(): void {
    this.refreshList();
  }
}
