import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'rte-rich-text-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent implements OnInit {
  @ViewChild('editor', { static: false }) editor!: ElementRef;
  
  @Input() placeholder: string = 'Start typing...';
  @Input() height: string = '400px';
  @Input() content: string = '';
  
  @Output() contentChange = new EventEmitter<string>();
  @Output() onContentChange = new EventEmitter<string>();

  fontSizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '72'];
  fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Comic Sans MS', 'Impact', 'Trebuchet MS'];
  
  selectedFontSize = '12';
  selectedFontFamily = 'Arial';

  ngOnInit() {
    if (this.content) {
      setTimeout(() => {
        if (this.editor) {
          this.editor.nativeElement.innerHTML = this.content;
        }
      });
    }
  }

  execCommand(command: string, value: string | null = null) {
    document.execCommand(command, false, value || undefined);
    this.updateContent();
  }

  insertLink() {
    const url = prompt('Enter URL:');
    if (url) {
      this.execCommand('createLink', url);
    }
  }

  insertImage() {
    const url = prompt('Enter image URL:');
    if (url) {
      this.execCommand('insertImage', url);
    }
  }

  changeFontSize(size: string) {
    this.selectedFontSize = size;
    this.execCommand('fontSize', '3');
    const fontElements = this.editor.nativeElement.querySelectorAll('font[size="3"]');
    fontElements.forEach((el: HTMLElement) => {
      el.removeAttribute('size');
      el.style.fontSize = size + 'px';
    });
    this.updateContent();
  }

  changeFontFamily(family: string) {
    this.selectedFontFamily = family;
    this.execCommand('fontName', family);
  }

  changeTextColor(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    this.execCommand('foreColor', color);
  }

  changeBackgroundColor(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    this.execCommand('backColor', color);
  }

  updateContent() {
    const content = this.editor.nativeElement.innerHTML;
    this.content = content;
    this.contentChange.emit(content);
    this.onContentChange.emit(content);
  }

  clearFormatting() {
    this.execCommand('removeFormat');
  }

  getContent(): string {
    return this.editor.nativeElement.innerHTML;
  }

  setContent(content: string) {
    this.editor.nativeElement.innerHTML = content;
    this.updateContent();
  }
}
