'use client'

import { useEffect, useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export default function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: any) {
    editorRef.current = editor

    // Register TDL language
    monaco.languages.register({ id: 'tdl' })

    // Define TDL syntax highlighting
    monaco.languages.setMonarchTokensProvider('tdl', {
      tokenizer: {
        root: [
          [/\[#[^\]]+\]/, 'keyword'],
          [/\[[^\]]+\]/, 'type'],
          [/Use:|Local:|Set:|Storage:|Width:|Height:|Type:|Add:|Delete:|Modify:/, 'attribute'],
          [/"[^"]*"/, 'string'],
          [/##[A-Za-z0-9]+/, 'variable'],
          [/\$[A-Za-z0-9]+/, 'variable'],
          [/;.*$/, 'comment'],
          [/Yes|No|True|False/, 'constant'],
        ],
      },
    })

    // Define TDL theme
    monaco.editor.defineTheme('tdl-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'C586C0', fontStyle: 'bold' },
        { token: 'type', foreground: '4EC9B0', fontStyle: 'bold' },
        { token: 'attribute', foreground: '9CDCFE' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'variable', foreground: 'DCDCAA' },
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'constant', foreground: '569CD6' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
      },
    })

    monaco.editor.setTheme('tdl-dark')
  }

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      onChange(value)
    }
  }

  return (
    <MonacoEditor
      height="100%"
      defaultLanguage="tdl"
      value={value}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 4,
        wordWrap: 'on',
      }}
    />
  )
}
