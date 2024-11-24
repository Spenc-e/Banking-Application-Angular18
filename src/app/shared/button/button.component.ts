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
  @Input() accountType: string = '';
  @Output() onClick = new EventEmitter<Event>();

  getButtonClass(): string {
    return this.accountType === 'savings' ? 'savings-class' : 'chequing-class';
  }
}
