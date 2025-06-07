import {
  Component,
  inject,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryFormService } from '../../../services/query-form/query-form.service';

@Component({
  selector: 'app-board-type-btn-group',
  imports: [CommonModule],
  templateUrl: './board-type-btn-group.component.html',
  styleUrl: './board-type-btn-group.component.scss',
})
export class BoardTypeBtnGroupComponent {
  options = ['bed and breakfast', 'half board', 'full board'];
  queryForm = inject(QueryFormService).getForm();

  outlineTop = 0;
  outlineHeight = 0;

  selectOption(option: string, btn: HTMLButtonElement) {
    this.queryForm.get('boardType')?.setValue(option);
    this.outlineTop = btn.offsetTop - 1;
    this.outlineHeight = btn.offsetHeight + 3;
  }

  @ViewChildren('btn') buttons!: QueryList<ElementRef<HTMLButtonElement>>;

  ngAfterViewInit() {
    setTimeout(() => this.setInitialOutline(), 0);
    // Watch for value changes in case it's set externally
    this.queryForm.valueChanges.subscribe(() => this.setInitialOutline());
  }

  setInitialOutline() {
    const activeIndex = this.options.indexOf(this.queryForm.value.boardType);
    const activeBtn = this.buttons.get(activeIndex);
    if (activeBtn) {
      const el = activeBtn.nativeElement;
      this.outlineTop = el.offsetTop - 2;
      this.outlineHeight = el.offsetHeight + 3;
    }
  }
}
