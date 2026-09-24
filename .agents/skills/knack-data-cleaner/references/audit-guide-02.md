# Authorized Knack data-quality analysis or cleanup — selected reference

Read only when the entrypoint selects this topic. These are specialized reference details, not independent provider, spending, publishing, production, or memory-write authority. Current task scope, project brand and the entrypoint gates control any imperative recipe below. Examples are not standing authorization. All code/script paths are relative to the skill root unless a link specifies otherwise.

## Core Functions

### deduplicate_records
**Purpose**: Identify and remove/merge duplicate device or donor records

**Detection Strategies**:
- Exact match: Same serial number, donor email, etc.
- Fuzzy match: Similar names, close dates
- Bulk import duplicates: Same acquisition batch

**Example**:
```javascript
const cleaned = await deduplicate_records({
  object_key: "object_1",
  match_fields: ["serial_number", "acquisition_date"],
  strategy: "keep_latest" // or "merge", "keep_first"
});

// Output:
// {
//   original_count: 3520,
//   duplicates_found: 37,
//   final_count: 3483,
//   removed: [
//     { id: "rec_123", reason: "Duplicate serial: ABC123" },
//     // ...
//   ]
// }
```

**Deduplication Strategies**:
```javascript
const strategies = {
  keep_latest: "Retain most recently modified record",
  keep_first: "Keep oldest record (by created_date)",
  merge: "Combine data from all duplicates",
  manual_review: "Flag for human verification"
};
```

### normalize_fields
**Purpose**: Standardize data formats for consistency

**Normalization Rules**:

#### County Names
```javascript
const county_normalizer = {
  "wake": "Wake",
  "WAKE": "Wake",
  "Wake County": "Wake",
  "wake co": "Wake",
  "wake co.": "Wake"
};
```

#### Phone Numbers
```javascript
// (919) 555-1234 → 9195551234
// 919-555-1234 → 9195551234
// 919.555.1234 → 9195551234
const normalizePhone = (phone) => phone.replace(/\D/g, '');
```

#### Emails
```javascript
// Convert to lowercase, trim whitespace
const normalizeEmail = (email) => email.trim().toLowerCase();
```

#### Dates
```javascript
// Standardize to ISO 8601: YYYY-MM-DD
const normalizeDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};
```

#### Device Status
```javascript
const status_normalizer = {
  "acquired": "Acquired",
  "ACQUIRED": "Acquired",
  "received": "Acquired",
  "in progress": "In Progress",
  "ready": "Ready for Donation",
  "delivered": "Presented"
};
```

**Example**:
```javascript
const normalized = await normalize_fields({
  dataset: await fetch_all_pages("object_1"),
  rules: {
    county: county_normalizer,
    phone: normalizePhone,
    email: normalizeEmail,
    date: normalizeDate,
    status: status_normalizer
  }
});
```

### validate_integrity
**Purpose**: Check for logical inconsistencies and data quality issues

**Validation Checks**:

#### Date Logic
```javascript
const date_validations = [
  "acquisition_date < conversion_date",
  "conversion_date < presentation_date",
  "all dates within grant period (2024-2026)",
  "no future dates"
];
```

#### Required Fields
```javascript
const required_by_status = {
  "Acquired": ["donor", "acquisition_date", "quantity"],
  "Converted": ["converted_date", "os_installed", "tested"],
  "Presented": ["recipient", "county", "presentation_date"],
  "Discarded": ["discard_reason", "discard_date"]
};
```

#### Value Ranges
```javascript
const range_validations = {
  quantity: { min: 1, max: 500 },
  training_duration: { min: 0.5, max: 8 },
  participants: { min: 1, max: 100 },
  donation_value: { min: 0, max: 50000 }
};
```

#### Geographic Validation
```javascript
const valid_counties = [
  "Wake", "Durham", "Vance", "Franklin", "Granville",
  "Halifax", "Wilson", "Edgecombe", "Martin", "Hertford",
  "Greene", "Warren", "Northampton", "Person", "Nash"
];

const county_validation = (county) => {
  return valid_counties.includes(county);
};
```

