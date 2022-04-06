import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PatientsAPIService } from 'src/app/patients-api.service';
import { addPatient } from './add-patient.model';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AddPatientComponent implements OnInit {
  addModal!: NgbModalRef;

  constructor(
    Modalconfig: NgbModalConfig,
    private modalService: NgbModal,
    public service: PatientsAPIService,
    private toastr: ToastrService
  ) {
    Modalconfig.backdrop = 'static';
    Modalconfig.keyboard = false;
  }
  err!: string;
  @Output() refreshList = new EventEmitter();

  addFrom = new FormGroup({
    name: new FormControl(),
    birthdate: new FormControl(this.formatDate(new Date()), {
      initialValueIsDefault: true,
    }),
    gender: new FormControl(0, { initialValueIsDefault: true }),
    fileNo: new FormControl(0, { initialValueIsDefault: true }),
    firstVisitDate: new FormControl(this.formatDate(new Date()), {
      initialValueIsDefault: true,
    }),
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
  });
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
  addFromsubmit() {
    console.log(this.addFrom.value as addPatient);
    this.service.AddPatient(this.addFrom.value as addPatient).subscribe({
      next: (v) => {},
      error: (e) => {
        this.err = 'Error in :\n';
        console.error(e.error.errors);

        for (let err in e.error.errors) {
          this.err += ' - ' + err + '\n';
        }
        this.toastr.error('', 'Error while creating', {
          timeOut: 3000,
        });
      },

      complete: () => {
        this.toastr.success('Created successfuly');
        this.err = '';
        this.addModal.close();
        this.refreshList.emit();
        this.addFrom.reset();
      },
    });
  }
  open(content: any) {
    this.addModal = this.modalService.open(content, {
      scrollable: true,
      size: 'lg',
    });
  }
  clearForm() {
    this.err = '';
    this.addFrom.reset();
  }
  ngOnInit(): void {}
}
