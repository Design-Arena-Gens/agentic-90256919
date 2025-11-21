'use client'

import { useState } from 'react'
import styles from './TDLReference.module.css'

interface Section {
  title: string
  content: string
  examples?: string[]
}

export default function TDLReference() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSection, setActiveSection] = useState<string>('overview')

  const sections: Record<string, Section> = {
    overview: {
      title: 'TDL Overview',
      content: `Tally Definition Language (TDL) is a powerful programming language used to customize and extend Tally Prime.

TDL allows you to:
• Create custom reports and forms
• Modify existing Tally screens
• Implement business logic
• Automate data entry
• Integrate with external systems`,
    },
    objects: {
      title: 'TDL Objects',
      content: `Main TDL Objects:

[#Part] - Screen components and layouts
[#Line] - Individual lines in reports or forms
[#Field] - Input/display fields
[#Form] - Complete screen definitions
[#Report] - Report definitions
[#Collection] - Data collections
[#Variable] - Storage variables
[#Function] - Custom functions
[#System] - System definitions`,
      examples: [
        '[Part: MyPart]\n    Line: MyLine',
        '[Field: MyField]\n    Use: Name Field\n    Storage: MyVar',
      ],
    },
    attributes: {
      title: 'Common Attributes',
      content: `Frequently Used Attributes:

Use: - Inherit from another definition
Local: - Define local objects
Set: - Set values
Add: - Add items to lists
Delete: - Remove items
Modify: - Modify existing definitions
Storage: - Link to variable
Width: - Set width
Height: - Set height
Type: - Define type`,
      examples: [
        'Use: Name Field',
        'Set: Width: 20',
        'Storage: MyVariable',
        'Add: Button: MyButton',
      ],
    },
    collections: {
      title: 'Collections',
      content: `Collections fetch and organize data:

[Collection: MyCollection]
    Type: Ledgers / Vouchers / Stock Items
    Filter: MyFilter
    Fetch: Name, Amount, Date
    Sort: Name
    Compute: Total: Sum(Amount)`,
      examples: [
        '[Collection: AllLedgers]\n    Type: Ledgers\n    Fetch: Name, ClosingBalance',
        '[Collection: SalesVouchers]\n    Type: Vouchers: Sales\n    Filter: DateFilter',
      ],
    },
    functions: {
      title: 'Functions & Formulas',
      content: `Built-in Functions:

String Functions:
• $$String - Convert to string
• $$StringFind - Find substring
• $$Upper / $$Lower - Case conversion

Math Functions:
• $$Number - Convert to number
• $$Round - Round numbers
• $$Abs - Absolute value

Date Functions:
• $$MonthName - Get month name
• $$YearOfDate - Extract year
• $$Date - Create date

Logical:
• $$IsEmpty - Check if empty
• $$IsEqual - Compare values
• IF condition THEN value ELSE value`,
      examples: [
        '$$String:$$Number:##Amount',
        'IF $$IsEmpty:$Name THEN "Unknown" ELSE $Name',
        '$$Round:##Total:2',
      ],
    },
    reports: {
      title: 'Creating Reports',
      content: `Report Structure:

[#Report: MyReport]
    Form: MyReportForm
    Title: "My Custom Report"

[Form: MyReportForm]
    Part: MyReportPart

[Part: MyReportPart]
    Line: MyReportLine
    Repeat: MyReportLine: MyCollection
    Scroll: Vertical

[Line: MyReportLine]
    Field: NameField, AmountField`,
      examples: [
        '[#Report: LedgerReport]\n    Form: LedgerForm\n    Title: "Ledger Summary"',
      ],
    },
    forms: {
      title: 'Creating Forms',
      content: `Form Structure:

[#Form: MyForm]
    Part: FormPart
    Width: 80% Screen
    Height: 60% Screen

[Part: FormPart]
    Line: TitleLine, InputLine, ButtonLine

[Line: InputLine]
    Field: NameField, AmountField

[Field: NameField]
    Use: Name Field
    Storage: EnteredName
    Set Always: Yes`,
    },
    variables: {
      title: 'Variables',
      content: `Variable Types:

[#Variable: MyVar]
    Type: String / Number / Date / Amount / Logical
    Default: "Initial Value"
    Persistent: Yes

Access Variables:
• $MyVar - Read value
• #MyVar - Write value

System Variables:
• $$Date - Current date
• $$Time - Current time
• $$Company - Company name
• SVCurrentCompany - Current company`,
      examples: [
        '[#Variable: TotalAmount]\n    Type: Amount\n    Default: 0',
        'Set: Value: $MyVar + 100',
      ],
    },
    actions: {
      title: 'Actions & Events',
      content: `Common Actions:

On: Key Events
• Enter - Enter key
• Escape - Escape key
• Ctrl+A - Keyboard shortcuts

Actions:
• Call: Function
• Set: Variable: Value
• Browse: URL
• Export: Report
• Print: Report
• Email: Report

[Field: ButtonField]
    On: Enter: Call: MyFunction`,
      examples: [
        '[Field: SaveButton]\n    On: Enter: Call: SaveData',
        '[Line: ActionLine]\n    On: Escape: Return',
      ],
    },
    filters: {
      title: 'Filters',
      content: `Filter Syntax:

[System: Formulae]
    MyFilter: $Name Contains "ABC"

Filter Operators:
• = (Equal)
• <> (Not Equal)
• > < >= <= (Comparison)
• Contains - Substring match
• Starts With / Ends With
• AND / OR / NOT

[Collection: FilteredData]
    Filter: MyFilter`,
      examples: [
        'MyFilter: $Amount > 1000',
        'DateFilter: $Date >= $$MonthStart',
        'NameFilter: $Name Contains "Sales"',
      ],
    },
  }

  const filteredSections = Object.entries(sections).filter(([key, section]) =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <input
          type="text"
          placeholder="Search reference..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <nav className={styles.nav}>
          {filteredSections.map(([key, section]) => (
            <button
              key={key}
              className={`${styles.navItem} ${activeSection === key ? styles.activeNavItem : ''}`}
              onClick={() => setActiveSection(key)}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>
      <div className={styles.content}>
        {sections[activeSection] && (
          <>
            <h2 className={styles.sectionTitle}>{sections[activeSection].title}</h2>
            <div className={styles.sectionContent}>
              {sections[activeSection].content.split('\n').map((line, i) => (
                <p key={i} className={styles.paragraph}>{line}</p>
              ))}
            </div>
            {sections[activeSection].examples && (
              <div className={styles.examples}>
                <h3 className={styles.examplesTitle}>Examples:</h3>
                {sections[activeSection].examples!.map((example, i) => (
                  <pre key={i} className={styles.exampleCode}>
                    <code>{example}</code>
                  </pre>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
