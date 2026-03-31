import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-editable-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative group/edit">
      <!-- Content slot -->
      <ng-content />

      <!-- Edit button — only visible to admin -->
      @if (auth.isAdmin()) {
        <button
          (click)="edit.emit()"
          type="button"
          class="absolute z-40 flex items-center gap-2
                 px-3 py-2 rounded-xl
                 bg-[#0e1221]/90 backdrop-blur-md
                 border border-[rgba(91,141,239,0.15)]
                 text-[#5b8def] text-[0.75rem] font-medium
                 opacity-0 group-hover/edit:opacity-100
                 -translate-y-1 group-hover/edit:translate-y-0
                 hover:bg-[rgba(91,141,239,0.12)]
                 hover:border-[rgba(91,141,239,0.3)]
                 hover:text-[#7ba8ff]
                 transition-all duration-300 cursor-pointer
                 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          [ngClass]="{
            'top-4 right-4': position === 'top-right',
            'top-4 left-4': position === 'top-left',
            'bottom-4 right-4': position === 'bottom-right'
          }"
        >
          <i class="pi pi-pencil text-xs"></i>
          {{ label }}
        </button>
      }
    </div>
  `,
})
export class EditableSectionComponent {
  @Input() label = 'Edit';
  @Input() position: 'top-right' | 'top-left' | 'bottom-right' = 'top-right';
  @Output() edit = new EventEmitter<void>();

  constructor(public auth: AuthService) {}
}
