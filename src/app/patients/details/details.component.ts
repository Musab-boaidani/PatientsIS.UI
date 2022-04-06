import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deltails',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [NgbActiveModal, NgbModal],
})
export class DetailsComponent implements OnInit {
  @Input() patient: any;
  @Input()
  highLightValue!: string;
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}
  open(content: any) {
    this.modalService.open(content, { scrollable: true, size: 'lg' });
  }
  ngOnInit(): void {}
}
