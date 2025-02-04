/* eslint-disable @typescript-eslint/no-unused-vars */
import { Editor } from "obsidian";

import { foldEffect, foldedRanges, unfoldEffect } from "@codemirror/fold";
import { foldable } from "@codemirror/language";
import { EditorView, runScopeHandlers } from "@codemirror/view";

export class MyEditorPosition {
  line: number;
  ch: number;
}

export class MyEditorSelection {
  anchor: MyEditorPosition;
  head: MyEditorPosition;
}

function foldInside(view: EditorView, from: number, to: number) {
  let found: { from: number; to: number } | null = null;
  foldedRanges(view.state).between(from, to, (from, to) => {
    if (!found || found.from > from) found = { from, to };
  });
  return found;
}

export class MyEditor {
  constructor(private e: Editor) {}

  getCursor(): MyEditorPosition {
    return this.e.getCursor();
  }

  getLine(n: number): string {
    return this.e.getLine(n);
  }

  lastLine(): number {
    return this.e.lastLine();
  }

  listSelections(): MyEditorSelection[] {
    return this.e.listSelections();
  }

  getRange(from: MyEditorPosition, to: MyEditorPosition): string {
    return this.e.getRange(from, to);
  }

  replaceRange(
    replacement: string,
    from: MyEditorPosition,
    to: MyEditorPosition
  ): void {
    return this.e.replaceRange(replacement, from, to);
  }

  setSelections(selections: MyEditorSelection[]): void {
    this.e.setSelections(selections);
  }

  setValue(text: string): void {
    this.e.setValue(text);
  }

  getValue(): string {
    return this.e.getValue();
  }

  fold(n: number): void {
    const view = this.getEditorView();
    const l = view.lineBlockAt(view.state.doc.line(n + 1).from);
    const range = foldable(view.state, l.from, l.to);

    if (!range || range.from === range.to) {
      return;
    }

    view.dispatch({ effects: [foldEffect.of(range)] });
  }

  unfold(n: number): void {
    const view = this.getEditorView();
    const l = view.lineBlockAt(view.state.doc.line(n + 1).from);
    const range = foldInside(view, l.from, l.to);

    if (!range) {
      return;
    }

    view.dispatch({ effects: [unfoldEffect.of(range)] });
  }

  isFolded(n: number): boolean {
    return this.getFirstLineOfFolding(n) !== null;
  }

  getFirstLineOfFolding(n: number): number | null {
    const view = this.getEditorView();
    const l = view.lineBlockAt(view.state.doc.line(n + 1).from);
    const range = foldInside(view, l.from, l.to);

    if (!range) {
      return null;
    }

    return view.state.doc.lineAt(range.from).number - 1;
  }

  triggerOnKeyDown(e: KeyboardEvent): void {
    runScopeHandlers(this.getEditorView(), e, "editor");
  }

  private getEditorView(): EditorView {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.e as any).cm;
  }
}
