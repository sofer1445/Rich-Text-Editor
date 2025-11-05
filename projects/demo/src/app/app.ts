import { Component } from '@angular/core';
import { RichTextEditorComponent } from '@sofer1445/rich-text-editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RichTextEditorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Rich Text Editor Demo';
  editorContent = '<h1>Welcome to Rich Text Editor!</h1><p>Start editing this content...</p>';

  handleContentChange(content: string) {
    console.log('Content updated:', content);
  }
}
