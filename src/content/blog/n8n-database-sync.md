---
title: "n8n Database Sync: ซิงค์ข้อมูลระหว่างหลาย Database อัตโนมัติ Real-time"
meta_title: "n8n Database Synchronization | ซิงค์ Database อัตโนมัติ Real-time"
description: "เรียนรู้การสร้างระบบ Database Sync อัตโนมัติด้วย n8n เชื่อม MySQL, PostgreSQL, MongoDB, Google Sheets, Airtable ซิงค์แบบ real-time หรือ scheduled"
date: 2025-10-23T03:00:00Z
image: "/images/blog-default.svg"
categories: ["n8n", "Database", "Automation"]
author: "AI Unlocked Team"
tags: ["n8n", "database sync", "MySQL", "PostgreSQL", "MongoDB", "automation", "คอร์ส n8n"]
draft: false
---

# n8n Database Sync: ซิงค์ข้อมูลระหว่างหลาย Database อัตโนมัติ Real-time

การซิงค์ข้อมูลระหว่าง databases หลายตัวเป็นความท้าทายสำหรับหลายองค์กร โดยเฉพาะเมื่อใช้ระบบที่แตกต่างกัน เช่น **Production Database**, **Analytics Database**, **CRM**, **Google Sheets** และ **Data Warehouse**

การทำ manual sync หรือเขียน scripts เองใช้เวลามาก มีโอกาส error สูง และยาก maintain

ด้วย **n8n** คุณสามารถสร้างระบบ **Database Synchronization** ที่:
- Sync อัตโนมัติแบบ real-time หรือ scheduled
- รองรับ MySQL, PostgreSQL, MongoDB, Airtable, Google Sheets
- Two-way sync หรือ one-way sync
- Handle conflicts และ errors
- Transform data ระหว่าง sync

บทความนี้จะสอนการสร้าง database sync workflows ที่ใช้งานได้จริง

## สารบัญ

