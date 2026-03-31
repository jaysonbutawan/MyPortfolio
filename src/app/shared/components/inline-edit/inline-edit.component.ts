import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inline-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inline-edit.component.html',
})
export class InlineEditComponent {
  @Input({ required: true }) value = '';
  @Input() type: 'text' | 'textarea' = 'text';
  @Input() isAdmin = false;
  @Input() displayClass = '';

  @Output() saved = new EventEmitter<string>();

  @ViewChild('inputEl') inputEl?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  isEditing = signal(false);
  editValue : String ='';

  startEdit(event: Event): void {
    event.stopPropagation();
    this.editValue = this.value || '';
    this.isEditing.set(true);
    setTimeout(() => this.inputEl?.nativeElement.focus(), 0);
  }

  save(): void {
    const trimmed = (this.editValue ?? '').trim();
    if (trimmed) {
      this.saved.emit(trimmed);
    }
    this.isEditing.set(false);
  }

  cancel(): void {
    this.isEditing.set(false);
  }
}
