import { RichTextEditorComponent } from './rich-text-editor.component';

describe('RichTextEditorComponent', () => {
  let component: RichTextEditorComponent;

  beforeEach(() => {
    component = new RichTextEditorComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default placeholder', () => {
    expect(component.placeholder).toBe('Start typing...');
  });

  it('should have default height', () => {
    expect(component.height).toBe('400px');
  });

  it('should emit content change', (done) => {
    // Mock editor element
    component.editor = {
      nativeElement: {
        innerHTML: '<p>Test</p>'
      }
    } as any;
    
    component.contentChange.subscribe((content: string) => {
      expect(content).toBeDefined();
      done();
    });
    component.updateContent();
  });

  it('should get and set content', () => {
    // Mock editor element
    const mockElement = {
      innerHTML: ''
    };
    component.editor = {
      nativeElement: mockElement
    } as any;
    
    const testContent = '<p>Test content</p>';
    component.setContent(testContent);
    expect(mockElement.innerHTML).toBe(testContent);
    expect(component.getContent()).toBe(testContent);
  });
});
