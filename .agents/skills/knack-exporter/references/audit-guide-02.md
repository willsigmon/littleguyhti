# Requested Knack export/report — selected reference

Read only when the entrypoint selects this topic. These are specialized reference details, not independent provider, spending, publishing, production, or memory-write authority. Current task scope, project brand and the entrypoint gates control any imperative recipe below. Examples are not standing authorization. All code/script paths are relative to the skill root unless a link specifies otherwise.

## Core Functions

### export_pdf
**Purpose**: Generate branded PDF reports for formal submissions

**Parameters**:
- `report` (object, required): Report data structure
- `filename` (string, required): Output filename
- `template` (string, optional): "ncdit_compliance" | "board_summary" | "donor_impact"
- `branding` (boolean, optional): Apply HTI colors/logo (default: true)

**Example**:
```javascript
const pdf = await export_pdf({
  report: await generate_quarterly_report("Q1", "2025"),
  filename: "HTI_Q1_2025_Report.pdf",
  template: "ncdit_compliance",
  branding: true
});
```

**PDF Generation Libraries**:
```javascript
// Option 1: Puppeteer (HTML → PDF)
import puppeteer from 'puppeteer';

async function generate_pdf_from_html(html, filename) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({
    path: filename,
    format: 'Letter',
    margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' },
    printBackground: true
  });
  await browser.close();
}

// Option 2: jsPDF (programmatic)
import jsPDF from 'jspdf';

function generate_pdf_programmatic(data, filename) {
  const doc = new jsPDF();

  // Add HTI branding
  doc.setFontSize(20);
  doc.setTextColor('#0E2240'); // Navy Blue
  doc.text('HUBZone Technology Initiative', 20, 20);

  // Add content
  doc.setFontSize(12);
  doc.text(`Q1 2025 Quarterly Report`, 20, 40);
  doc.text(`Laptops Acquired: ${data.acquired}`, 20, 50);
  doc.text(`Devices Converted: ${data.converted}`, 20, 60);

  doc.save(filename);
}
```

### export_csv
**Purpose**: Export raw data for Excel analysis or data pipelines

**Parameters**:
- `records` (array, required): Array of record objects
- `filename` (string, required): Output filename
- `columns` (array, optional): Which fields to include (default: all)
- `delimiter` (string, optional): "," | ";" | "\t" (default: ",")

**Example**:
```javascript
const csv = await export_csv({
  records: await fetch_all_pages("object_1"),
  filename: "HTI_All_Devices_2025.csv",
  columns: ["id", "serial_number", "donor", "status", "county", "acquisition_date"],
  delimiter: ","
});
```

**Implementation**:
```javascript
import { stringify } from 'csv-stringify/sync';

function export_csv({ records, filename, columns, delimiter = ',' }) {
  const csv_data = stringify(records, {
    header: true,
    columns: columns || Object.keys(records[0]),
    delimiter: delimiter
  });

  fs.writeFileSync(filename, csv_data);
  return { filename, rows: records.length };
}
```

### export_json
**Purpose**: Export structured data for API consumption or archival

**Parameters**:
- `dataset` (object, required): Data to export
- `filename` (string, optional): Save to file (default: return string)
- `pretty` (boolean, optional): Human-readable formatting (default: true)

**Example**:
```javascript
const json = await export_json({
  dataset: {
    metadata: { quarter: "Q1", year: "2025" },
    metrics: await generate_metrics({ fields: ["acquired", "converted"] }),
    records: await fetch_all_pages("object_1")
  },
  filename: "HTI_Q1_2025_Data.json",
  pretty: true
});
```

**Implementation**:
```javascript
function export_json({ dataset, filename, pretty = true }) {
  const json_string = JSON.stringify(dataset, null, pretty ? 2 : 0);

  if (filename) {
    fs.writeFileSync(filename, json_string);
    return { filename, size_kb: (json_string.length / 1024).toFixed(2) };
  }

  return json_string;
}
```

### export_excel
**Purpose**: Generate Excel workbooks with multiple sheets and formatting

**Parameters**:
- `workbook` (object, required): Multi-sheet workbook structure
- `filename` (string, required): Output filename (.xlsx)
- `formatting` (object, optional): Cell styles, colors, formulas

**Example**:
```javascript
const excel = await export_excel({
  workbook: {
    sheets: [
      {
        name: "Summary",
        data: [
          ["Metric", "Value"],
          ["Laptops Acquired", 875],
          ["Devices Converted", 623],
          ["Conversion Rate", "71.2%"]
        ]
      },
      {
        name: "All Devices",
        data: await fetch_all_pages("object_1")
      },
      {
        name: "By County",
        data: await county_breakdown()
      }
    ]
  },
  filename: "HTI_Q1_2025_Workbook.xlsx",
  formatting: {
    header_style: {
      fill: { fgColor: { rgb: "0E2240" } },
      font: { color: { rgb: "FFFFFF" }, bold: true }
    }
  }
});
```

**Implementation**:
```javascript
import ExcelJS from 'exceljs';

async function export_excel({ workbook, filename, formatting }) {
  const wb = new ExcelJS.Workbook();

  workbook.sheets.forEach(sheet_def => {
    const sheet = wb.addWorksheet(sheet_def.name);

    // Add data
    sheet.addRows(sheet_def.data);

    // Apply header formatting
    const header_row = sheet.getRow(1);
    header_row.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    header_row.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0E2240' } // HTI Navy
    };

    // Auto-size columns
    sheet.columns.forEach(column => {
      column.width = 15;
    });
  });

  await wb.xlsx.writeFile(filename);
  return { filename, sheets: workbook.sheets.length };
}
```

### export_html
**Purpose**: Generate HTML reports for emails or web embedding

**Parameters**:
- `report` (object, required): Report data
- `template` (string, required): HTML template name
- `inline_css` (boolean, optional): Embed CSS (for email) (default: true)

**Example**:
```javascript
const html = await export_html({
  report: await generate_quarterly_report("Q1", "2025"),
  template: "donor_impact_email",
  inline_css: true
});

// Send via email
await sendEmail({
  to: "major_donors@list.com",
  subject: "HTI Q1 2025 Impact Report",
  html: html
});
```

**Template Example**:
```javascript
function render_donor_impact_email(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #0E2240; }
        .header { background: #0E2240; color: white; padding: 20px; }
        .metric { font-size: 48px; color: #6FC3DF; font-weight: bold; }
        .label { font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Your Impact This Quarter</h1>
      </div>
      <div style="padding: 20px;">
        <p>Thanks to your generous donation, HTI was able to:</p>

        <div style="text-align: center; margin: 30px 0;">
          <div class="metric">${data.acquired}</div>
          <div class="label">Laptops Acquired</div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <div class="metric">${data.converted}</div>
          <div class="label">Chromebooks Created</div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <div class="metric">${data.train_hours}</div>
          <div class="label">Training Hours Delivered</div>
        </div>

        <p><strong>Every device makes a difference.</strong> Thank you for being part of HTI's mission to bridge the digital divide.</p>
      </div>
    </body>
    </html>
  `;
}
```
