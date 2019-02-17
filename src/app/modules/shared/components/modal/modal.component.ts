import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from './modal.service';
import {SlideInOutAnimation} from '../../../../animations/slideDown.animation';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [ SlideInOutAnimation ]
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() raised = true;
  private element: any;

  modalState = 'in';

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    const modal = this;

    // ensure id attribute exists
    if (!this.id) {
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    const that = this;
    this.element.addEventListener('click', function (e: any) {
      console.log(that);
      // if (e.target.path().join().indexOf(that.id) === -1) {
      //   modal.close();
      // }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('app-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('app-modal-open');
  }
}
