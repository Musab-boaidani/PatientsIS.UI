import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PatientsAPIService } from 'src/app/patients-api.service';
import { Patient } from '../patient.model';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class DeletePatientComponent implements OnInit {
  @Input()
  patient!: Patient;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    public service: PatientsAPIService,
    private toastr: ToastrService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  @Output() refreshList = new EventEmitter();

  open(content: any) {
    this.modalService.open(content).result.then(
      (result) => {
        this.service
          .DeletePatient(this.patient.id)

          .subscribe({
            next: (v) => {},
            error: (e) => {
              this.toastr.error('Error while Deleting');
              this.refreshList.emit();
            },

            complete: () => {
              this.toastr.success('Deleted successfuly');
              this.refreshList.emit();
            },
          });
      },
      (reason) => {}
    );
  }

  ngOnInit(): void {}
}
