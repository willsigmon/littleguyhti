# Requested Knack export/report — selected reference

Read only when the entrypoint selects this topic. These are specialized reference details, not independent provider, spending, publishing, production, or memory-write authority. Current task scope, project brand and the entrypoint gates control any imperative recipe below. Examples are not standing authorization. All code/script paths are relative to the skill root unless a link specifies otherwise.

## Report Templates

### NCDIT Compliance Template (PDF)
```javascript
const ncdit_template = {
  sections: [
    {
      title: "Grant Information",
      fields: ["grant_id", "organization", "reporting_period"]
    },
    {
      title: "Device Acquisition & Conversion",
      fields: ["acquired", "converted", "conversion_rate"],
      chart: "acquisition_trend"
    },
    {
      title: "Geographic Distribution",
      fields: ["counties_served", "county_breakdown"],
      chart: "county_bar_chart"
    },
    {
      title: "Training & Education",
      fields: ["train_hours", "participants", "sessions"]
    },
    {
      title: "Progress Toward Goals",
      fields: ["goal_comparison"],
      chart: "progress_bars"
    }
  ],
  branding: {
    header_color: "#0E2240",
    accent_color: "#6FC3DF",
    logo: "hti_logo.png",
    footer: "HUBZone Technology Initiative | NCDIT Digital Champion Grantee"
  }
};
```

### Board Summary Template (PDF)
```javascript
const board_template = {
  sections: [
    { title: "Executive Summary", type: "text" },
    { title: "Key Metrics", type: "kpi_grid" },
    { title: "Operational Highlights", type: "bullet_list" },
    { title: "Financial Summary", type: "table" },
    { title: "Challenges & Risks", type: "callout" },
    { title: "Next Quarter Priorities", type: "numbered_list" }
  ],
  branding: {
    full_hti_branding: true,
    page_numbers: true,
    confidential_watermark: false
  }
};
```

### Donor Impact Template (HTML Email)
```javascript
const donor_email_template = {
  layout: "single_column",
  sections: [
    { type: "hero_image", content: "devices_in_action.jpg" },
    { type: "thank_you_message", tone: "warm" },
    { type: "impact_metrics", style: "large_numbers" },
    { type: "success_story", format: "quote" },
    { type: "call_to_action", button: "View Full Report" }
  ],
  branding: {
    colors: ["#0E2240", "#6FC3DF"],
    inline_css: true, // For email clients
    mobile_responsive: true
  }
};
```

## Multi-Format Export

### Generate All Formats
```javascript
async function export_all_formats(quarter, year) {
  const report_data = await generate_quarterly_report(quarter, year);

  return {
    pdf: await export_pdf({
      report: report_data,
      filename: `HTI_${quarter}_${year}_Report.pdf`,
      template: "ncdit_compliance"
    }),

    excel: await export_excel({
      workbook: {
        sheets: [
          { name: "Summary", data: report_data.metrics },
          { name: "Devices", data: report_data.devices },
          { name: "Training", data: report_data.training }
        ]
      },
      filename: `HTI_${quarter}_${year}_Data.xlsx`
    }),

    csv: await export_csv({
      records: report_data.devices,
      filename: `HTI_${quarter}_${year}_Devices.csv`
    }),

    json: await export_json({
      dataset: report_data,
      filename: `HTI_${quarter}_${year}_Full.json`
    })
  };
}
```

## Cloud Storage Integration

### Upload to Vercel Blob Storage
```javascript
import { put } from '@vercel/blob';

async function export_and_upload(report, filename) {
  const pdf_buffer = await generate_pdf_buffer(report);

  const blob = await put(filename, pdf_buffer, {
    access: 'public',
    contentType: 'application/pdf'
  });

  return {
    url: blob.url,
    filename: filename,
    size: blob.size
  };
}
```

### Upload to S3
```javascript
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

async function export_to_s3(report, filename) {
  const pdf_buffer = await generate_pdf_buffer(report);

  await s3.putObject({
    Bucket: 'hti-reports',
    Key: `quarterly/${filename}`,
    Body: pdf_buffer,
    ContentType: 'application/pdf',
    ACL: 'private'
  }).promise();

  const signed_url = s3.getSignedUrl('getObject', {
    Bucket: 'hti-reports',
    Key: `quarterly/${filename}`,
    Expires: 604800 // 7 days
  });

  return { url: signed_url };
}
```

## Automated Export Workflows

### Quarterly Report Auto-Export
```javascript
// Generate and distribute quarterly reports automatically
cron.schedule('0 8 5 1,4,7,10 *', async () => {
  const quarter = getCurrentQuarter();
  const year = getCurrentYear();

  // Generate all formats
  const exports = await export_all_formats(quarter, year);

  // Upload to cloud storage
  const pdf_url = await export_and_upload(exports.pdf, exports.pdf.filename);

  // Notify stakeholders
  await sendEmail({
    to: "board@hubzonetech.org",
    subject: `${quarter} ${year} Quarterly Report Available`,
    body: `Download: ${pdf_url.url}`
  });

  await sendEmail({
    to: "ncdit-reporting@nc.gov",
    subject: `HTI ${quarter} ${year} Grant Report`,
    body: `Attached quarterly report for review.`,
    attachments: [exports.pdf.filename]
  });
});
```

## Integration Points

- **knack_reporting_sync**: Generate report data for export
- **knack_dashboard_ai**: Render charts and visualizations
- **knack_data_cleaner**: Ensure data quality before export
- **knack_goal_tracker**: Include progress metrics
- **knack_cache_optimizer**: Cache generated reports

## Best Practices

1. **Version exports**: Include timestamp in filename
2. **Test all formats**: Verify output before distribution
3. **Compress large files**: Zip multi-file exports
4. **Secure sensitive data**: Use signed URLs, not public links
5. **Archive exports**: Retain copies of all official reports

## Grant Compliance

### NCDIT Submission Requirements
- PDF for official record
- Excel for data validation
- All files <25MB (portal limit)
- Naming convention: `HTI_Q#_YYYY_Type.ext`
- Retention: 5 years post-grant completion
