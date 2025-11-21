'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './page.module.css'

const Editor = dynamic(() => import('../components/Editor'), { ssr: false })
const TDLReference = dynamic(() => import('../components/TDLReference'), { ssr: false })
const ExampleSelector = dynamic(() => import('../components/ExampleSelector'), { ssr: false })

export default function Home() {
  const [code, setCode] = useState(`[#Line: TDL Example]
    Use: Name Field
    Local: Field: Sample Field
    Set: Sample Field: "Hello Tally Prime"

[System: Formulae]
    TDL Example: ##TDLExample

[Field: Sample Field]
    Use: Name Field
    Storage: SampleVar
    Set Always: Yes`)

  const [activeTab, setActiveTab] = useState<'editor' | 'reference'>('editor')

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tally Prime TDL</h1>
        <p className={styles.subtitle}>Tally Definition Language Editor & Reference</p>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'editor' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          Editor
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'reference' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('reference')}
        >
          Reference
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'editor' ? (
          <div className={styles.editorContainer}>
            <div className={styles.exampleSelector}>
              <ExampleSelector onSelectExample={setCode} />
            </div>
            <div className={styles.editorWrapper}>
              <Editor value={code} onChange={setCode} />
            </div>
          </div>
        ) : (
          <TDLReference />
        )}
      </div>

      <footer className={styles.footer}>
        <p>Tally Definition Language (TDL) for Tally Prime</p>
      </footer>
    </main>
  )
}
