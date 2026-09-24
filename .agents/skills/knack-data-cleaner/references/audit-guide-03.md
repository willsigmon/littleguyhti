# Authorized Knack data-quality analysis or cleanup — selected reference

Read only when the entrypoint selects this topic. These are specialized reference details, not independent provider, spending, publishing, production, or memory-write authority. Current task scope, project brand and the entrypoint gates control any imperative recipe below. Examples are not standing authorization. All code/script paths are relative to the skill root unless a link specifies otherwise.

## HTI-Specific Cleaning Workflows

### Pre-Quarterly Report Cleaning
```javascript
async function clean_for_quarterly_report(quarter, year) {
  // 1. Fetch quarter data
  const raw_data = await fetch_all_pages("object_1", {
    filters: quarterly_filter(quarter, year)
  });

  // 2. Remove test records
  const production = await remove_test_records({ dataset: raw_data });

  // 3. Deduplicate
  const unique = await deduplicate_records({
    dataset: production.production_records,
    match_fields: ["serial_number"]
  });

  // 4. Normalize
  const normalized = await normalize_fields({
    dataset: unique.records,
    rules: all_normalizers
  });

  // 5. Validate
  const validated = await validate_integrity({
    dataset: normalized,
    rules: compliance_rules
  });

  // 6. Fix auto-fixable issues
  const fixed = await fix_common_issues({
    dataset: validated.valid_records
  });

  return {
    clean_data: fixed,
    cleaning_summary: {
      original: raw_data.length,
      test_removed: production.test_records_removed,
      duplicates: unique.duplicates_found,
      validation_errors: validated.errors.length,
      auto_fixed: fixed.fixed
    }
  };
}
```

### Pre-Dashboard Data Cleaning
```javascript
async function clean_for_dashboard() {
  const all_data = await fetch_all_pages("object_1");

  // Quick cleaning for real-time dashboard
  const cleaned = all_data
    .filter(r => !is_test_record(r))
    .map(fix_whitespace)
    .map(fix_capitalization)
    .map(enrich);

  return cleaned;
}
```

## Data Quality Monitoring

### Generate Data Quality Report
```javascript
async function data_quality_report() {
  const all_records = await fetch_all_pages("object_1");

  const report = {
    total_records: all_records.length,
    completeness: {
      with_donor: all_records.filter(r => r.donor).length,
      with_county: all_records.filter(r => r.county).length,
      with_serial: all_records.filter(r => r.serial_number).length
    },
    accuracy: {
      valid_counties: all_records.filter(r => valid_counties.includes(r.county)).length,
      logical_dates: all_records.filter(r => validate_dates(r)).length
    },
    duplicates: await find_duplicates(all_records),
    test_records: all_records.filter(is_test_record).length
  };

  return report;
}
```

### Automated Quality Checks
```javascript
// Run daily at 2 AM
cron.schedule('0 2 * * *', async () => {
  const report = await data_quality_report();

  if (report.duplicates.length > 10) {
    await alert_admin("High duplicate count detected");
  }

  if (report.accuracy.valid_counties / report.total_records < 0.95) {
    await alert_admin("County data quality below threshold");
  }
});
```

## Integration Points

- **knack_reader**: Fetch data for cleaning
- **knack_pagination**: Process large datasets
- **knack_reporting_sync**: Clean before report generation
- **knack_dashboard_ai**: Ensure metrics accuracy
- **knack_goal_tracker**: Validate progress data
- **knack_filter_sort**: Filter out invalid records

## Best Practices

1. **Clean before every report**: Don't trust raw data
2. **Log all cleaning operations**: Audit trail for compliance
3. **Manual review for ambiguous cases**: Don't auto-fix everything
4. **Run quality checks daily**: Catch issues early
5. **Version cleaned datasets**: Track data lineage

## Grant Compliance

### NCDIT Data Standards
- No test/dummy records in official reports
- All dates must be within grant period
- County assignments must be accurate (15-county requirement)
- Device lifecycle dates must be logical
- Training hours must have supporting documentation

### Audit Trail
```javascript
const cleaning_log = {
  timestamp: new Date(),
  operation: "quarterly_report_cleaning",
  quarter: "Q1",
  year: "2025",
  records_processed: 875,
  issues_found: 23,
  auto_fixed: 18,
  manual_review_needed: 5,
  performed_by: "automated_system"
};
```
