---
title: "n8n Invoice Automation ด้วย AI: สร้าง ส่ง และติดตามใบแจ้งหนี้อัตโนมัติ"
meta_title: "n8n Invoice Automation | ระบบใบแจ้งหนี้อัตโนมัติด้วย AI"
description: "เรียนรู้การสร้างระบบ Invoice Automation ด้วย n8n อ่านข้อมูลด้วย AI OCR สร้างใบแจ้งหนี้ ส่งอีเมล ติดตามการชำระเงิน และเตือนอัตโนมัติ"
date: 2025-10-23T06:00:00Z
image: "/images/blog-default.svg"
categories: ["n8n", "Automation", "AI", "Finance"]
author: "AI Unlocked Team"
tags: ["n8n", "invoice automation", "AI OCR", "accounting automation", "payment tracking", "คอร์ส n8n"]
draft: false
---

# n8n Invoice Automation ด้วย AI: สร้าง ส่ง และติดตามใบแจ้งหนี้อัตโนมัติ

การจัดการใบแจ้งหนี้ (Invoice) เป็นงานที่ใช้เวลามากสำหรับธุรกิจทุกขนาด ตั้งแต่การสร้างใบแจ้งหนี้ ส่งให้ลูกค้า ติดตามการชำระเงิน ไปจนถึงการเตือนค้างชำระ

ด้วย **n8n** และ **AI** คุณสามารถสร้างระบบ **Invoice Automation** ที่:
- อ่านข้อมูลจากเอกสาร/อีเมลด้วย AI OCR
- สร้างใบแจ้งหนี้อัตโนมัติ (PDF)
- ส่งอีเมลพร้อมลิงก์ชำระเงิน
- ติดตามสถานะการชำระเงิน
- เตือนอัตโนมัติเมื่อใกล้ครบกำหนดหรือเกินกำหนด
- บันทึกข้อมูลเข้าระบบบัญชี (Xero, QuickBooks)
- Generate รายงานการเงินอัตโนมัติ

บทความนี้จะสอนการสร้าง end-to-end invoice automation system ที่ช่วยประหยัดเวลาและลด errors

## สารบัญ

