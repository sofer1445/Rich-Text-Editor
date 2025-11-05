# Angular Rich Text Editor

> 📝 A lightweight, standalone rich text editor component for Angular 20+ with Hebrew and RTL support.

[![npm version](https://img.shields.io/npm/v/@sofer1445/angular-rich-text-editor.svg)](https://www.npmjs.com/package/@sofer1445/angular-rich-text-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Rich Text Formatting**: Bold, Italic, Underline
- 📏 **Font Sizes**: 7 different size options
- 📑 **Headings**: Support for H1-H4 and paragraphs
- ↔️ **Text Alignment**: Right, Center, Left (perfect for RTL/LTR)
- 📋 **Lists**: Ordered and Unordered lists
- ⏮️ **Undo/Redo**: Full history support
- 🌐 **RTL Support**: Built-in Hebrew and RTL language support
- 🔌 **Standalone Component**: No module imports needed
- 📦 **ngModel Compatible**: Works seamlessly with Angular Forms

## 🚀 Installation

```bash
npm install @sofer1445/angular-rich-text-editor
```

## 📖 Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { RichTextEditorComponent } from '@sofer1445/angular-rich-text-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RichTextEditorComponent, FormsModule],
  template: `
    <rich-text-editor [(ngModel)]="content"></rich-text-editor>
  `
})
export class AppComponent {
  content = '<p>Start typing here...</p>';
}
```

### With Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorComponent } from '@sofer1445/angular-rich-text-editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RichTextEditorComponent, ReactiveFormsModule],
  template: `
    <rich-text-editor [formControl]="editorControl"></rich-text-editor>
  `
})
export class AppComponent {
  editorControl = new FormControl('<p>Hello World!</p>');
}
```

## 🎯 Requirements

- **Angular**: ^20.0.0
- **@angular/common**: ^20.0.0
- **@angular/forms**: ^20.0.0

## 🛠️ API

### Component Selector

```html
<rich-text-editor></rich-text-editor>
```

### Supported by ControlValueAccessor

The component implements `ControlValueAccessor` interface, making it compatible with:
- `[(ngModel)]` - Two-way data binding
- `[formControl]` - Reactive forms
- `formControlName` - Forms with FormGroup

## 🌍 RTL Support

The editor is configured with `dir="rtl"` by default, making it perfect for Hebrew and Arabic content. The toolbar icons and alignment buttons are optimized for RTL usage.

## 📄 License

MIT © [sofer1445](https://github.com/sofer1445)

## 🔗 Links

- [GitHub Repository](https://github.com/sofer1445/Rich-Text-Editor)
- [NPM Package](https://www.npmjs.com/package/@sofer1445/angular-rich-text-editor)
- [Report Issues](https://github.com/sofer1445/Rich-Text-Editor/issues)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Made with ❤️ for the Angular community**
