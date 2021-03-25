# Obsidian Outliner

Work with your lists like in Workflowy or RoamResearch.

## Demo

![Demo](demo.gif)

## Supported hotkeys

- `Tab`, `Shift-Tab` - Change item and subitems indent.
- `Cmd-ArrowUp`, `Cmd-ArrowDown` - Expand / collapse.
- `Cmd-Shift-ArrowUp`, `Cmd-Shift-ArrowDown`, - Move item and subitems.
- `ArrowDown`, `ArrowUp`, `ArrowLeft`, `ArrowRight`, `Cmd-ArrowLeft`, `Cmd-Shift-ArrowLeft` - Move cursor within list content.
- `Cmd-Backspace` - Delete item content without deleting item.
- `Backspace` - Delete item.
- `Enter` - Create new item down below.

## Better lists styles

If you liked lists styles from the demo you can use my snippet. [How to use snippets](https://publish.obsidian.md/help/How+to/Add+custom+styles).

```css
.cm-hmd-list-indent .cm-tab {
  position: relative;
}

.cm-hmd-list-indent .cm-tab::before {
  content: '';
  border-left: 1px solid #444;
  position: absolute;
  left: 3px;
  top: -8px;
  bottom: -3px;
}

.cm-s-obsidian .HyperMD-list-line {
  padding-top: 0.4em;
}

.cm-formatting-list-ul {
  letter-spacing: 3px;
}

.cm-formatting-list-ul:before {
  content: '•';
  position: absolute;
  margin-left: -3px;
  margin-top: -5px;
  font-size: 24px;
  color: var(--accent);
  visibility: visible !important; 
}
```

## Todo

- Multi-item workflow.
- Support other types of lists (currenly supported only `\t*- `).
- Tests.
