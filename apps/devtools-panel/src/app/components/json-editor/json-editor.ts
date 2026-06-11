import { Component, ElementRef, OnDestroy, afterNextRender, effect, inject, input, output } from '@angular/core';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { HighlightStyle, bracketMatching, syntaxHighlighting } from '@codemirror/language';
import { json } from '@codemirror/lang-json';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { tags } from '@lezer/highlight';

const highlightStyle = HighlightStyle.define([
  { tag: tags.propertyName, color: '#9cdcfe' },
  { tag: tags.string,       color: '#ce9178' },
  { tag: tags.number,       color: '#b5cea8' },
  { tag: tags.bool,         color: '#569cd6' },
  { tag: tags.null,         color: '#569cd6' },
  { tag: tags.punctuation,  color: '#808080' },
]);

const editorTheme = EditorView.theme({
  '&':           { fontSize: '12px', fontFamily: "Consolas, 'Courier New', monospace" },
  '.cm-content': { padding: '6px 0', minHeight: '80px' },
  '.cm-line':    { padding: '0 8px' },
  '.cm-focused': { outline: 'none' },
  '.cm-editor':  { background: '#1e1e1e', height: '100%' },
  '.cm-scroller':{ overflow: 'auto' },
  '.cm-cursor':  { borderLeftColor: '#aeafad' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': { background: '#264f78 !important' },
  '.cm-activeLine': { backgroundColor: '#ffffff08' },
  '.cm-matchingBracket': { backgroundColor: '#0064001a', outline: '1px solid #888' },
}, { dark: true });

@Component({
  selector: 'app-json-editor',
  template: '',
  styleUrl: './json-editor.css',
  host: { class: 'json-editor' },
})
export class JsonEditorComponent implements OnDestroy {
  readonly value    = input<string>('');
  readonly valueChange = output<string>();
  readonly errorChange = output<string | null>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private editor: EditorView | null = null;
  private skipSync = false;

  constructor() {
    afterNextRender(() => this.initEditor());

    effect(() => {
      const v = this.value();
      if (!this.editor) return;
      const current = this.editor.state.doc.toString();
      if (current === v) return;
      this.skipSync = true;
      this.editor.dispatch({ changes: { from: 0, to: current.length, insert: v } });
    });
  }

  private initEditor(): void {
    this.editor = new EditorView({
      parent: this.el.nativeElement,
      state: EditorState.create({
        doc: this.value(),
        extensions: [
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          json(),
          syntaxHighlighting(highlightStyle),
          bracketMatching(),
          EditorView.lineWrapping,
          editorTheme,
          EditorView.updateListener.of((update) => {
            if (!update.docChanged) return;
            if (this.skipSync) { this.skipSync = false; return; }
            const text = update.state.doc.toString();
            this.valueChange.emit(text);
            if (!text.trim()) { this.errorChange.emit(null); return; }
            try {
              JSON.parse(text);
              this.errorChange.emit(null);
            } catch (e) {
              this.errorChange.emit(e instanceof Error ? e.message : 'Invalid JSON');
            }
          }),
        ],
      }),
    });
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }
}
