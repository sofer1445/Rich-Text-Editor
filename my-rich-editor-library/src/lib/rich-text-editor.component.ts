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
      <button 
        type="button" 
        class="rte-btn" 
        [class.active]="activeFormats.bold"
        (click)="execCommand('bold')" 
        title="מודגש (Ctrl+B)">
        <strong>𝐁</strong>
      </button>
      <button 
        type="button" 
        class="rte-btn" 
        [class.active]="activeFormats.italic"
        (click)="execCommand('italic')" 
        title="נטוי (Ctrl+I)">
        <em style="font-family: serif;">𝐼</em>
      </button>
      <button 
        type="button" 
        class="rte-btn" 
        [class.active]="activeFormats.underline"
        (click)="execCommand('underline')" 
        title="קו תחתון (Ctrl+U)">
        <span style="text-decoration: underline; font-weight: 600;">U</span>
      </button>
    </div>

    <div class="rte-toolbar-separator"></div>

    <div class="rte-toolbar-group">
      <select 
        class="rte-select" 
        [value]="currentFontSize"
        (change)="changeFontSize($event)" 
        title="גודל גופן">
        <option value="">גודל גופן</option>
        <option value="1">קטן מאוד (8pt)</option>
        <option value="2">קטן (10pt)</option>
        <option value="3">רגיל (12pt)</option>
        <option value="4">גדול (14pt)</option>
        <option value="5">גדול מאוד (18pt)</option>
        <option value="6">ענק (24pt)</option>
        <option value="7">ענקי (36pt)</option>
      </select>

      <select 
        class="rte-select" 
        [value]="currentHeading"
        (change)="changeHeading($event)" 
        title="סגנון פסקה">
        <option value="">סגנון</option>
        <option value="p">רגיל</option>
        <option value="h1">כותרת 1</option>
        <option value="h2">כותרת 2</option>
        <option value="h3">כותרת 3</option>
        <option value="h4">כותרת 4</option>
      </select>
    </div>

    <div class="rte-toolbar-separator"></div>

    <div class="rte-toolbar-group">
      <button type="button" class="rte-btn" (click)="execCommand('justifyRight')" title="יישור לימין">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 2h16v2H0V2zm0 4h16v2H0V6zm4 4h12v2H4v-2zm0 4h12v2H4v-2z"/>
        </svg>
      </button>
      <button type="button" class="rte-btn" (click)="execCommand('justifyCenter')" title="יישור למרכז">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 2h16v2H0V2zm2 4h12v2H2V6zm0 4h12v2H2v-2zm2 4h8v2H4v-2z"/>
        </svg>
      </button>
      <button type="button" class="rte-btn" (click)="execCommand('justifyLeft')" title="יישור לשמאל">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 2h16v2H0V2zm0 4h16v2H0V6zm0 4h12v2H0v-2zm0 4h12v2H0v-2z"/>
        </svg>
      </button>
    </div>

    <div class="rte-toolbar-separator"></div>

    <div class="rte-toolbar-group">
      <button type="button" class="rte-btn" (click)="execCommand('insertUnorderedList')" title="תבליטים">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="2" cy="3" r="1.5"/>
          <circle cx="2" cy="8" r="1.5"/>
          <circle cx="2" cy="13" r="1.5"/>
          <rect x="5" y="2" width="11" height="2" rx="1"/>
          <rect x="5" y="7" width="11" height="2" rx="1"/>
          <rect x="5" y="12" width="11" height="2" rx="1"/>
        </svg>
      </button>
      <button type="button" class="rte-btn" (click)="execCommand('insertOrderedList')" title="מספור">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <text x="0" y="5" font-size="6" font-weight="bold">1.</text>
          <text x="0" y="10" font-size="6" font-weight="bold">2.</text>
          <text x="0" y="15" font-size="6" font-weight="bold">3.</text>
          <rect x="5" y="2" width="11" height="2" rx="1"/>
          <rect x="5" y="7" width="11" height="2" rx="1"/>
          <rect x="5" y="12" width="11" height="2" rx="1"/>
        </svg>
      </button>
    </div>

    <div class="rte-toolbar-separator"></div>

    <div class="rte-toolbar-group">
      <button type="button" class="rte-btn" (click)="execCommand('undo')" title="ביטול (Ctrl+Z)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3.5 6.5L1 9l2.5 2.5V9.5h7c1.1 0 2-.9 2-2s-.9-2-2-2h-7V3.5z"/>
        </svg>
      </button>
      <button type="button" class="rte-btn" (click)="execCommand('redo')" title="חזרה (Ctrl+Y)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M12.5 6.5L15 9l-2.5 2.5V9.5h-7c-1.1 0-2-.9-2-2s.9-2 2-2h7V3.5z"/>
        </svg>
      </button>
    </div>
  </div>

  <div 
    #editor
    class="rte-editor"
    contenteditable="true"
    (input)="onContentChange()"
    (blur)="onTouched()"
    (keydown)="onEditorKeyDown($event)"
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