- [ทำไมต้องซิงค์ Database?](#why-sync)
- [Databases ที่ n8n รองรับ](#supported-databases)
- [Sync Strategies](#sync-strategies)
- [Workflow 1: MySQL → PostgreSQL Sync](#mysql-postgres)
- [Workflow 2: MongoDB → Google Sheets](#mongodb-sheets)
- [Workflow 3: Airtable ↔ Database Two-way Sync](#airtable-twoway)
- [Workflow 4: Multi-database ETL Pipeline](#multi-db-etl)
- [Real-time vs Scheduled Sync](#realtime-vs-scheduled)
- [Conflict Resolution](#conflict-resolution)
- [Performance Optimization](#performance)
- [Monitoring & Error Handling](#monitoring)
- [Security Best Practices](#security)
- [กรณีศึกษา: E-commerce Platform](#case-study)
- [FAQ](#faq)
- [สรุป](#conclusion)

## ทำไมต้องซิงค์ Database? {#why-sync}

### Use Cases ทั่วไป

**1. Production → Analytics**
```
MySQL (Production DB)
    ↓ sync
PostgreSQL (Data Warehouse)
    ↓ analyze
BI Tools (Tableau, Metabase)
```

**2. Legacy → Modern System**
```
Old System DB
    ↓ migrate gradually
New Cloud DB
```

**3. Multi-region Sync**
```
DB Asia → DB US → DB Europe
(for low latency access)
```

**4. Data Consolidation**
```
Shopify DB + Salesforce + Google Analytics
    ↓ sync all
Central Data Lake
```

**5. Backup & Disaster Recovery**
```
Primary DB → Backup DB (real-time)
```

### ปัญหาของการไม่ Sync

❌ **Data silos** - ข้อมูลกระจัด กระจาย ไม่เป็นหนึ่งเดียว
❌ **Manual work** - export/import ด้วยมือ ใช้เวลามาก
❌ **Outdated data** - analytics อิงข้อมูลเก่า
❌ **Errors** - manual process มี human errors
❌ **Scalability issues** - ไม่รองรับ data ที่เพิ่มขึ้น

### ประโยชน์ของ Auto Sync

✅ **Real-time data** - ข้อมูลใหม่ล่าสุดเสมอ
✅ **Single source of truth** - ข้อมูลสอดคล้องกันทุกที่
✅ **Save time** - ไม่ต้อง manual sync
✅ **Reliability** - error handling อัตโนมัติ
✅ **Scalability** - รองรับ data โตขึ้นได้

## Databases ที่ n8n รองรับ {#supported-databases}

### SQL Databases

**1. PostgreSQL**
- n8n Node: ✅ Official
- Features: Full CRUD, transactions
- Use case: Data warehouse, modern apps

**2. MySQL/MariaDB**
- n8n Node: ✅ Official
- Features: Full CRUD
- Use case: Web apps, e-commerce

**3. Microsoft SQL Server**
- n8n Node: ✅ Official
- Features: Full support
- Use case: Enterprise apps

**4. SQLite**
- n8n Node: ⚠️ Via HTTP/custom
- Features: Limited
- Use case: Local/embedded apps

### NoSQL Databases

**1. MongoDB**
- n8n Node: ✅ Official
- Features: Full CRUD, aggregation
- Use case: Flexible schema, big data

**2. Redis**
- n8n Node: ✅ Official
- Features: Key-value operations
- Use case: Caching, sessions

**3. Firebase/Firestore**
- n8n Node: ⚠️ Via HTTP
- Features: Real-time updates
- Use case: Mobile apps

### Cloud/Spreadsheet DBs

**1. Google Sheets**
- n8n Node: ✅ Official
- Features: Full CRUD
- Use case: Non-technical users, reporting

**2. Airtable**
- n8n Node: ✅ Official
- Features: Full CRUD, rich data types
- Use case: Flexible databases

**3. Notion**
- n8n Node: ✅ Official
- Features: Database pages
- Use case: Internal wikis, CMS

### Data Warehouses

**1. Snowflake**
- n8n Node: ⚠️ Via HTTP
- Features: SQL queries
- Use case: Big data analytics

**2. BigQuery**
- n8n Node: ✅ Official
- Features: SQL queries, large datasets
- Use case: Google Cloud analytics

**3. Supabase**
- n8n Node: ✅ Official (PostgreSQL-based)
- Features: Full PostgreSQL support
- Use case: Modern apps with real-time

## Sync Strategies {#sync-strategies}

### 1. Full Sync (Simple but Slow)

```javascript
// ทุกครั้งที่ sync → ลบทั้งหมด → insert ใหม่ทั้งหมด

// Pros:
✅ ง่าย มั่นใจว่าข้อมูลถูก
✅ ไม่ต้อง track changes

// Cons:
❌ ช้า (ถ้า data เยอะ)
❌ ไม่เหมาะกับ real-time

// Use case:
- Small datasets (< 10,000 rows)
- Overnight batch sync
```

### 2. Incremental Sync (Efficient)

```javascript
// Sync เฉพาะ records ที่เปลี่ยน (new, updated, deleted)

// Track changes by:
- `updated_at` timestamp
- `version` number
- Database triggers (log changes)

// Pros:
✅ เร็วมาก
✅ เหมาะกับ real-time
✅ ประหยัด resources

// Cons:
⚠️ ซับซ้อนกว่า
⚠️ ต้องมี change tracking

// Use case:
- Large datasets
- Real-time sync
- High-frequency updates
```

### 3. Event-driven Sync (Real-time)

```javascript
// Database trigger → Webhook → n8n → Sync

// Example:
MySQL Trigger on INSERT/UPDATE/DELETE
    ↓
Call Webhook
    ↓
n8n receives webhook
    ↓
Sync to destination DB

// Pros:
✅ Real-time มากสุด
✅ Sync เฉพาะที่เปลี่ยน

// Cons:
❌ ต้องตั้ง triggers ใน source DB
❌ Network dependency

// Use case:
- Critical real-time data
- Low-latency requirements
```

### 4. CDC (Change Data Capture)

```javascript
// อ่าน database transaction logs

// Tools:
- Debezium (for MySQL, PostgreSQL)
- AWS DMS
- Kafka Connect

// Pros:
✅ Real-time without triggers
✅ ไม่กระทบ source DB performance

// Cons:
❌ ซับซ้อน setup
❌ ต้องใช้ external tools

// Use case:
- Enterprise-scale
- Multiple consumers
```

## Workflow 1: MySQL → PostgreSQL Sync {#mysql-postgres}

### Scenario: Sync production MySQL to analytics PostgreSQL

**Architecture:**
```
MySQL (Production)
    ↓ every 5 minutes
n8n Workflow
    ↓ incremental sync
PostgreSQL (Analytics)
```

### Implementation

**1. Schedule Trigger**

```javascript
// Cron: Every 5 minutes
Schedule Trigger:
  Mode: Custom
  Cron Expression: */5 * * * *
```

**2. Get Last Sync Time**

```javascript
// PostgreSQL Node - Get last sync timestamp
Operation: Execute Query
Query:
SELECT MAX(last_sync_at) as last_sync
FROM sync_metadata
WHERE source = 'mysql_products'
```

**3. Query MySQL for New/Updated Records**

```javascript
// MySQL Node
Operation: Execute Query
Query:
SELECT *
FROM products
WHERE updated_at > :lastSync
ORDER BY updated_at ASC
LIMIT 1000

Parameters:
  lastSync: {{ $json.last_sync || '1970-01-01' }}
```

**4. Transform Data (if needed)**

```javascript
// Code Node - Transform MySQL → PostgreSQL format
const items = $input.all();

const transformed = items.map(item => {
  return {
    json: {
      id: item.json.id,
      name: item.json.name,
      // MySQL TINYINT(1) → PostgreSQL BOOLEAN
      is_active: item.json.is_active === 1,
      // MySQL DECIMAL → PostgreSQL NUMERIC
      price: parseFloat(item.json.price),
      // Format datetime
      created_at: new Date(item.json.created_at).toISOString(),
      updated_at: new Date(item.json.updated_at).toISOString()
    }
  };
});

return transformed;
```

**5. Upsert to PostgreSQL**

```javascript
// PostgreSQL Node
Operation: Execute Query
Query:
INSERT INTO products (id, name, is_active, price, created_at, updated_at)
VALUES (:id, :name, :is_active, :price, :created_at, :updated_at)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  is_active = EXCLUDED.is_active,
  price = EXCLUDED.price,
  updated_at = EXCLUDED.updated_at

// Run in batch (1000 rows at a time)
```

**6. Update Sync Metadata**

```javascript
// PostgreSQL Node
Operation: Execute Query
Query:
INSERT INTO sync_metadata (source, last_sync_at, records_synced)
VALUES ('mysql_products', NOW(), :recordCount)

Parameters:
  recordCount: {{ $items().length }}
```

### Handle Deletes

```javascript
// Soft delete strategy:

// MySQL: has `deleted_at` column
SELECT * FROM products WHERE deleted_at IS NOT NULL AND deleted_at > :lastSync

// PostgreSQL: mark as deleted
UPDATE products SET deleted_at = :deleted_at WHERE id = :id

// OR Hard delete:
DELETE FROM products WHERE id = :id
```

## Workflow 2: MongoDB → Google Sheets {#mongodb-sheets}

### Scenario: Sync MongoDB orders to Google Sheets for business users

**1. MongoDB Node - Get New Orders**

```javascript
// MongoDB Node
Operation: Find
Collection: orders
Query:
{
  "created_at": {
    "$gt": "{{ $json.lastSync }}"
  }
}
Limit: 100
Sort: { "created_at": 1 }
```

**2. Transform MongoDB → Sheets Format**

```javascript
// Code Node
const orders = $input.all();

const sheetsData = orders.map(order => {
  return {
    json: {
      'Order ID': order.json._id.toString(),
      'Customer': order.json.customer.name,
      'Email': order.json.customer.email,
      'Total': order.json.total,
      'Status': order.json.status,
      'Items Count': order.json.items.length,
      'Created At': new Date(order.json.created_at).toLocaleString('th-TH'),
      // Flatten nested array
      'Products': order.json.items.map(i => i.name).join(', ')
    }
  };
});

return sheetsData;
```

**3. Append to Google Sheets**

```javascript
// Google Sheets Node
Operation: Append Row
Spreadsheet: Order Dashboard
Sheet: Orders
Data Mode: Define Below

// Map fields:
'Order ID': {{ $json['Order ID'] }}
'Customer': {{ $json.Customer }}
'Email': {{ $json.Email }}
...
```

**4. Alternative: Update if Exists**

```javascript
// For updating existing rows:

// Step 1: Search for existing row
Google Sheets - Lookup
Column: Order ID
Value: {{ $json['Order ID'] }}

// Step 2: IF node
{{ $json.rowNumber !== null }}

// Step 3a: Update existing row
Google Sheets - Update Row
Row Number: {{ $json.rowNumber }}

// Step 3b: Append new row
Google Sheets - Append Row
```

## Workflow 3: Airtable ↔ Database Two-way Sync {#airtable-twoway}

### Scenario: Bi-directional sync between Airtable (used by marketing) and PostgreSQL (used by dev)

**Challenge:** Changes can happen on both sides

### Solution: Last-Write-Wins Strategy

**1. Track Modified Time**

```javascript
// Both databases need:
- id (primary key)
- updated_at (timestamp)
- checksum (optional, for conflict detection)
```

**2. Airtable → PostgreSQL**

```javascript
// Webhook Trigger from Airtable
// (Use Airtable Automation to call webhook on record update)

Webhook Trigger
    ↓
PostgreSQL - Check if record exists
    ↓
IF {{ $json.exists }}
    ↓
  Compare timestamps:
  IF Airtable.updated_at > PostgreSQL.updated_at
      → Update PostgreSQL
  ELSE
      → Skip (PostgreSQL is newer)
ELSE
    → Insert to PostgreSQL
```

**3. PostgreSQL → Airtable**

```javascript
// Schedule Trigger (every 5 min)

Schedule Trigger
    ↓
PostgreSQL - Get records updated in last 5 min
    ↓
For each record:
  Airtable - Search by ID
    ↓
  IF found AND PostgreSQL.updated_at > Airtable.updated_at
      → Update Airtable
  ELSE IF not found
      → Create in Airtable
  ELSE
      → Skip
```

**4. Conflict Detection**

```javascript
// Code Node - Detect conflicts
const conflicts = [];

items.forEach(item => {
  const airtableTime = new Date(item.json.airtable_updated_at);
  const postgresTime = new Date(item.json.postgres_updated_at);
  const timeDiff = Math.abs(airtableTime - postgresTime);

  // If both updated within 1 minute → potential conflict
  if (timeDiff < 60000) {
    conflicts.push({
      id: item.json.id,
      airtable_value: item.json.airtable_value,
      postgres_value: item.json.postgres_value,
      airtable_updated: airtableTime,
      postgres_updated: postgresTime
    });
  }
});

// Alert team if conflicts
if (conflicts.length > 0) {
  sendSlackAlert(`⚠️ ${conflicts.length} sync conflicts detected!`);
}
```

## Workflow 4: Multi-database ETL Pipeline {#multi-db-etl}

### Scenario: Consolidate data from multiple sources to data warehouse

**Sources:**
- MySQL (orders)
- MongoDB (user behavior)
- Google Sheets (marketing campaigns)
- Salesforce (CRM)

**Destination:**
- PostgreSQL Data Warehouse

### ETL Workflow

**Extract:**

```javascript
// Parallel extraction (run all at once)

// MySQL Node - Extract orders
MySQL - SELECT * FROM orders WHERE created_at > :lastSync

// MongoDB Node - Extract events
MongoDB - Find events where timestamp > lastSync

// Google Sheets Node - Get campaigns
Sheets - Read Sheet: Campaigns

// Salesforce Node - Get leads
Salesforce - Get Leads updated since lastSync
```

**Transform:**

```javascript
// Code Node - Standardize format
const standardizeOrders = (mysqlOrders) => {
  return mysqlOrders.map(order => ({
    source: 'mysql',
    type: 'order',
    id: `order_${order.id}`,
    user_id: order.customer_id,
    amount: parseFloat(order.total),
    timestamp: new Date(order.created_at),
    metadata: {
      status: order.status,
      items_count: order.items_count
    }
  }));
};

const standardizeEvents = (mongoEvents) => {
  return mongoEvents.map(event => ({
    source: 'mongodb',
    type: 'event',
    id: `event_${event._id}`,
    user_id: event.userId,
    event_name: event.name,
    timestamp: new Date(event.timestamp),
    metadata: event.properties
  }));
};

// Merge all sources
const allData = [
  ...standardizeOrders($items('mysql')),
  ...standardizeEvents($items('mongodb')),
  ...standardizeCampaigns($items('sheets')),
  ...standardizeLeads($items('salesforce'))
];

return allData;
```

**Load:**

```javascript
// PostgreSQL Node - Bulk insert
Operation: Insert
Table: fact_events

// Use COPY for large datasets (faster than INSERT)
Operation: Execute Query
Query:
COPY fact_events (source, type, id, user_id, amount, timestamp, metadata)
FROM STDIN WITH CSV

// Batch insert (1000 rows at a time)
const batches = chunkArray(allData, 1000);
batches.forEach(batch => insertBatch(batch));
```

**Schedule:**

```
Daily ETL: 2 AM
    ↓
Extract (parallel)
    ↓
Transform
    ↓
Validate data quality
    ↓
Load to warehouse
    ↓
Update materialized views
    ↓
Send success notification
```

## Real-time vs Scheduled Sync {#realtime-vs-scheduled}

### Real-time Sync

**Implementation:**

```javascript
// Option 1: Database Triggers → Webhook
CREATE TRIGGER products_updated
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
  -- Call n8n webhook
  INSERT INTO webhook_queue (url, data)
  VALUES (
    'https://n8n.yourdomain.com/webhook/sync',
    JSON_OBJECT('id', NEW.id, 'action', 'update')
  );
END;

// Option 2: App-level webhook
// In your app code:
afterUpdate('products', (record) => {
  fetch('https://n8n.yourdomain.com/webhook/sync', {
    method: 'POST',
    body: JSON.stringify(record)
  });
});

// Option 3: CDC tools
// Debezium → Kafka → n8n webhook
```

**Pros:**
✅ Latency ต่ำมาก (< 1 วินาที)
✅ Data สดใหม่เสมอ
✅ Efficient (sync เฉพาะที่เปลี่ยน)

**Cons:**
❌ Complex setup
❌ Network dependent
❌ Higher load on source DB

### Scheduled Sync

**Implementation:**

```javascript
// Cron schedules:

// Every 5 minutes
Schedule: */5 * * * *

// Every hour
Schedule: 0 * * * *

// Every night at 2 AM
Schedule: 0 2 * * *

// Every Monday at 6 AM
Schedule: 0 6 * * 1
```

**Pros:**
✅ Simple setup
✅ Predictable load
✅ Easier to debug

**Cons:**
❌ Data latency (ขึ้นกับ schedule)
❌ อาจ sync ข้อมูลซ้ำ (ถ้าไม่มี changes)

### Hybrid Approach (แนะนำ)

```javascript
// Critical data: Real-time
orders, payments → Real-time webhook sync

// Analytics data: Scheduled
user_stats, reports → Hourly sync

// Large datasets: Overnight
full_product_catalog → Daily sync at 2 AM
```

## Conflict Resolution {#conflict-resolution}

### Conflict Scenarios

**1. Same Record Updated on Both Sides**

```javascript
// Example:
// Airtable: Product price = 100 (updated at 10:00:30)
// Database: Product price = 120 (updated at 10:00:35)

// Which one wins?
```

**Strategies:**

**A. Last-Write-Wins**
```javascript
// Compare timestamps, newer wins
if (source1.updated_at > source2.updated_at) {
  use(source1);
} else {
  use(source2);
}

// Pros: Simple
// Cons: May lose changes
```

**B. Source-Priority**
```javascript
// Designated "master" source always wins
if (source === 'database') {
  use(database_value); // Database is master
} else {
  skip();
}

// Pros: Clear ownership
// Cons: One-way sync effectively
```

**C. Manual Resolution**
```javascript
// Detect conflict → Alert human
if (detectConflict()) {
  sendSlackAlert({
    message: 'Conflict detected!',
    record_id: id,
    source1_value: value1,
    source2_value: value2,
    actions: [
      'Use Source 1',
      'Use Source 2',
      'Merge'
    ]
  });

  waitForUserDecision();
}

// Pros: Accurate
// Cons: Slow, manual
```

**D. Field-level Merge**
```javascript
// Merge non-conflicting fields
const merged = {
  id: record.id,
  name: source1.updated_at > source2.updated_at ? source1.name : source2.name,
  price: source1.price_updated_at > source2.price_updated_at ? source1.price : source2.price,
  stock: source1.stock // Always from source1 (master for stock)
};

// Pros: Least data loss
// Cons: Complex logic
```

### Implementation Example

```javascript
// Code Node - Conflict Resolution
const resolveConflict = (source1, source2, strategy = 'last-write-wins') => {
  switch (strategy) {
    case 'last-write-wins':
      return source1.updated_at > source2.updated_at ? source1 : source2;

    case 'source-priority':
      return source1.source === 'master' ? source1 : source2;

    case 'merge':
      return {
        ...source2,
        ...Object.keys(source1).reduce((acc, key) => {
          if (source1[key + '_updated_at'] > source2[key + '_updated_at']) {
            acc[key] = source1[key];
          }
          return acc;
        }, {})
      };

    default:
      throw new Error('Unknown strategy');
  }
};

const result = resolveConflict($items('db')[0], $items('airtable')[0], 'last-write-wins');
return { json: result };
```

## Performance Optimization {#performance}

### 1. Batch Processing

```javascript
// Bad: Sync 1 record at a time
for (const record of records) {
  await db.insert(record); // 10,000 records = 10,000 queries!
}

// Good: Batch insert
const BATCH_SIZE = 1000;
for (let i = 0; i < records.length; i += BATCH_SIZE) {
  const batch = records.slice(i, i + BATCH_SIZE);
  await db.insertMany(batch); // 10,000 records = 10 queries
}
```

**n8n Implementation:**
```javascript
// Split Node
Mode: Split Into Batches
Batch Size: 1000

// Process each batch
Loop → Insert batch → Next batch
```

### 2. Parallel Processing

```javascript
// Split into multiple workflows
// Workflow 1: Sync users (1-10000)
// Workflow 2: Sync users (10001-20000)
// Workflow 3: Sync users (20001-30000)

// Run all in parallel
```

### 3. Incremental Sync

```javascript
// Track last sync time
// Only query new/updated records

SELECT * FROM products
WHERE updated_at > '2025-01-01 10:00:00'
ORDER BY updated_at ASC
LIMIT 1000

// Much faster than full table scan
```

### 4. Indexes

```sql
-- Create indexes on sync columns
CREATE INDEX idx_updated_at ON products(updated_at);
CREATE INDEX idx_id ON products(id);

-- Query will be 10-100x faster
```

### 5. Use COPY (PostgreSQL)

```javascript
// INSERT: ~5,000 rows/sec
// COPY: ~50,000+ rows/sec

// n8n: Use "Execute Query" with COPY command
COPY products (id, name, price)
FROM STDIN WITH (FORMAT CSV)
```

### 6. Connection Pooling

```javascript
// Reuse database connections
// n8n does this automatically

// But limit concurrent connections:
Max Connections: 10 (adjust based on DB capacity)
```

## Monitoring & Error Handling {#monitoring}

### 1. Sync Metadata Table

```sql
CREATE TABLE sync_runs (
  id SERIAL PRIMARY KEY,
  source TEXT,
  destination TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  records_processed INT,
  records_failed INT,
  status TEXT,
  error_message TEXT
);
```

**Log Every Run:**
```javascript
// PostgreSQL Node
INSERT INTO sync_runs (source, destination, started_at, status)
VALUES ('mysql', 'postgres', NOW(), 'running')
RETURNING id

// Store run_id for later updates

// At end:
UPDATE sync_runs
SET completed_at = NOW(),
    records_processed = :count,
    status = 'success'
WHERE id = :run_id
```

### 2. Error Handling

```javascript
// Try-Catch workflow structure

Try:
  → Extract data
  → Transform
  → Load

Catch (Error):
  → Log error to database
  → Send alert (Slack/Email)
  → (Optional) Retry logic

Finally:
  → Update sync metadata
  → Clean up temp data
```

### 3. Alerts & Notifications

```javascript
// Slack Node - Alert on failure
Channel: #data-alerts
Message:
⚠️ Database Sync Failed!

Source: MySQL
Destination: PostgreSQL
Error: {{ $json.error }}
Time: {{ $now }}
Records Processed: {{ $json.recordsProcessed }}

[View Logs] [Retry Sync]
```

### 4. Dashboard

```javascript
// Daily Report to Google Sheets

Sync Summary - {{ $today }}
---
Total Runs: {{ $json.totalRuns }}
Successful: {{ $json.successful }}
Failed: {{ $json.failed }}
Records Synced: {{ $json.totalRecords }}

Top Errors:
1. {{ $json.topErrors[0] }}
2. {{ $json.topErrors[1] }}
```

## Security Best Practices {#security}

### 1. Credentials Management

```javascript
// ✅ DO: Use n8n credentials store
// Encrypted at rest
// Never in workflow JSON

// ❌ DON'T: Hardcode passwords in workflows
password: 'mypassword123' // NEVER!

// ✅ DO:
password: {{ $credentials.mysql.password }}
```

### 2. Read-only Source Accounts

```sql
-- Create read-only user for source DB
CREATE USER 'sync_user'@'%' IDENTIFIED BY 'strong_password';
GRANT SELECT ON database.* TO 'sync_user'@'%';

-- Prevents accidental writes to production
```

### 3. Network Security

```javascript
// Use VPN or SSH tunnel for databases
// Don't expose databases publicly

// n8n Cloud → VPN → Private Database
// Or: SSH tunnel
ssh -L 3306:localhost:3306 user@db-server
```

### 4. Data Masking

```javascript
// Mask sensitive data during sync

// Code Node
const items = $input.all();

items.forEach(item => {
  // Mask email
  item.json.email = maskEmail(item.json.email);
  // user@example.com → u***@e***.com

  // Mask phone
  item.json.phone = maskPhone(item.json.phone);
  // 0812345678 → 081***5678

  // Remove sensitive fields
  delete item.json.password;
  delete item.json.ssn;
});

return items;
```

### 5. Audit Logs

```javascript
// Log all sync operations
INSERT INTO audit_log (
  action,
  source_table,
  record_id,
  user,
  timestamp,
  changes
) VALUES (
  'sync',
  'products',
  123,
  'n8n_sync_user',
  NOW(),
  '{"price": {"old": 100, "new": 120}}'
)
```

## กรณีศึกษา: E-commerce Platform {#case-study}

### บริษัท: Multi-channel E-commerce

**สถานการณ์:**
- ขายบน Shopify, LINE Shopping, Facebook Shop
- ใช้ Airtable จัดการสินค้า (marketing team)
- มี PostgreSQL เป็น main database
- ต้องการ Google Sheets สำหรับ finance team

**ปัญหา:**
- อัพเดทสต็อกด้วยมือในหลายที่
- ข้อมูลไม่ตรงกัน → ขายของหมดสต็อก
- Finance ไม่เห็นยอดขาย real-time

**Solution ด้วย n8n:**

```
                    n8n Central Hub
                          |
        /-----------------+------------------\
        |                 |                  |
   PostgreSQL         Airtable         Google Sheets
   (Master DB)      (Marketing)         (Finance)
        |                                    |
  /-----+-----\                         Shopify
Shopify  LINE                          Dashboard
         Shopping
```

**Workflows:**

**1. Product Sync (Bi-directional)**
```javascript
// Airtable ↔ PostgreSQL
// Real-time via webhooks

Airtable change → n8n webhook
    ↓
Check PostgreSQL
    ↓
If Airtable newer → Update PostgreSQL
    ↓
Sync to Shopify, LINE Shopping

// Reverse:
PostgreSQL change (from app) → Webhook → Update Airtable
```

**2. Stock Sync (Real-time)**
```javascript
// Shopify order → Reduce stock everywhere

Shopify Webhook: Order Created
    ↓
Get product_id, quantity
    ↓
PostgreSQL: UPDATE products SET stock = stock - quantity
    ↓
Airtable: Update stock
    ↓
LINE Shopping API: Update stock
    ↓
Slack: Alert if stock < 10
```

**3. Sales Dashboard (Scheduled)**
```javascript
// Every hour: Sync sales to Google Sheets

Schedule: Every hour
    ↓
PostgreSQL: Get orders from last hour
    ↓
Calculate: revenue, orders count, avg order value
    ↓
Google Sheets: Append row to "Hourly Sales"
    ↓
Finance team sees real-time dashboard
```

**4. Inventory Sync (Nightly)**
```javascript
// 2 AM: Full inventory reconciliation

Schedule: Daily 2 AM
    ↓
Get inventory from:
  - Shopify
  - LINE Shopping
  - PostgreSQL
    ↓
Compare and detect discrepancies
    ↓
Alert if differences > 5%
    ↓
Auto-fix minor discrepancies
    ↓
Generate report
```

**ผลลัพธ์:**

📊 **99.8% stock accuracy** (จาก 85%)
⏱️ **Real-time sync** (จาก manual daily)
💰 **ลด overselling 95%** (จาก 20 cases/เดือน → 1 case/เดือน)
😊 **Customer satisfaction ↑ 30%**
⏱️ **Save 15 ชม./สัปดาห์** (no manual sync)
💵 **ROI: 1,200%** (ลงทุน n8n $20/เดือน, ประหยัด+รายได้เพิ่ม $240/เดือน)

## FAQ {#faq}

### Q1: Real-time sync ได้จริงไหม?

**A:** ได้! แต่ต้อง setup ถูกวิธี

**Options:**
1. **Database Triggers + Webhooks** (latency < 1 วินาที)
2. **CDC tools** (Debezium, latency ~1-5 วินาที)
3. **Polling ทุก 10-30 วินาที** (quasi-real-time)

**แนะนำ:** Triggers + Webhooks สำหรับ critical data

### Q2: Sync database ขนาดใหญ่ได้ไหม?

**A:** ได้ แต่ต้องใช้ strategies:

**< 10,000 rows:** Full sync ได้เลย
**10,000 - 100,000:** Incremental sync
**100,000 - 1M:** Batch + parallel processing
**> 1M:** CDC tools + data partitioning

### Q3: จัดการ schema changes ยังไง?

**A:** Planning + versioning

```javascript
// เมื่อเพิ่มคอลัมน์ใหม่:

1. เพิ่มคอลัมน์ใน destination (allow NULL)
2. อัพเดท n8n workflow (map คอลัมน์ใหม่)
3. Backfill data เก่า (ถ้าต้องการ)
4. เพิ่มคอลัมน์ใน source (หรืออาจทำก่อน)

// เมื่อลบคอลัมน์:
1. หยุด sync คอลัมน์นั้นใน n8n
2. ลบจาก source
3. (Optional) ลบจาก destination ทีหลัง
```

### Q4: Handle data types ต่างกันยังไง?

**A:** Transform ใน Code Node

```javascript
// MySQL → PostgreSQL
// TINYINT(1) → BOOLEAN
is_active: item.json.is_active === 1

// DECIMAL → NUMERIC
price: parseFloat(item.json.price)

// DATETIME → TIMESTAMPTZ
created_at: new Date(item.json.created_at).toISOString()

// JSON string → JSON object
metadata: JSON.parse(item.json.metadata)
```

### Q5: ค่าใช้จ่ายเท่าไหร่?

**n8n Setup:**
```
n8n self-hosted: ฟรี + VPS $10/เดือน
n8n Cloud: $20-50/เดือน
```

**Database costs:**
```
ขึ้นกับ provider:
- Supabase: ฟรี (500MB)
- AWS RDS: ~$15/เดือน (small instance)
- Google Cloud SQL: ~$10/เดือน
- MongoDB Atlas: ฟรี (512MB)
```

**Total:** $10-70/เดือน (depends on setup)

### Q6: ปลอดภัยไหม?

**A:** ปลอดภัย ถ้าทำถูก:

✅ ใช้ read-only credentials สำหรับ source
✅ Encrypt credentials ใน n8n
✅ Use VPN/SSH tunnel
✅ Audit logs
✅ ไม่ sync sensitive data (passwords, etc.)

## สรุป {#conclusion}

Database Sync ด้วย n8n ช่วยให้ข้อมูลอยู่ในสถานะ synchronized ตลอดเวลา ลดงาน manual และ errors

### ข้อดีหลัก

✅ **Real-time or scheduled sync** ตามต้องการ
✅ **รองรับหลาย databases** (SQL, NoSQL, Spreadsheets)
✅ **Flexible** customizable logic
✅ **Cost-effective** ถูกกว่า enterprise ETL tools
✅ **Easy monitoring** tracking + alerts

### เริ่มต้นอย่างไร

1. เลือก sync strategy (real-time/scheduled)
2. Setup n8n + database connections
3. เริ่มจาก simple sync workflow
4. เพิ่ม error handling + monitoring
5. Scale up ตามความต้องการ

### Next Steps

- [Download Sync Workflow Templates](https://example.com)
- [Database Schema Examples](https://example.com)
- [Video Tutorial](https://youtube.com)

---

### บทความที่เกี่ยวข้อง

- [n8n CRM Automation](/blog/n8n-crm-automation/)
- [n8n Email Marketing Automation](/blog/n8n-email-marketing/)
- [Zapier vs n8n vs Make](/blog/zapier-vs-n8n-vs-make/)
- [AI Data Analysis กับ Google Sheets](/blog/ai-data-analysis-spreadsheet/)
- [คอร์ส AI สำหรับผู้เริ่มต้น](/blog/ai-prompt-writing-techniques/)

---

**สนใจเรียนคอร์ส n8n Automation?** เรียนรู้การสร้างระบบ database sync และ automation ที่ช่วยประหยัดเวลา
👉 [ดูคอร์สออนไลน์](https://aiunlock.co/) | [ติดต่อสอบถาม](/contact/)
