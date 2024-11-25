import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
  [type]="type"
  [disabled]="disabled"
  (click)="onClick.emit($event)"
  [ngClass]="getButtonClass()"
>
  {{ getButtonText() }}
</button>
  `,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() accountType: 'savings' | 'chequing' = 'savings';
  @Input() baseClass: string = 'btn-primary';

  @Output() onClick = new EventEmitter<Event>();

  getButtonText(): string {
    return this.accountType === 'savings' 
      ? 'Create Savings Account' 
      : 'Create Chequing Account';
  }

  getButtonClass(): string {
    return this.accountType === 'savings' ? 'savings-class' : 'chequing-class';
  }

}