.rte-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #2563eb;
}

.rte-btn.active:hover {
  background: #2563eb;
  border-color: #1d4ed8;
}

.rte-btn svg {
  display: block;
  pointer-events: none;
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

/* תמיכה בתת-סעיפים ממוספרים עם CSS Counters */
.rte-editor ol {
  list-style: none;
  counter-reset: item;
  padding-right: 40px;
  margin: 1em 0;
}

.rte-editor ol li {
  counter-increment: item;
  margin-bottom: 0.5em;
  position: relative;
  padding-right: 1.5em;
}

.rte-editor ol li::before {
  content: counter(item) ". ";
  position: absolute;
  right: 0;
  font-weight: normal;
}

/* רמה שנייה - תת-סעיפים */
.rte-editor ol ol {
  counter-reset: subitem;
  padding-right: 30px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.rte-editor ol ol li {
  counter-increment: subitem;
}

.rte-editor ol ol li::before {
  content: counter(item) "." counter(subitem) ". ";
}

/* רמה שלישית */
.rte-editor ol ol ol {
  counter-reset: subsubitem;
  padding-right: 30px;
}

.rte-editor ol ol ol li {
  counter-increment: subsubitem;
}

.rte-editor ol ol ol li::before {
  content: counter(item) "." counter(subitem) "." counter(subsubitem) ". ";
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

  // State tracking for active formatting
  activeFormats = {
    bold: false,
    italic: false,
    underline: false
  };

  currentFontSize = '';
  currentHeading = '';

  ngAfterViewInit() {
    // Listen to selection changes to update toolbar state
    this.editorElement.nativeElement.addEventListener('mouseup', () => this.updateToolbarState());
    this.editorElement.nativeElement.addEventListener('keyup', () => this.updateToolbarState());
  }

  updateToolbarState() {
    // Check which formats are active at cursor position
    this.activeFormats.bold = document.queryCommandState('bold');
    this.activeFormats.italic = document.queryCommandState('italic');
    this.activeFormats.underline = document.queryCommandState('underline');

    // Get current font size
    const fontSize = document.queryCommandValue('fontSize');
    this.currentFontSize = fontSize || '';

    // Get current block format (heading/paragraph)
    const formatBlock = document.queryCommandValue('formatBlock');
    this.currentHeading = formatBlock.toLowerCase() || '';
  }

  execCommand(command: string, value: string | null = null) {
    // document.execCommand עדיין נתמך ברוב הדפדפנים לצורכי עריכה פשוטה
    document.execCommand(command, false, value || undefined);
    this.editorElement.nativeElement.focus();
    this.onContentChange();
    this.updateToolbarState();
  }

  onEditorKeyDown(event: KeyboardEvent) {
    // Handle Tab for indentation in lists
    if (event.key === 'Tab') {
      event.preventDefault();
      if (event.shiftKey) {
        // Shift+Tab: outdent
        document.execCommand('outdent', false);
      } else {
        // Tab: indent
        document.execCommand('indent', false);
      }
      this.onContentChange();
    }
  }

  changeFontSize(event: Event) {
    const select = event.target as HTMLSelectElement;
    if (select.value) {
      this.execCommand('fontSize', select.value);
      this.currentFontSize = select.value;
    }
  }

  changeHeading(event: Event) {
    const select = event.target as HTMLSelectElement;
    if (select.value) {
      this.execCommand('formatBlock', select.value);
      this.currentHeading = select.value;
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
