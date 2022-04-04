import { JsonPipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PatientsAPIService } from 'src/app/patients-api.service';
import { updatePatient } from './update-patient.model';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class UpdatePatientComponent implements OnInit {
  err!: string;
  updateModal!: NgbModalRef;
  constructor(
    Modalconfig: NgbModalConfig,
    private modalService: NgbModal,
    public service: PatientsAPIService,
    private toastr: ToastrService
  ) {
    Modalconfig.backdrop = 'static';
    Modalconfig.keyboard = false;
  }
  @Input()
  patient!: updatePatient;
  @Output() refreshList = new EventEmitter();
  updateFrom = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    birthdate: new FormControl(),
    gender: new FormControl(),
    fileNo: new FormControl(),
    firstVisitDate: new FormControl(),
    citizenId: new FormControl(),
    natinality: new FormControl(),
    phoneNumber: new FormControl(),
    email: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    street: new FormControl(),
    address1: new FormControl(),
    address2: new FormControl(),
    contactPerson: new FormControl(),
    contactPhone: new FormControl(),
    contactRelation: new FormControl(),
    recordCreationDate: new FormControl(),
  });
  updateFromsubmit() {
    this.service
      .UpdatePatient(this.updateFrom.value as updatePatient)
      .subscribe({
        next: (v) => {},
        error: (e) => {
          this.err = 'Error in :\n';
          console.error(e.error.errors);

          for (let err in e.error.errors) {
            this.err += ' - ' + err + '\n';
          }
          this.toastr.error('', 'Error while Updating', {
            timeOut: 3000,
          });
        },

        complete: () => {
          this.err = '';
          this.updateModal.close();
          this.toastr.success('Updated successfuly');
          this.refreshList.emit();
        },
      });
  }
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let full = year + '-';
    if (month < 10) {
      full += '0' + month + '-';
    } else {
      full += month + '-';
    }
    if (day < 10) {
      full += '0' + day;
    } else {
      full += day;
    }

    return full;
  }
  open(content: any) {
    this.patient.birthdate = this.formatDate(new Date(this.patient.birthdate));
    this.patient.firstVisitDate = this.formatDate(
      new Date(this.patient.firstVisitDate)
    );
    this.updateFrom.setValue(this.patient);

    this.updateModal = this.modalService.open(content, {
      scrollable: true,
      size: 'lg',
    });
    this.updateModal.result.then(
      (result) => {},
      (reason) => {
        this.err = '';
      }
    );
  }

  ngOnInit(): void {}
}
