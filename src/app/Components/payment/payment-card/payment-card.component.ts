import { Payment } from './../../../Models/payment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cts-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.css']
})
export class PaymentCardComponent implements OnInit {

  constructor() { }
  @Input() public paymentdata: Payment;

  ngOnInit() {
  }

}
