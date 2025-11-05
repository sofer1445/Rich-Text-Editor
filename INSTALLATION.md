# Installation Guide

This guide will help you install and set up the Rich Text Editor for Angular 20 in your project.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Angular CLI 20.x

## Installation Steps

### 1. Install via npm

```bash
npm install @sofer1445/rich-text-editor
```

### 2. Import the Component

Since this is a standalone component, you can import it directly into your component:

```typescript
import { Component } from '@angular/core';
import { RichTextEditorComponent } from '@sofer1445/rich-text-editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RichTextEditorComponent],
  template: `
    <rte-rich-text-editor></rte-rich-text-editor>
  `
})
export class AppComponent { }
```

### 3. Use in Your Template

Add the editor to your template:

```html
<rte-rich-text-editor
  [(content)]="editorContent"
  [placeholder]="'Start typing...'"
  [height]="'500px'"
  (onContentChange)="handleContentChange($event)">
</rte-rich-text-editor>
```

### 4. Handle Content Changes

In your component:

```typescript
export class AppComponent {
  editorContent = '<p>Initial content</p>';

  handleContentChange(content: string) {
    console.log('Content changed:', content);
    // Save or process the content
  }
}
```

## Configuration Options

### Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | `string` | `''` | Initial HTML content |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text |
| `height` | `string` | `'400px'` | Editor height |

### Output Events

| Event | Payload | Description |
|-------|---------|-------------|
| `contentChange` | `string` | Emitted on content change (for two-way binding) |
| `onContentChange` | `string` | Emitted on content change |

### Methods

Access these methods using ViewChild:

```typescript
@ViewChild('editor') editor!: RichTextEditorComponent;

// Get content
const htmlContent = this.editor.getContent();

// Set content
this.editor.setContent('<p>New content</p>');

// Clear formatting
this.editor.clearFormatting();
```

## Troubleshooting

### Module not found

If you encounter module not found errors, ensure:
1. The package is properly installed
2. Your Angular version is 20.x or higher
3. You've imported the component correctly

### Styles not applying

The component includes its own styles. If styles aren't applying:
1. Check if you have any global styles overriding component styles
2. Ensure ViewEncapsulation is not disabled

### Content not saving

Make sure you're using two-way binding or listening to the `onContentChange` event:

```html
<!-- Two-way binding -->
<rte-rich-text-editor [(content)]="myContent"></rte-rich-text-editor>

<!-- Or event listener -->
<rte-rich-text-editor (onContentChange)="saveContent($event)"></rte-rich-text-editor>
```

## Advanced Usage

### Custom Styling

You can override styles using CSS:

```css
::ng-deep rte-rich-text-editor .rte-toolbar {
  background: #f0f0f0;
}

::ng-deep rte-rich-text-editor .rte-editor {
  font-family: 'Georgia', serif;
}
```

### Programmatic Control

```typescript
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorComponent } from '@sofer1445/rich-text-editor';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="saveContent()">Save</button>
    <button (click)="loadContent()">Load</button>
    <rte-rich-text-editor #editor></rte-rich-text-editor>
  `
})
export class ExampleComponent {
  @ViewChild('editor') editor!: RichTextEditorComponent;

  saveContent() {
    const content = this.editor.getContent();
    localStorage.setItem('savedContent', content);
  }

  loadContent() {
    const content = localStorage.getItem('savedContent') || '';
    this.editor.setContent(content);
  }
}
```

## Support

For issues and questions:
- GitHub Issues: https://github.com/sofer1445/Rich-Text-Editor/issues
- Documentation: https://github.com/sofer1445/Rich-Text-Editor

## Next Steps

- Check out the [README](./README.md) for feature overview
- See the demo application in `projects/demo`
- Browse the source code for customization ideas