**Example**:
```javascript
const validation_report = await validate_integrity({
  dataset: await fetch_all_pages("object_1"),
  rules: {
    dates: date_validations,
    required: required_by_status,
    ranges: range_validations,
    counties: valid_counties
  }
});

// Output:
// {
//   total_records: 3483,
//   valid: 3401,
//   errors: [
//     { record_id: "rec_123", issue: "Conversion date before acquisition" },
//     { record_id: "rec_456", issue: "Invalid county: 'Raleigh'" },
//     { record_id: "rec_789", issue: "Missing required field: donor" }
//   ],
//   warnings: [
//     { record_id: "rec_234", issue: "Unusually high quantity: 450" }
//   ]
// }
```

### fix_common_issues
**Purpose**: Auto-correct known data entry mistakes

**Auto-Fix Rules**:

#### Trim Whitespace
```javascript
const fix_whitespace = (record) => {
  Object.keys(record).forEach(key => {
    if (typeof record[key] === 'string') {
      record[key] = record[key].trim();
    }
  });
  return record;
};
```

#### Fix Capitalization
```javascript
const fix_capitalization = (record) => {
  if (record.donor_name) {
    record.donor_name = toTitleCase(record.donor_name);
  }
  if (record.county) {
    record.county = county_normalizer[record.county.toLowerCase()] || record.county;
  }
  return record;
};
```

#### Infer Missing Data
```javascript
const infer_missing = (record) => {
  // If county missing but zip code present, infer county
  if (!record.county && record.zip_code) {
    record.county = inferCountyFromZip(record.zip_code);
  }

  // If discard reason missing but status is Discarded, set default
  if (record.status === "Discarded" && !record.discard_reason) {
    record.discard_reason = "Not specified";
  }

  return record;
};
```

**Example**:
```javascript
const fixed = await fix_common_issues({
  dataset: await fetch_all_pages("object_1"),
  auto_fixes: [
    "trim_whitespace",
    "fix_capitalization",
    "infer_missing_counties",
    "standardize_phone_numbers"
  ]
});

// Output:
// {
//   processed: 3483,
//   fixed: 287,
//   fixes_by_type: {
//     whitespace: 145,
//     capitalization: 67,
//     inferred_county: 42,
//     phone_format: 33
//   }
// }
```

### remove_test_records
**Purpose**: Exclude dummy/test data from production reports

**Detection**:
```javascript
const is_test_record = (record) => {
  const test_indicators = [
    record.donor_name?.toLowerCase().includes("test"),
    record.donor_email?.includes("test@"),
    record.donor_email?.includes("example.com"),
    record.serial_number?.startsWith("TEST"),
    record.notes?.toLowerCase().includes("do not count")
  ];

  return test_indicators.some(indicator => indicator === true);
};
```

**Example**:
```javascript
const production_only = await remove_test_records({
  dataset: await fetch_all_pages("object_1")
});

// Output:
// {
//   original: 3483,
//   test_records_removed: 8,
//   production_records: 3475
// }
```

### enrich_records
**Purpose**: Add calculated or derived fields

**Enrichment Operations**:

#### Add Calculated Fields
```javascript
const enrich = (record) => {
  // Add age of device
  record.days_since_acquisition = daysBetween(record.acquisition_date, new Date());

  // Add conversion time
  if (record.converted_date && record.acquisition_date) {
    record.days_to_convert = daysBetween(record.acquisition_date, record.converted_date);
  }

  // Add delivery time
  if (record.presentation_date && record.converted_date) {
    record.days_to_deliver = daysBetween(record.converted_date, record.presentation_date);
  }

  // Flag slow conversions
  record.conversion_delayed = record.days_to_convert > 30;

  return record;
};
```

#### Add Geographic Context
```javascript
const add_region = (record) => {
  const regions = {
    "Triangle": ["Wake", "Durham", "Franklin"],
    "Northeast": ["Vance", "Granville", "Warren", "Halifax"],
    "Eastern": ["Wilson", "Edgecombe", "Martin", "Greene"]
  };

  record.region = Object.keys(regions).find(region =>
    regions[region].includes(record.county)
  ) || "Other";

  return record;
};
```

#### Add Donor Tier
```javascript
const add_donor_tier = (record) => {
  if (record.donation_value > 1000) {
    record.donor_tier = "Major";
  } else if (record.donation_value > 500) {
    record.donor_tier = "Significant";
  } else {
    record.donor_tier = "Standard";
  }
  return record;
};
```
