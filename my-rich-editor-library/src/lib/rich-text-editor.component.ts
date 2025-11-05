import { Component, forwardRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rich-text-editor',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true,
    },
  ],
  template: `
<div class="rte-container">
  <div class="rte-toolbar">
    <div class="rte-toolbar-group">
      <button type="button" class="rte-btn" (click)="execCommand('bold')" title="הדגשה (Ctrl+B)">
        <strong>B</strong>
      </button>
      <button type="button" class="rte-btn" (click)="execCommand('italic')" title="הטיה (Ctrl+I)">
        <em>I</em>
      </button>
      <button type="button" class="rte-btn" (click)="execCommand('underline')" title="קו תחתון (Ctrl+U)">
        <span style="text-decoration: underline">U</span>
      </button>
    </div>


    <div class="rte-toolbar-separator"></div>

    <div class="rte-toolbar-group">
      <select class="rte-select" (change)="changeFontSize($event)" title="גודל גופן">
        <option value="">גודל</option>
        <option value="1">קטן מאוד</option>
        <option value="2">קטן</option>
        <option value="3">רגיל</option>
        <option value="4">גדול</option>
        <option value="5">גדול מאוד</option>
        <option value="6">ענק</option>
        <option value="7">ענקי</option>
      </select>

      <select class="rte-select" (change)="changeHeading($event)" title="כותרת">
        <option value="">סגנון</option>
        <option value="p">טקסט רגיל</option>
        <option value="h1">כותרת 1</option>
        <option value="h2">כותרת 2</option>
        <option value="h3">כותרת 3</option>
        <option value="h4">כותרת 4</option>
      </select>
    </div>

    <div class="rte-toolbar-separator"></div>

    <div class="rte-toolbar-group">
      <button type="button" class="rte-btn" (click)="execCommand('justifyRight')" title="יישור לימין">
        <span>⇥</span>
      </button>
      <button type="button" class="rte-btn" (click)="execCommand('justifyCenter')" title="יישור למרכז">
        <span>↔</span>
      </button>
      <button type="button" class="rte-btn" (click)="execCommand('justifyLeft')" title="יישור לשמאל">
        <span>⇤</span>
      </button>
    </div>

    <div class="rte-toolbar-separator"></div>

    <div class="rte-toolbar-group">
      <button type="button" class="rte-btn" (click)="execCommand('insertUnorderedList')" title="תבליטים">
        <span>• ≡</span>
      </button>
      <button type="button" class="rte-btn" (click)="execCommand('insertOrderedList')" title="מספור">
        <span>1. ≡</span>
      </button>
    </div>

    <div class="rte-toolbar-separator"></div>

    <div class="rte-toolbar-group">
      <button type="button" class="rte-btn" (click)="execCommand('undo')" title="ביטול (Ctrl+Z)">
        <span>↶</span>
      </button>
      <button type="button" class="rte-btn" (click)="execCommand('redo')" title="חזרה (Ctrl+Y)">
        <span>↷</span>
      </button>
    </div>
  </div>

  <div 
    #editor
    class="rte-editor"
    contenteditable="true"
    (input)="onContentChange()"
    (blur)="onTouched()"
    dir="rtl"
  ></div>
</div>
  `,
  styles: [
    `
.rte-container {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}


.rte-toolbar {
  display: flex;
  align-items: center;
  padding: 8px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  gap: 4px;
  flex-wrap: wrap;
}

.rte-toolbar-group {
  display: flex;
  gap: 2px;
}

.rte-toolbar-separator {
  width: 1px;
  height: 24px;
  background: #d1d5db;
  margin: 0 4px;
}

.rte-btn {
  min-width: 32px;
  height: 32px;
  padding: 4px 8px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.rte-btn:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

.rte-btn:active {
  background: #d1d5db;
}

.rte-select {
  height: 32px;
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 3px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.15s;
}

.rte-select:hover {
  border-color: #9ca3af;
}

.rte-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.rte-editor {
  min-height: 200px;
  padding: 16px;
  outline: none;
  font-size: 14px;
  line-height: 1.6;
  direction: rtl;
  text-align: right;
}

.rte-editor:focus {
  outline: none;
}

/* סגנונות לתוכן הטקסט */
.rte-editor h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 0.67em 0;
}

.rte-editor h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.75em 0;
}

.rte-editor h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin: 0.83em 0;
}

.rte-editor h4 {
  font-size: 1em;
  font-weight: bold;
  margin: 1em 0;
}

.rte-editor ul, .rte-editor ol {
  padding-right: 40px;
  margin: 1em 0;
}

.rte-editor p {
  margin: 0.5em 0;
}
    `,
  ],
})
export class RichTextEditorComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('editor') editorElement!: ElementRef<HTMLDivElement>;

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  ngAfterViewInit() {
    // התאמה ראשונית אם צריך — השארנו ריק בכוונה
  }

  execCommand(command: string, value: string | null = null) {
    // document.execCommand עדיין נתמך ברוב הדפדפנים לצורכי עריכה פשוטה
    document.execCommand(command, false, value || undefined);
    this.editorElement.nativeElement.focus();
    this.onContentChange();
  }

  changeFontSize(event: Event) {
    const select = event.target as HTMLSelectElement;
    if (select.value) {
      this.execCommand('fontSize', select.value);
      select.value = '';
    }
  }

  changeHeading(event: Event) {
    const select = event.target as HTMLSelectElement;
    if (select.value) {
      this.execCommand('formatBlock', select.value);
      select.value = '';
    }
  }

  onContentChange() {
    const content = this.editorElement.nativeElement.innerHTML;
    this.onChange(content);
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    if (this.editorElement) {
      this.editorElement.nativeElement.innerHTML = value || '';
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.editorElement) {
      // contentEditable expects string "true"/"false" when set as attribute
      this.editorElement.nativeElement.contentEditable = (!isDisabled).toString();
    }
  }
}
