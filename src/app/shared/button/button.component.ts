import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      type="submit"
      class="btn"
      (click)="onClick.emit($event)"
      [ngClass]="accountType==='savings' ? ' btn-primary':' btn-secondary'">
      {{ accountType | titlecase }}
    </button>
  `,
  styles: []
})
export class ButtonComponent {
  @Input() accountType: string = 'savings';
  @Output() onClick = new EventEmitter<Event>();

  // Method to get button class
  getButtonClass(): string {
    return this.accountType === 'savings' ? 'savings-class' : 'chequing-class';
  }
}