- [ทำไมต้องทำ Invoice Automation?](#why-automation)
- [เทคโนโลยีและเครื่องมือที่ใช้](#tools)
- [สถาปัตยกรรมระบบ](#architecture)
- [Workflow 1: Create Invoice from Order](#create-invoice)
- [Workflow 2: AI OCR - Extract Invoice Data](#ai-ocr)
- [Workflow 3: Send Invoice & Payment Link](#send-invoice)
- [Workflow 4: Payment Tracking & Reconciliation](#payment-tracking)
- [Workflow 5: Auto Reminder for Overdue](#auto-reminder)
- [Integration กับ Accounting Software](#accounting-integration)
- [Multi-currency & Tax Handling](#multi-currency)
- [Reporting & Analytics](#reporting)
- [Best Practices](#best-practices)
- [กรณีศึกษา: Freelance Agency](#case-study)
- [FAQ](#faq)
- [สรุป](#conclusion)

## ทำไมต้องทำ Invoice Automation? {#why-automation}

### ปัญหาของ Manual Invoicing

1. **Time-consuming** - สร้างใบแจ้งหนี้ทีละใบใช้เวลา 10-30 นาที/ใบ
2. **Human errors** - ผิดพลาดในการคำนวณ, ข้อมูลลูกค้า, ภาษี
3. **Delay** - ส่งใบแจ้งหนี้ช้า → ได้เงินช้า → cashflow ไม่ดี
4. **Manual follow-up** - ต้องเช็คและเตือนลูกค้าด้วยตัวเอง
5. **No visibility** - ไม่รู้ว่าใบไหนจ่ายแล้ว ใบไหนค้าง

### ประโยชน์ของ Automation

✅ **ประหยัดเวลา 90%** (30 นาที → 3 นาที)
✅ **Zero errors** ในการคำนวณและข้อมูล
✅ **Get paid faster** ส่งทันทีเมื่อเสร็จงาน
✅ **Auto follow-up** เตือนอัตโนมัติ ไม่ลืม
✅ **Real-time tracking** รู้สถานะทุกใบตลอดเวลา
✅ **Better cashflow** ได้เงินเร็วขึ้น 30-50%

### ROI Example

**บริษัทที่ส่งใบแจ้งหนี้ 100 ใบ/เดือน:**

```
Manual:
- เวลา: 100 ใบ × 20 นาที = 2,000 นาที (33 ชั่วโมง)
- ค่าแรง: 33 ชม. × 300 บาท/ชม. = 9,900 บาท
- Late payment: ~30% × 7 วันล่าช้าเฉลี่ย = ต้นทุนทางการเงิน

Automated:
- เวลา: 100 ใบ × 2 นาที = 200 นาที (3.3 ชั่วโมง)
- ค่าใช้จ่าย: ~$50/เดือน (~1,700 บาท)
- Late payment: ~10% × 2 วันล่าช้า

ประหยัด: 9,900 - 1,700 = 8,200 บาท/เดือน + better cashflow
```

## เทคโนโลยีและเครื่องมือที่ใช้ {#tools}

### Invoice Generation

**1. PDF Libraries**
- **Puppeteer** (HTML → PDF) ⭐ แนะนำ
- **PDFKit** (programmatic PDF)
- **wkhtmltopdf**
- **Gotenberg** (API-based)

**2. Invoice Templates**
- HTML/CSS templates
- Figma → HTML export
- Ready-made templates (Invoice Generator)

### AI OCR (Optical Character Recognition)

**1. OpenAI GPT-4 Vision** ⭐ แนะนำ
- อ่านรูป invoice ได้ดี
- Extract structured data
- ราคา: $0.01/image

**2. Google Cloud Vision API**
- Document OCR
- Form parsing
- ราคา: $1.50/1,000 images

**3. Tesseract OCR**
- Open source
- ฟรี แต่ accuracy ต่ำกว่า AI

### Payment Gateways

**1. Stripe**
- Payment links
- Invoice API
- Webhooks (payment success)

**2. PayPal**
- Invoice API
- Payment buttons

**3. Omise (Thailand)**
- Payment links
- QR PromptPay
- Webhooks

### Accounting Software

**1. Xero**
- API ครบครัน
- n8n Node: ✅ Official

**2. QuickBooks**
- API available
- n8n Node: ⚠️ Via HTTP

**3. Wave**
- Free accounting software
- API available

**4. Google Sheets**
- Simple alternative
- n8n Node: ✅ Official

### Email & Communication

- **Gmail** (personal/small business)
- **SendGrid** (transactional emails)
- **Mailgun** (developers)
- **LINE Notify** (Thailand)

## สถาปัตยกรรมระบบ {#architecture}

### Complete Invoice Automation Flow

```
Order Completed (Trigger)
    ↓
Create Invoice Data
    ↓
Generate PDF Invoice
    ↓
Upload PDF to Cloud Storage
    ↓
Create Payment Link (Stripe/Omise)
    ↓
Send Email to Customer
    ↓
Track Payment Status
    ↓
[IF Paid]
    → Mark as Paid
    → Send Thank You Email
    → Update Accounting System
    → Generate Receipt
[IF Not Paid After 7 Days]
    → Send Reminder 1
[IF Not Paid After 14 Days]
    → Send Reminder 2
[IF Not Paid After 30 Days]
    → Send Final Notice
    → Flag for Collection
```

### Database Schema

**Invoices Table:**
```sql
CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  invoice_number VARCHAR UNIQUE,
  customer_id INTEGER,
  customer_name VARCHAR,
  customer_email VARCHAR,
  issue_date DATE,
  due_date DATE,
  items JSONB,
  subtotal DECIMAL,
  tax DECIMAL,
  total DECIMAL,
  currency VARCHAR DEFAULT 'THB',
  status VARCHAR, -- draft, sent, paid, overdue, cancelled
  payment_link VARCHAR,
  pdf_url VARCHAR,
  paid_at TIMESTAMP,
  payment_method VARCHAR,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Workflow 1: Create Invoice from Order {#create-invoice}

### Scenario: E-commerce order → Auto generate invoice

**1. Trigger: New Order (Webhook)**

```javascript
// Webhook from Shopify/WooCommerce/Custom app
Webhook Node
Path: /order-completed
Method: POST

// Expected data:
{
  "order_id": "ORD-12345",
  "customer": {
    "name": "นายสมชาย ใจดี",
    "email": "somchai@example.com",
    "phone": "081-234-5678",
    "address": "123 ถ.สุขุมวิท กทม. 10110"
  },
  "items": [
    {
      "name": "คอร์ส AI สำหรับผู้เริ่มต้น",
      "quantity": 1,
      "unit_price": 2990,
      "total": 2990
    }
  ],
  "subtotal": 2990,
  "tax": 209.30, // 7%
  "total": 3199.30,
  "currency": "THB"
}
```

**2. Generate Invoice Number**

```javascript
// Code Node - Generate sequential invoice number
const getNextInvoiceNumber = async () => {
  // Query database for last invoice
  const lastInvoice = await db.query(`
    SELECT invoice_number FROM invoices
    ORDER BY created_at DESC LIMIT 1
  `);

  // Generate new number (format: INV-2025-0001)
  const year = new Date().getFullYear();
  const lastNum = lastInvoice ? parseInt(lastInvoice.split('-')[2]) : 0;
  const nextNum = (lastNum + 1).toString().padStart(4, '0');

  return `INV-${year}-${nextNum}`;
};

const invoiceNumber = await getNextInvoiceNumber();
// Result: "INV-2025-0123"
```

**3. Prepare Invoice Data**

```javascript
// Code Node - Structure invoice data
const invoiceData = {
  invoice_number: $json.invoiceNumber,
  issue_date: new Date().toISOString().split('T')[0],
  due_date: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0], // +30 days

  // Company info
  company: {
    name: 'บริษัท เอไอ อันล็อก อินโนเวชั่น จำกัด',
    address: '123 ถ.ตัวอย่าง จ.เชียงใหม่ 50000',
    tax_id: '0123456789012',
    phone: '053-123456',
    email: 'aiunlockinnovations@gmail.com'
  },

  // Customer info
  customer: {
    name: $json.customer.name,
    email: $json.customer.email,
    phone: $json.customer.phone,
    address: $json.customer.address
  },

  // Line items
  items: $json.items,

  // Totals
  subtotal: $json.subtotal,
  tax: $json.tax,
  tax_rate: 0.07, // 7%
  total: $json.total,
  currency: $json.currency || 'THB',

  // Payment info
  payment_terms: 'Net 30',
  payment_methods: ['Bank Transfer', 'PromptPay', 'Credit Card'],

  // Bank details
  bank_account: {
    bank: 'ธนาคารกสิกรไทย',
    account_name: 'บริษัท เอไอ อันล็อก อินโนเวชั่น จำกัด',
    account_number: '123-4-56789-0',
    promptpay: '0123456789012' // Tax ID
  }
};

return { json: invoiceData };
```

**4. Generate PDF Invoice**

```javascript
// HTTP Request - Gotenberg (HTML to PDF service)
// Or use Puppeteer via Code Node

// Option 1: Gotenberg API
Method: POST
URL: http://gotenberg:3000/forms/chromium/convert/html

Body (Form-Data):
  index.html: {{ $json.htmlTemplate }}

// Option 2: Code Node with Puppeteer
const puppeteer = require('puppeteer');

const generatePDF = async (invoiceData) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // HTML template
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: 'Sarabun', sans-serif; }
      .invoice { max-width: 800px; margin: 0 auto; padding: 40px; }
      .header { border-bottom: 2px solid #6366f1; padding-bottom: 20px; }
      .company-name { font-size: 24px; font-weight: bold; color: #6366f1; }
      table { width: 100%; border-collapse: collapse; margin: 20px 0; }
      th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
      .total { font-size: 20px; font-weight: bold; }
    </style>
  </head>
  <body>
    <div class="invoice">
      <!-- Header -->
      <div class="header">
        <div class="company-name">${invoiceData.company.name}</div>
        <div>${invoiceData.company.address}</div>
        <div>Tax ID: ${invoiceData.company.tax_id}</div>
        <div>Tel: ${invoiceData.company.phone}</div>
      </div>

      <!-- Invoice Info -->
      <div style="margin: 30px 0;">
        <h2>ใบแจ้งหนี้ / Invoice</h2>
        <div>เลขที่: ${invoiceData.invoice_number}</div>
        <div>วันที่: ${invoiceData.issue_date}</div>
        <div>ครบกำหนด: ${invoiceData.due_date}</div>
      </div>

      <!-- Customer Info -->
      <div style="margin: 20px 0;">
        <strong>ลูกค้า / Bill To:</strong><br>
        ${invoiceData.customer.name}<br>
        ${invoiceData.customer.address}<br>
        ${invoiceData.customer.email}<br>
        ${invoiceData.customer.phone}
      </div>

      <!-- Items Table -->
      <table>
        <thead>
          <tr>
            <th>รายการ</th>
            <th>จำนวน</th>
            <th>ราคา/หน่วย</th>
            <th>รวม</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.items.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>${item.unit_price.toLocaleString('th-TH')} บาท</td>
              <td>${item.total.toLocaleString('th-TH')} บาท</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="text-align: right; margin: 20px 0;">
        <div>ยอดรวม: ${invoiceData.subtotal.toLocaleString('th-TH')} บาท</div>
        <div>ภาษี (7%): ${invoiceData.tax.toLocaleString('th-TH')} บาท</div>
        <div class="total">รวมทั้งสิ้น: ${invoiceData.total.toLocaleString('th-TH')} บาท</div>
      </div>

      <!-- Payment Info -->
      <div style="margin: 30px 0; padding: 20px; background: #f5f5f5;">
        <strong>วิธีการชำระเงิน:</strong><br>
        <strong>ธนาคาร:</strong> ${invoiceData.bank_account.bank}<br>
        <strong>ชื่อบัญชี:</strong> ${invoiceData.bank_account.account_name}<br>
        <strong>เลขที่บัญชี:</strong> ${invoiceData.bank_account.account_number}<br>
        <strong>PromptPay:</strong> ${invoiceData.bank_account.promptpay}
      </div>

      <!-- Footer -->
      <div style="margin-top: 40px; text-align: center; color: #666;">
        ขอบคุณที่ใช้บริการ | Thank you for your business
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html);
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true
  });

  await browser.close();
  return pdf;
};

const pdfBuffer = await generatePDF($json.invoiceData);

return {
  json: { fileName: `${$json.invoice_number}.pdf` },
  binary: { data: pdfBuffer }
};
```

**5. Upload PDF to Cloud Storage**

```javascript
// Google Drive Node
Operation: Upload a File
File Name: {{ $json.fileName }}
Binary Data: {{ $binary.data }}
Folder: /Invoices/2025

// Or AWS S3
Operation: Upload
Bucket: company-invoices
Key: invoices/2025/{{ $json.fileName }}
ACL: private

// Get shareable link
```

**6. Save to Database**

```javascript
// PostgreSQL Node
Operation: Insert
Table: invoices

Data:
{
  invoice_number: "{{ $json.invoice_number }}",
  customer_name: "{{ $json.customer.name }}",
  customer_email: "{{ $json.customer.email }}",
  issue_date: "{{ $json.issue_date }}",
  due_date: "{{ $json.due_date }}",
  items: '{{ JSON.stringify($json.items) }}',
  subtotal: {{ $json.subtotal }},
  tax: {{ $json.tax }},
  total: {{ $json.total }},
  currency: "{{ $json.currency }}",
  status: "draft",
  pdf_url: "{{ $json.pdfUrl }}"
}
```

## Workflow 2: AI OCR - Extract Invoice Data {#ai-ocr}

### Scenario: รับ invoice PDF/รูปภาพ → Extract ข้อมูลอัตโนมัติ

**Use case:** บันทึก invoice จากซัพพลายเออร์ลงระบบ

**1. Trigger: Email with Attachment**

```javascript
// Gmail Trigger Node
Operation: Get Emails
Filters:
  - Has attachment: true
  - Subject contains: "Invoice" OR "ใบแจ้งหนี้"
  - From: supplier@example.com
```

**2. Download Attachment**

```javascript
// Gmail Node - Download attachment
// Returns binary data (PDF or image)
```

**3. Convert PDF to Image (if PDF)**

```javascript
// Code Node - pdf-lib or pdf2pic
const { fromPath } = require('pdf2pic');

const options = {
  density: 100,
  saveFilename: 'invoice',
  savePath: '/tmp',
  format: 'png',
  width: 1200,
  height: 1600
};

const convert = fromPath($binary.data, options);
const pageToConvert = 1;
const image = await convert(pageToConvert, { responseType: 'buffer' });

return {
  binary: { data: image }
};
```

**4. AI OCR with GPT-4 Vision**

```javascript
// HTTP Request - OpenAI GPT-4 Vision
Method: POST
URL: https://api.openai.com/v1/chat/completions

Headers:
  Authorization: Bearer {{ $credentials.openai.apiKey }}
  Content-Type: application/json

Body:
{
  "model": "gpt-4-vision-preview",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": `Extract all data from this invoice image and return in JSON format:

{
  "invoice_number": "...",
  "date": "YYYY-MM-DD",
  "due_date": "YYYY-MM-DD",
  "vendor": {
    "name": "...",
    "address": "...",
    "tax_id": "..."
  },
  "customer": {
    "name": "...",
    "address": "..."
  },
  "items": [
    {
      "description": "...",
      "quantity": 0,
      "unit_price": 0,
      "total": 0
    }
  ],
  "subtotal": 0,
  "tax": 0,
  "total": 0,
  "currency": "THB"
}

Extract numbers accurately. If field is unclear, use null.`
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,{{ $binary.data.toString('base64') }}"
          }
        }
      ]
    }
  ],
  "max_tokens": 2000
}

// Response:
{
  "choices": [{
    "message": {
      "content": "{\"invoice_number\": \"INV-001\", ...}"
    }
  }]
}
```

**5. Parse and Validate Data**

```javascript
// Code Node
const extractedData = JSON.parse($json.choices[0].message.content);

// Validate
const validate = (data) => {
  const errors = [];

  if (!data.invoice_number) errors.push('Missing invoice number');
  if (!data.total || data.total <= 0) errors.push('Invalid total');
  if (!data.vendor?.name) errors.push('Missing vendor name');

  return errors;
};

const errors = validate(extractedData);

if (errors.length > 0) {
  // Send for human review
  return {
    json: {
      ...extractedData,
      needsReview: true,
      errors: errors
    }
  };
}

return { json: extractedData };
```

**6. Save to Accounting System**

```javascript
// Xero Node / QuickBooks / Database
Operation: Create Bill
Data: {{ $json }}
```

## Workflow 3: Send Invoice & Payment Link {#send-invoice}

### Create payment link และส่งอีเมลพร้อม invoice

**1. Create Stripe Payment Link**

```javascript
// HTTP Request - Stripe API
Method: POST
URL: https://api.stripe.com/v1/payment_links

Headers:
  Authorization: Bearer {{ $credentials.stripe.secretKey }}
  Content-Type: application/x-www-form-urlencoded

Body (URL-encoded):
  line_items[0][price_data][currency]={{ $json.currency.toLowerCase() }}
  line_items[0][price_data][product_data][name]=Invoice {{ $json.invoice_number }}
  line_items[0][price_data][unit_amount]={{ $json.total * 100 }} // cents
  line_items[0][quantity]=1
  after_completion[type]=redirect
  after_completion[redirect][url]=https://yoursite.com/thank-you
  metadata[invoice_id]={{ $json.invoice_number }}

// Response:
{
  "id": "plink_...",
  "url": "https://buy.stripe.com/..."
}
```

**2. Update Invoice with Payment Link**

```javascript
// PostgreSQL Node
Operation: Update
Table: invoices
Where: invoice_number = {{ $json.invoice_number }}

Set:
  payment_link: "{{ $json.stripe_url }}",
  status: "sent",
  sent_at: NOW()
```

**3. Send Email to Customer**

```javascript
// Gmail Node / SendGrid Node
Operation: Send Email

To: {{ $json.customer.email }}
Subject: ใบแจ้งหนี้ #{{ $json.invoice_number }} จาก AI Unlocked

Body (HTML):
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Sarabun', Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button {
      display: inline-block;
      padding: 15px 30px;
      background: #6366f1;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>สวัสดีครับคุณ {{ $json.customer.name }}</h2>

    <p>ขอบคุณที่ใช้บริการของเรา</p>

    <p>ใบแจ้งหนี้เลขที่ <strong>{{ $json.invoice_number }}</strong> มีรายละเอียดดังนี้:</p>

    <ul>
      <li>วันที่: {{ $json.issue_date }}</li>
      <li>ครบกำหนดชำระ: {{ $json.due_date }}</li>
      <li>จำนวนเงิน: <strong>{{ $json.total.toLocaleString('th-TH') }} บาท</strong></li>
    </ul>

    <p>คุณสามารถชำระเงินได้หลายวิธี:</p>

    <a href="{{ $json.payment_link }}" class="button">
      ชำระเงินออนไลน์ (บัตรเครดิต/QR)
    </a>

    <p>หรือโอนเงินผ่านธนาคาร:</p>
    <ul>
      <li>ธนาคาร: {{ $json.bank.name }}</li>
      <li>เลขที่บัญชี: {{ $json.bank.account_number }}</li>
      <li>PromptPay: {{ $json.bank.promptpay }}</li>
    </ul>

    <p>ใบแจ้งหนี้แนบมาด้วยในอีเมลนี้</p>

    <p>หากมีข้อสงสัย ติดต่อเราได้ที่ aiunlockinnovations@gmail.com</p>

    <p>ขอบคุณครับ<br>
    AI Unlocked Team</p>
  </div>
</body>
</html>

Attachments:
  - {{ $binary.pdfData }} (invoice PDF)
```

## Workflow 4: Payment Tracking & Reconciliation {#payment-tracking}

### ติดตามการชำระเงินอัตโนมัติ

**1. Stripe Webhook - Payment Success**

```javascript
// Webhook Node
Path: /stripe-webhook
Method: POST

// Stripe sends:
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_...",
      "amount_total": 319930, // cents
      "payment_status": "paid",
      "metadata": {
        "invoice_id": "INV-2025-0123"
      }
    }
  }
}
```

**2. Verify Webhook Signature**

```javascript
// Code Node - Verify Stripe signature
const stripe = require('stripe')($credentials.stripe.secretKey);

const sig = $request.headers['stripe-signature'];
const endpointSecret = $credentials.stripe.webhookSecret;

try {
  const event = stripe.webhooks.constructEvent(
    $request.rawBody,
    sig,
    endpointSecret
  );

  return { json: event };
} catch (err) {
  throw new Error('Invalid signature');
}
```

**3. Update Invoice Status**

```javascript
// PostgreSQL Node
Operation: Execute Query

Query:
UPDATE invoices
SET
  status = 'paid',
  paid_at = NOW(),
  payment_method = 'Stripe',
  payment_id = :paymentId
WHERE invoice_number = :invoiceId

Parameters:
  invoiceId: {{ $json.data.object.metadata.invoice_id }}
  paymentId: {{ $json.data.object.id }}
```

**4. Generate Receipt**

```javascript
// Similar to invoice generation
// But with "Receipt" / "ใบเสร็จรับเงิน" template
```

**5. Send Thank You Email + Receipt**

```javascript
// Gmail Node
To: {{ $json.customer.email }}
Subject: ได้รับการชำระเงินแล้ว - ใบเสร็จ #{{ $json.invoice_number }}

Body:
สวัสดีครับคุณ {{ $json.customer.name }},

ขอบคุณที่ชำระเงินค่า {{ $json.items[0].name }}

เราได้รับเงินเรียบร้อยแล้วในวันที่ {{ $json.paid_at }}
จำนวนเงิน: {{ $json.total }} บาท

ใบเสร็จแนบมาในอีเมลนี้

ขอบคุณที่ใช้บริการครับ!

AI Unlocked Team

Attachments:
  - receipt.pdf
```

**6. Update Accounting System**

```javascript
// Xero Node / QuickBooks
Operation: Create Payment
Invoice ID: {{ $json.invoice_id }}
Amount: {{ $json.total }}
Date: {{ $json.paid_at }}
Account: {{ $json.bank_account }}
```

## Workflow 5: Auto Reminder for Overdue {#auto-reminder}

### เตือนอัตโนมัติเมื่อค้างชำระ

**1. Schedule Trigger - Daily Check**

```javascript
// Schedule Node
Cron: 0 9 * * * // ทุกวัน 9:00 AM
```

**2. Query Unpaid Invoices**

```javascript
// PostgreSQL Node
Operation: Execute Query

Query:
SELECT *
FROM invoices
WHERE status IN ('sent', 'overdue')
  AND due_date IS NOT NULL
ORDER BY due_date ASC
```

**3. Classify by Days Overdue**

```javascript
// Code Node
const now = new Date();

const classified = $input.all().map(invoice => {
  const dueDate = new Date(invoice.json.due_date);
  const daysUntilDue = Math.ceil((dueDate - now) / (1000*60*60*24));

  let reminderType;
  if (daysUntilDue === 3) {
    reminderType = 'approaching'; // 3 วันก่อนครบกำหนด
  } else if (daysUntilDue === 0) {
    reminderType = 'due_today'; // ครบกำหนดวันนี้
  } else if (daysUntilDue < 0 && daysUntilDue >= -7) {
    reminderType = 'overdue_7'; // เกิน 1-7 วัน
  } else if (daysUntilDue < -7 && daysUntilDue >= -14) {
    reminderType = 'overdue_14'; // เกิน 7-14 วัน
  } else if (daysUntilDue < -14) {
    reminderType = 'overdue_30'; // เกิน 14+ วัน
  }

  return {
    json: {
      ...invoice.json,
      days_until_due: daysUntilDue,
      reminder_type: reminderType
    }
  };
});

return classified.filter(i => i.json.reminder_type);
```

**4. Switch Node - Route by Reminder Type**

```javascript
// Switch Node
Output 1: {{ $json.reminder_type === 'approaching' }}
Output 2: {{ $json.reminder_type === 'due_today' }}
Output 3: {{ $json.reminder_type === 'overdue_7' }}
Output 4: {{ $json.reminder_type === 'overdue_14' }}
Output 5: {{ $json.reminder_type === 'overdue_30' }}
```

**5. Send Appropriate Reminder**

**Reminder 1 (Approaching):**
```
Subject: เตือน: ใบแจ้งหนี้ #{{ invoice_number }} ใกล้ครบกำหนดชำระ

สวัสดีครับคุณ {{ customer_name }},

เตือนว่าใบแจ้งหนี้ #{{ invoice_number }} จะครบกำหนดชำระใน 3 วัน ({{ due_date }})

จำนวนเงิน: {{ total }} บาท

[ชำระเงินเลย]

ขอบคุณครับ
```

**Reminder 2 (7 Days Overdue):**
```
Subject: แจ้งเตือน: ใบแจ้งหนี้ #{{ invoice_number }} เกินกำหนดชำระ

สวัสดีครับคุณ {{ customer_name }},

ใบแจ้งหนี้ #{{ invoice_number }} เกินกำหนดชำระแล้ว {{ days_overdue }} วัน

จำนวนเงิน: {{ total }} บาท
ครบกำหนด: {{ due_date }}

กรุณาชำระภายใน 7 วัน เพื่อหลีกเลี่ยงค่าปรับ

[ชำระเงินเลย]

หากชำระแล้ว กรุณาแจ้งกลับด้วยครับ
```

**Reminder 3 (14+ Days Overdue):**
```
Subject: ⚠️ Final Notice: ใบแจ้งหนี้ #{{ invoice_number }}

คุณ {{ customer_name }},

ใบแจ้งหนี้ #{{ invoice_number }} เกินกำหนดชำระแล้ว {{ days_overdue }} วัน

จำนวนเงิน: {{ total }} บาท + ค่าปรับล่าช้า {{ late_fee }} บาท
รวมทั้งสิ้น: {{ total_with_fee }} บาท

กรุณาชำระภายใน 3 วัน มิฉะนั้นจะส่งเรื่องให้ทีมจัดเก็บ

สอบถามเพิ่มเติม: {{ contact_phone }}

[ชำระเงินทันที]
```

**6. Update Invoice Status**

```javascript
// PostgreSQL Node
UPDATE invoices
SET status = 'overdue'
WHERE invoice_number = :invoiceNumber AND status != 'overdue'
```

**7. Alert Internal Team**

```javascript
// Slack Node - Alert finance team
Channel: #accounts-receivable

Message:
⚠️ Overdue Invoices Summary

Total overdue: {{ $json.count }}
Total amount: {{ $json.totalAmount }} บาท

Critical (> 30 days): {{ $json.critical }}
- {{ $json.criticalInvoices.map(i => `#${i.invoice_number} - ${i.customer_name} - ${i.total} บาท`).join('\n- ') }}

[View Full Report]
```

## Integration กับ Accounting Software {#accounting-integration}

### Xero Integration

**1. Create Invoice in Xero**

```javascript
// Xero Node (n8n official)
Operation: Create Invoice

Data:
{
  "Type": "ACCREC", // Accounts Receivable
  "Contact": {
    "ContactID": "{{ $json.xero_contact_id }}" // or create new
  },
  "Date": "{{ $json.issue_date }}",
  "DueDate": "{{ $json.due_date }}",
  "InvoiceNumber": "{{ $json.invoice_number }}",
  "LineItems": [
    {{#each items}}
    {
      "Description": "{{ this.name }}",
      "Quantity": {{ this.quantity }},
      "UnitAmount": {{ this.unit_price }},
      "TaxType": "OUTPUT" // 7% VAT
    }
    {{/each}}
  ],
  "Status": "SUBMITTED"
}
```

**2. Record Payment in Xero**

```javascript
// When payment received
Xero Node
Operation: Create Payment

Data:
{
  "Invoice": {
    "InvoiceID": "{{ $json.xero_invoice_id }}"
  },
  "Account": {
    "Code": "200" // Bank account
  },
  "Amount": {{ $json.total }},
  "Date": "{{ $json.paid_at }}"
}
```

### QuickBooks Integration

```javascript
// HTTP Request - QuickBooks API
Method: POST
URL: https://quickbooks.api.intuit.com/v3/company/{{ COMPANY_ID }}/invoice

Headers:
  Authorization: Bearer {{ $credentials.quickbooks.token }}
  Content-Type: application/json

Body:
{
  "CustomerRef": {
    "value": "{{ $json.customer_id }}"
  },
  "Line": [
    {
      "Amount": {{ $json.total }},
      "DetailType": "SalesItemLineDetail",
      "SalesItemLineDetail": {
        "ItemRef": {
          "value": "{{ $json.item_id }}"
        },
        "Qty": {{ $json.quantity }}
      }
    }
  ]
}
```

## Multi-currency & Tax Handling {#multi-currency}

### Multi-currency Support

**1. Exchange Rate Lookup**

```javascript
// HTTP Request - ExchangeRate-API
Method: GET
URL: https://api.exchangerate-api.com/v4/latest/{{ $json.base_currency }}

// Response:
{
  "base": "THB",
  "rates": {
    "USD": 0.029,
    "EUR": 0.026,
    "JPY": 4.2
  }
}
```

**2. Convert Amount**

```javascript
// Code Node
const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
  if (fromCurrency === toCurrency) return amount;

  // Convert to base currency first (THB)
  const inBaseCurrency = fromCurrency === 'THB'
    ? amount
    : amount / rates[fromCurrency];

  // Convert to target currency
  const converted = toCurrency === 'THB'
    ? inBaseCurrency
    : inBaseCurrency * rates[toCurrency];

  return Math.round(converted * 100) / 100; // 2 decimals
};

$json.amount_usd = convertCurrency($json.amount_thb, 'THB', 'USD', $json.rates);
```

**3. Display Multiple Currencies**

```html
<!-- In invoice template -->
<div class="totals">
  <div>Total: {{ total_thb }} THB</div>
  <div style="color: #666;">
    (approximately ${{ total_usd }} USD)
  </div>
</div>
```

### Tax Calculation

**1. Thailand VAT (7%)**

```javascript
// Code Node
const calculateThaiVAT = (subtotal) => {
  const VAT_RATE = 0.07;
  const vat = Math.round(subtotal * VAT_RATE * 100) / 100;
  const total = subtotal + vat;

  return {
    subtotal,
    vat,
    total,
    vat_rate: VAT_RATE
  };
};

const amounts = calculateThaiVAT($json.subtotal);
```

**2. Withholding Tax (3% for services)**

```javascript
// Code Node
const calculateWithholdingTax = (subtotal) => {
  const WHT_RATE = 0.03; // 3% for professional services
  const wht = Math.round(subtotal * WHT_RATE * 100) / 100;
  const netPayable = subtotal - wht;

  return {
    subtotal,
    wht,
    net_payable: netPayable,
    wht_rate: WHT_RATE
  };
};
```

**3. Multiple Tax Types**

```javascript
// Support different tax scenarios
const taxScenarios = {
  'standard_vat': { vat: 0.07, wht: 0 },
  'service_wht': { vat: 0.07, wht: 0.03 },
  'exempt': { vat: 0, wht: 0 },
  'zero_rated': { vat: 0, wht: 0 }
};

const calculateTax = (subtotal, scenario) => {
  const taxes = taxScenarios[scenario];
  const vat = subtotal * taxes.vat;
  const wht = subtotal * taxes.wht;
  const total = subtotal + vat - wht;

  return { subtotal, vat, wht, total };
};
```

## Reporting & Analytics {#reporting}

### Monthly Revenue Report

**1. Aggregate Invoice Data**

```javascript
// Schedule: 1st of month
// PostgreSQL Query
SELECT
  DATE_TRUNC('month', issue_date) as month,
  COUNT(*) as total_invoices,
  SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as paid_count,
  SUM(CASE WHEN status = 'overdue' THEN 1 ELSE 0 END) as overdue_count,
  SUM(total) as total_billed,
  SUM(CASE WHEN status = 'paid' THEN total ELSE 0 END) as total_collected,
  AVG(EXTRACT(DAY FROM (paid_at - issue_date))) as avg_days_to_payment
FROM invoices
WHERE issue_date >= DATE_TRUNC('month', NOW() - INTERVAL '1 month')
  AND issue_date < DATE_TRUNC('month', NOW())
GROUP BY DATE_TRUNC('month', issue_date)
```

**2. Aging Report (AR Aging)**

```javascript
// Code Node - Accounts Receivable Aging
const now = new Date();

const agingBuckets = {
  'current': [], // 0-30 days
  '31_60': [],
  '61_90': [],
  'over_90': []
};

unpaidInvoices.forEach(invoice => {
  const daysOutstanding = Math.floor((now - new Date(invoice.issue_date)) / (1000*60*60*24));

  if (daysOutstanding <= 30) agingBuckets.current.push(invoice);
  else if (daysOutstanding <= 60) agingBuckets['31_60'].push(invoice);
  else if (daysOutstanding <= 90) agingBuckets['61_90'].push(invoice);
  else agingBuckets.over_90.push(invoice);
});

const report = {
  current: { count: agingBuckets.current.length, amount: sum(agingBuckets.current) },
  days_31_60: { count: agingBuckets['31_60'].length, amount: sum(agingBuckets['31_60']) },
  days_61_90: { count: agingBuckets['61_90'].length, amount: sum(agingBuckets['61_90']) },
  over_90: { count: agingBuckets.over_90.length, amount: sum(agingBuckets.over_90) }
};
```

**3. Send Report Email**

```javascript
// Gmail Node
To: finance@company.com
Subject: Monthly Invoice Report - {{ $json.month }}

Body:
<h2>Invoice Summary - {{ month }}</h2>

<table>
  <tr>
    <td>Total Invoices Issued:</td>
    <td>{{ total_invoices }}</td>
  </tr>
  <tr>
    <td>Total Billed:</td>
    <td>{{ total_billed }} THB</td>
  </tr>
  <tr>
    <td>Total Collected:</td>
    <td>{{ total_collected }} THB</td>
  </tr>
  <tr>
    <td>Collection Rate:</td>
    <td>{{ (total_collected / total_billed * 100).toFixed(1) }}%</td>
  </tr>
  <tr>
    <td>Avg Days to Payment:</td>
    <td>{{ avg_days_to_payment.toFixed(1) }} days</td>
  </tr>
</table>

<h3>AR Aging</h3>
<table>
  <tr><th>Bucket</th><th>Count</th><th>Amount</th></tr>
  <tr><td>0-30 days</td><td>{{ current.count }}</td><td>{{ current.amount }} THB</td></tr>
  <tr><td>31-60 days</td><td>{{ days_31_60.count }}</td><td>{{ days_31_60.amount }} THB</td></tr>
  <tr><td>61-90 days</td><td>{{ days_61_90.count }}</td><td>{{ days_61_90.amount }} THB</td></tr>
  <tr><td>Over 90 days</td><td>{{ over_90.count }}</td><td>{{ over_90.amount }} THB</td></tr>
</table>

[View Dashboard]
```

## Best Practices {#best-practices}

### 1. Invoice Numbering

```javascript
// Sequential numbering with prefix
Format: INV-YYYY-####

Examples:
- INV-2025-0001
- INV-2025-0002
- ...

// Never skip numbers
// Never reuse numbers
// Include year for easy filtering
```

### 2. Error Handling

```javascript
// Try-catch for critical operations

try {
  const pdf = await generatePDF(invoiceData);
  const uploaded = await uploadToStorage(pdf);
  await sendEmail(customer, uploaded.url);
  await updateDatabase(invoiceId, 'sent');
} catch (error) {
  // Log error
  await logError(invoiceId, error);

  // Alert team
  await sendSlackAlert(`Invoice ${invoiceId} failed: ${error.message}`);

  // Set status
  await updateDatabase(invoiceId, 'error');
}
```

### 3. Audit Trail

```javascript
// Log all actions
CREATE TABLE invoice_audit_log (
  id SERIAL PRIMARY KEY,
  invoice_id INTEGER,
  action VARCHAR, -- created, sent, paid, reminded, cancelled
  user_id INTEGER,
  timestamp TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

// Log every change
INSERT INTO invoice_audit_log (invoice_id, action, metadata)
VALUES ($1, 'sent', '{"recipient": "customer@example.com"}');
```

### 4. Backup PDFs

```javascript
// Always keep PDF backups
// Even after payment, keep for 7 years (tax requirement)

// Store in multiple places:
1. Cloud storage (S3/GCS) - primary
2. Google Drive - backup
3. Local backups - disaster recovery
```

### 5. Security

```javascript
// Protect sensitive data

// 1. Encrypt PDF links (signed URLs)
const signedUrl = storage.getSignedUrl({
  action: 'read',
  expires: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
});

// 2. Don't expose invoice IDs in URLs
// Use UUIDs instead
const accessToken = generateUUID();

// 3. Rate limit payment links
// Prevent brute force

// 4. Log all access
```

## กรณีศึกษา: Freelance Agency {#case-study}

### Agency: Web Development Freelancers

**ปัญหา:**
- ส่งใบแจ้งหนี้ล่าช้า 7-14 วัน
- ใช้เวลา 30-45 นาที/ใบ
- ลืม follow up ลูกค้าค้างชำระ
- Cash flow ไม่ดี (รอเงิน 45-60 วัน)

**Solution ด้วย n8n:**

**Workflow Setup:**

```
1. Project Completion
    ↓
2. Auto-generate invoice (5 min after completion)
    ↓
3. Send email + payment link
    ↓
4. Track payment (Stripe webhook)
    ↓
5. Auto reminders (Day 25, 30, 35)
    ↓
6. Update Xero accounting
```

**Implementation:**

**Trigger:** Notion database
- When project status → "Completed"
- Auto extract: client info, hours worked, hourly rate

**Auto-calculate:**
```javascript
// Hours worked × Rate
Subtotal: 40 hours × $50/hr = $2,000
Tax (7%): $140
Total: $2,140
```

**Generate & Send (< 5 min):**
- PDF created
- Email sent with Stripe payment link
- Client can pay immediately

**Payment tracking:**
- Stripe webhook → mark as paid
- Auto-thank you email
- Xero invoice updated

**Results:**

**Before Automation:**
- Invoice delay: 7-14 days
- Time per invoice: 30 min
- Payment delay: 45 days avg
- Follow-up rate: 40%

**After Automation:**
- Invoice delay: < 1 hour (95% improvement)
- Time per invoice: 3 min (90% less)
- Payment delay: 18 days avg (60% faster)
- Follow-up rate: 100%

**Financial Impact:**

```
Monthly invoices: 50
Time saved: 50 × 27 min = 1,350 min (22.5 hrs)
Value: 22.5 hrs × $50/hr = $1,125/month

Faster payment:
- Get paid 27 days earlier
- Average invoice: $2,000
- Interest saved: ~$50/invoice × 50 = $2,500/month

Total benefit: ~$3,625/month
Investment: $50/month (n8n + APIs)
ROI: 7,150%
```

## FAQ {#faq}

### Q1: ต้องมี accounting knowledge ไหม?

**A:** พื้นฐานก็พอ

**ควรรู้:**
- Invoice vs Receipt
- Tax types (VAT, WHT)
- Payment terms (Net 30, etc.)

**ไม่จำเป็นต้องรู้:**
- Double-entry bookkeeping
- Advanced accounting

### Q2: PDF generation ช้าไหม?

**A:** เร็วมาก (< 5 วินาที)

**Options:**
- **Puppeteer**: 2-5 วินาที/ใบ
- **Gotenberg**: 1-2 วินาที/ใบ
- **PDFKit**: < 1 วินาที (แต่ต้อง code มากกว่า)

### Q3: AI OCR แม่นยำแค่ไหน?

**A:** 90-95% ถูกต้อง

**GPT-4 Vision:**
- อ่านได้ทั้งไทยและอังกฤษ
- เข้าใจ layout ของ invoice
- Extract structured data ได้ดี

**Tips:**
- ใช้รูป/PDF คุณภาพสูง
- Validate ข้อมูลหลัง extract
- Human review สำหรับจำนวนเงินเยอะ

### Q4: ราคาเท่าไหร่?

**Setup พื้นฐาน:**
```
n8n self-hosted: ฟรี + VPS $10
Stripe: 2.95% + $0.30 per transaction
OpenAI API: ~$0.01/invoice (OCR)
SendGrid: ฟรี (100 emails/day)
Total: ~$10 + % of sales
```

**vs Manual:**
- ประหยัดเวลา 90%
- Get paid 30-60% เร็วขึ้น
- ลด errors → ลดค่าใช้จ่าย

### Q5: ปลอดภัยไหม?

**A:** ปลอดภัย ถ้าทำถูกวิธี

**Best practices:**
- ใช้ HTTPS สำหรับ webhooks
- Encrypt PDFs (password-protected)
- Signed URLs (expire after 7 days)
- Log all access
- Backup data regularly

### Q6: Support หลายสกุลเงินได้ไหม?

**A:** ได้!

**Implementation:**
- Store in base currency (THB)
- Convert on-the-fly (exchange rate API)
- Display multiple currencies in invoice
- Stripe supports 135+ currencies

## สรุป {#conclusion}

Invoice Automation ด้วย n8n + AI ช่วยประหยัดเวลา ลด errors และทำให้ได้เงินเร็วขึ้น

### ข้อดีหลัก

✅ **ประหยัดเวลา 90%** สร้าง-ส่งใบแจ้งหนี้อัตโนมัติ
✅ **Zero errors** คำนวณถูกต้อง 100%
✅ **Get paid faster** ลูกค้าชำระเงินเร็วขึ้น 30-60%
✅ **Never miss follow-up** เตือนอัตโนมัติ
✅ **Real-time visibility** รู้สถานะทุกใบตลอดเวลา
✅ **AI-powered** OCR extract data, auto-categorize

### เริ่มต้นอย่างไร

1. Setup n8n + payment gateway (Stripe/Omise)
2. สร้าง invoice template (HTML/CSS)
3. Build basic workflow (create → send → track)
4. เพิ่ม auto reminders
5. Integrate accounting software
6. Scale up!

---

### บทความที่เกี่ยวข้อง

- [n8n CRM Automation](/blog/n8n-crm-automation/)
- [n8n Email Marketing Automation](/blog/n8n-email-marketing/)
- [AI Data Analysis กับ Google Sheets](/blog/ai-data-analysis-spreadsheet/)
- [n8n Database Sync](/blog/n8n-database-sync/)
- [คอร์ส AI สำหรับผู้เริ่มต้น](/blog/ai-prompt-writing-techniques/)

---

**สนใจเรียนคอร์ส n8n Automation?** เรียนรู้การสร้างระบบ invoice automation และระบบอัตโนมัติอื่นๆ ที่ช่วยประหยัดเวลาและเพิ่มรายได้
👉 [ดูคอร์สออนไลน์](https://aiunlock.co/) | [ติดต่อสอบถาม](/contact/)
