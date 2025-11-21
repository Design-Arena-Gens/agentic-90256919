'use client'

import styles from './ExampleSelector.module.css'

interface ExampleSelectorProps {
  onSelectExample: (code: string) => void
}

export default function ExampleSelector({ onSelectExample }: ExampleSelectorProps) {
  const examples = [
    {
      name: 'Hello World',
      code: `[#Line: TDL Example]
    Use: Name Field
    Local: Field: Sample Field
    Set: Sample Field: "Hello Tally Prime"

[System: Formulae]
    TDLExample: ##TDLExample

[Field: Sample Field]
    Use: Name Field
    Storage: SampleVar
    Set Always: Yes`,
    },
    {
      name: 'Custom Button',
      code: `[#Form: MyForm]
    Part: MyFormPart
    Width: 50% Screen
    Height: 30% Screen

[Part: MyFormPart]
    Line: ButtonLine

[Line: ButtonLine]
    Field: ClickButton
    Align: Center

[Field: ClickButton]
    Use: Name Field
    Set: Value: "Click Me"
    On: Enter: Call: ShowMessage

[Function: ShowMessage]
    00: MSGBOX: "Button Clicked!" : "Info"`,
    },
    {
      name: 'Ledger Report',
      code: `[#Report: LedgerSummary]
    Form: LedgerForm
    Title: "Ledger Summary Report"

[Form: LedgerForm]
    Part: LedgerPart

[Part: LedgerPart]
    Line: LedgerTitle, LedgerLine
    Repeat: LedgerLine: LedgerCollection
    Scroll: Vertical

[Line: LedgerTitle]
    Field: TitleName, TitleBalance
    Border: Thin Bottom

[Line: LedgerLine]
    Field: LedgerName, LedgerBalance

[Field: TitleName]
    Set: Value: "Ledger Name"
    Width: 40

[Field: TitleBalance]
    Set: Value: "Balance"
    Width: 20

[Field: LedgerName]
    Use: Name Field
    Set: Value: $Name
    Width: 40

[Field: LedgerBalance]
    Use: Amount Field
    Set: Value: $ClosingBalance
    Width: 20

[Collection: LedgerCollection]
    Type: Ledgers
    Fetch: Name, ClosingBalance
    Sort: Name`,
    },
    {
      name: 'Variables & Calculations',
      code: `[#Variable: Rate]
    Type: Number
    Default: 100

[#Variable: Quantity]
    Type: Number
    Default: 5

[#Variable: Total]
    Type: Amount

[#Line: CalculationLine]
    Field: RateField, QtyField, TotalField

[Field: RateField]
    Use: Number Field
    Storage: Rate
    Set Always: Yes
    Set: Caption: "Rate:"

[Field: QtyField]
    Use: Number Field
    Storage: Quantity
    Set Always: Yes
    Set: Caption: "Quantity:"

[Field: TotalField]
    Use: Amount Field
    Storage: Total
    Set: Value: $Rate * $Quantity
    Set: Caption: "Total:"
    Skip: Yes`,
    },
    {
      name: 'Data Filter',
      code: `[#Report: FilteredVouchers]
    Form: VoucherForm
    Title: "Filtered Vouchers"

[Form: VoucherForm]
    Part: VoucherPart

[Part: VoucherPart]
    Line: VoucherLine
    Repeat: VoucherLine: FilteredVouchers

[Line: VoucherLine]
    Field: VDate, VType, VAmount

[Field: VDate]
    Use: Date Field
    Set: Value: $Date

[Field: VType]
    Use: Name Field
    Set: Value: $VoucherTypeName

[Field: VAmount]
    Use: Amount Field
    Set: Value: $Amount

[Collection: FilteredVouchers]
    Type: Vouchers
    Filter: AmountFilter
    Fetch: Date, VoucherTypeName, Amount

[System: Formulae]
    AmountFilter: $Amount > 1000`,
    },
    {
      name: 'Menu System',
      code: `[#Menu: MyMenu]
    Title: "Custom Menu"
    Add: Item: MenuItem1
    Add: Item: MenuItem2
    Add: Item: MenuItem3

[#Menu: MenuItem1]
    Title: "Reports"
    Add: Key: R
    Action: Display: MyReport

[#Menu: MenuItem2]
    Title: "Data Entry"
    Add: Key: E
    Action: Alter: Voucher

[#Menu: MenuItem3]
    Title: "Exit"
    Add: Key: X
    Action: Return`,
    },
  ]

  return (
    <div className={styles.container}>
      <label className={styles.label}>Load Example:</label>
      <select
        className={styles.select}
        onChange={(e) => {
          const example = examples[parseInt(e.target.value)]
          if (example) {
            onSelectExample(example.code)
          }
        }}
        defaultValue=""
      >
        <option value="" disabled>Choose an example...</option>
        {examples.map((example, index) => (
          <option key={index} value={index}>
            {example.name}
          </option>
        ))}
      </select>
    </div>
  )
}
