---
title: "ตั้งค่า Workflow แรกใน n8n: ต่อ Gmail → Google Sheet → แจ้งเตือนอัตโนมัติ"
meta_title: "สอนตั้งค่า n8n Workflow - Gmail, Google Sheets, Notification | AI Unlocked"
description: "คู่มือสอนวิธีตั้งค่าเวิร์กโฟลว์ n8n แบบ step-by-step เชื่อม Gmail ไปยัง Google Sheets และระบบแจ้งเตือนอัตโนมัติ เหมาะสำหรับผู้เริ่มต้น"
date: 2025-10-15T05:00:00Z
image: "/images/blog-default.svg"
categories: ["n8n", "Automation", "Tutorials"]
author: "วิรุฬห์ เก่งธัญการ"
tags: ["n8n", "Workflow", "Gmail", "Google Sheets", "Automation", "สอน n8n"]
draft: false
---

การทำงานอัตโนมัติด้วย **n8n** เป็นทักษะสำคัญที่ช่วยให้คุณประหยัดเวลาและลดงานซ้ำซ้อนได้อย่างมาก หนึ่งในตัวอย่างเวิร์กโฟลว์ที่ได้รับความนิยมและใช้งานจริงในหลายธุรกิจคือ

**Gmail → Google Sheets → แจ้งเตือนอัตโนมัติ**

เวิร์กโฟลว์นี้ช่วยให้คุณสามารถ:
- รับอีเมลที่สำคัญแล้วบันทึกข้อมูลอัตโนมัติ
- จัดเก็บข้อมูลในสเปรดชีตเพื่อวิเคราะห์
- แจ้งเตือนทีมงานทันทีเมื่อมีข้อมูลใหม่

บทความนี้จะสอนคุณทีละขั้นตอนตั้งแต่การตั้งค่าจนถึงการเปิดใช้งานจริง เหมาะสำหรับผู้เริ่มต้นที่ไม่เคยใช้ n8n มาก่อน

> **เรียนรู้ n8n Automation**
>
> สนใจเรียนรู้ n8n แบบครบวงจร? ดู [คอร์ส n8n Automation](/blog/sorn-n8n-automation) ของเรา

## ภาพรวม Workflow ที่จะสร้าง

### สิ่งที่ Workflow นี้ทำ

```
1. รับอีเมลจาก Gmail (ที่มีคีย์เวิร์ดเฉพาะ)
   ↓
2. ดึงข้อมูลสำคัญจากอีเมล (ผู้ส่ง, หัวข้อ, เนื้อหา)
   ↓
3. บันทึกข้อมูลลง Google Sheets อัตโนมัติ
   ↓
4. ส่งการแจ้งเตือนไปยัง Slack/Line/Telegram
```

### ตัวอย่างการใช้งานจริง

- **ทีมขาย:** รับอีเมลจากลูกค้า → บันทึกลง CRM spreadsheet → แจ้งทีมขาย
- **ฝ่ายสนับสนุน:** รับอีเมลร้องเรียน → บันทึกลงฐานข้อมูล → แจ้งทีมรับเรื่อง
- **ผู้ประกอบการ:** รับการสั่งซื้อ → บันทึกรายการ → แจ้งฝ่ายจัดส่ง

## สิ่งที่ต้องเตรียมก่อนเริ่มต้น

### 1. บัญชีที่จำเป็น

- [ ] **n8n account** - สมัครที่ [n8n.io](https://n8n.io) (มีฟรี)
- [ ] **Gmail account** - อีเมลที่จะติดตามข้อมูล
- [ ] **Google Sheets** - สำหรับเก็บข้อมูล
- [ ] **Slack/Line/Telegram** - สำหรับแจ้งเตือน (เลือกอย่างใดอย่างหนึ่ง)

### 2. ความรู้พื้นฐาน

- รู้วิธีใช้ Gmail
- รู้จัก Google Sheets
- เข้าใจแนวคิดเบื้องต้นของ Automation

ไม่ต้องกังวลถ้ายังไม่เคยใช้ n8n มาก่อน บทความนี้จะอธิบายทีละขั้นตอน

### 3. ติดตั้ง n8n

เลือกวิธีใดวิธีหนึ่ง:

**วิธีที่ 1: ใช้ Cloud (แนะนำสำหรับผู้เริ่มต้น)**
- สมัครที่ n8n.cloud
- เริ่มใช้งานทันที ไม่ต้องติดตั้ง

**วิธีที่ 2: Self-hosted ด้วย Docker**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**วิธีที่ 3: ติดตั้งด้วย npm**
```bash
npm install n8n -g
n8n start
```

> **เปรียบเทียบ n8n กับเครื่องมืออื่น**
>
> สงสัยว่า n8n ต่างจาก Vibe Coding ยังไง? อ่าน [n8n vs Vibe Coding](/blog/n8n-vs-vibe-coding)

## ขั้นตอนที่ 1: เตรียม Google Sheets

### สร้าง Spreadsheet

1. เปิด [Google Sheets](https://sheets.google.com)
2. สร้างสเปรดชีตใหม่ ตั้งชื่อว่า "Email Tracker"
3. สร้างคอลัมน์หัวตารางดังนี้:

| A | B | C | D | E |
|---|---|---|---|---|
| Date | Time | From | Subject | Message |

### เตรียม API Access

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com)
2. สร้าง Project ใหม่
3. เปิดใช้งาน **Google Sheets API**
4. สร้าง OAuth 2.0 credentials
5. เก็บ Client ID และ Client Secret ไว้

## ขั้นตอนที่ 2: สร้าง Workflow ใหม่ใน n8n

### เริ่มต้น Workflow

1. เข้าสู่ระบบ n8n
2. คลิก **Create new workflow**
3. ตั้งชื่อ workflow เช่น "Gmail to Sheets Notification"

### หน้าจอ n8n Workflow

คุณจะเห็น:
- **Canvas** - พื้นที่ออกแบบ workflow
- **Node Panel** - รายการ nodes ที่ใช้ได้
- **Settings** - ตั้งค่า workflow

## ขั้นตอนที่ 3: เพิ่ม Gmail Trigger

### เพิ่ม Node

1. คลิกปุ่ม **+** บน Canvas
2. ค้นหา "Gmail Trigger"
3. เลือก **Gmail Trigger**

### ตั้งค่า Gmail Trigger

#### 3.1 เชื่อมต่อบัญชี Gmail

1. คลิก **Create New Credential**
2. เลือก **OAuth2**
3. ใส่ Client ID และ Client Secret
4. คลิก **Connect my account**
5. อนุญาต n8n เข้าถึง Gmail

#### 3.2 ตั้งค่า Trigger

- **Event:** `Email Received`
- **Filters:**
  - Label: `INBOX` (หรือ label เฉพาะ)
  - Subject contains: `คำสั่งซื้อ` (หรือคีย์เวิร์ดที่ต้องการ)
  - From contains: (ระบุอีเมลหรือโดเมนถ้าต้องการ)

#### 3.3 ทดสอบ

1. คลิก **Listen for event**
2. ส่งอีเมลทดสอบไปยัง Gmail
3. ตรวจสอบว่า n8n รับข้อมูลได้

### ข้อมูลที่ได้จาก Gmail

Gmail Trigger จะให้ข้อมูล:
- `from` - ผู้ส่ง
- `subject` - หัวข้อ
- `textPlain` - เนื้อหา (text)
- `date` - วันที่ส่ง
- `messageId` - ID ของอีเมล

## ขั้นตอนที่ 4: เพิ่ม Google Sheets Node

### เพิ่ม Node

1. คลิกต่อจาก Gmail Trigger
2. ค้นหา "Google Sheets"
3. เลือก **Google Sheets**

### ตั้งค่า Google Sheets Node

#### 4.1 เชื่อมต่อบัญชี

1. คลิก **Create New Credential**
2. เลือก **OAuth2**
3. ใส่ข้อมูล API
4. เชื่อมต่อบัญชี Google

#### 4.2 ตั้งค่าการบันทึกข้อมูล

- **Operation:** `Append`
- **Document:** เลือก "Email Tracker"
- **Sheet:** `Sheet1`
- **Columns:**

```
Date: ={{new Date().toLocaleDateString()}}
Time: ={{new Date().toLocaleTimeString()}}
From: ={{$json["from"]}}
Subject: ={{$json["subject"]}}
Message: ={{$json["textPlain"]}}
```

### อธิบาย Expression

- `={{...}}` - เริ่มต้น expression
- `$json["field"]` - ดึงข้อมูลจาก node ก่อนหน้า
- `new Date()` - วันที่ปัจจุบัน

#### 4.3 ทดสอบ

1. คลิก **Execute Node**
2. ตรวจสอบ Google Sheets
3. ดูว่ามีแถวใหม่เพิ่มหรือไม่

## ขั้นตอนที่ 5: เพิ่มการแจ้งเตือน

### เลือกช่องทางแจ้งเตือน

เลือกตามที่ทีมคุณใช้:

#### ตัวเลือกที่ 1: Slack

**เพิ่ม Slack Node:**
1. เพิ่ม Node "Slack"
2. เชื่อมต่อ Slack Workspace
3. ตั้งค่าข้อความ:

```
มีอีเมลใหม่!

จาก: {{$json["from"]}}
หัวข้อ: {{$json["subject"]}}
เวลา: {{new Date().toLocaleString()}}

ตรวจสอบใน Google Sheets
```

#### ตัวเลือกที่ 2: Line Notify

**เพิ่ม HTTP Request Node:**
1. เพิ่ม "HTTP Request"
2. ตั้งค่า:
   - Method: `POST`
   - URL: `https://notify-api.line.me/api/notify`
   - Authentication: `Header Auth`
   - Token: (Line Notify Token)
   - Body:
     ```json
     {
       "message": "มีอีเมลใหม่จาก {{$json['from']}}"
     }
     ```

#### ตัวเลือกที่ 3: Telegram

**เพิ่ม Telegram Node:**
1. เพิ่ม Node "Telegram"
2. สร้าง Bot Token จาก @BotFather
3. ตั้งค่าข้อความแจ้งเตือน

### ตัวอย่างข้อความแจ้งเตือนที่ดี

```
📧 มีอีเมลใหม่!

👤 จาก: {{$json["from"]}}
📝 หัวข้อ: {{$json["subject"]}}
🕐 เวลา: {{new Date().toLocaleString("th-TH")}}

✅ บันทึกลง Google Sheets แล้ว
🔗 ดูรายละเอียด: [SHEET_URL]
```

## ขั้นตอนที่ 6: เพิ่มเงื่อนไขขั้นสูง (ถ้าต้องการ)

### เพิ่ม IF Node สำหรับกรองข้อมูล

**สถานการณ์:** แจ้งเตือนเฉพาะอีเมลสำคัญ

1. เพิ่ม **IF Node** ระหว่าง Gmail และ Google Sheets
2. ตั้งเงื่อนไข:
   - IF `{{$json["subject"]}}` contains `ด่วน`
   - OR `{{$json["from"]}}` contains `vip@`

### เพิ่ม Function Node สำหรับจัดการข้อมูล

**ตัวอย่าง:** แปลง email เป็นตัวพิมพ์เล็กก่อนบันทึก

```javascript
// items คือข้อมูลที่ผ่านมา
for (const item of items) {
  item.json.from = item.json.from.toLowerCase();
  item.json.subject = item.json.subject.trim();
}

return items;
```

## ขั้นตอนที่ 7: ทดสอบ Workflow แบบสมบูรณ์

### การทดสอบแบบ Manual

1. คลิก **Execute Workflow**
2. ส่งอีเมลทดสอบ
3. ตรวจสอบแต่ละ Node
4. ดู execution log

### การทดสอบแบบ Real-time

1. เปิดใช้งาน workflow (สลับ Active)
2. ส่งอีเมลจริง
3. รอรับการแจ้งเตือน (ประมาณ 1-2 นาที)
4. ตรวจสอบ Google Sheets

### Checklist การทดสอบ

- [ ] Gmail Trigger รับอีเมลได้
- [ ] ข้อมูลถูกบันทึกใน Google Sheets
- [ ] การแจ้งเตือนทำงานปกติ
- [ ] รูปแบบข้อมูลถูกต้อง
- [ ] ไม่มี error ใน execution log

## ขั้นตอนที่ 8: เปิดใช้งานและ Monitor

### เปิดใช้งาน Workflow

1. สลับสวิตช์ **Active** เป็นสีเขียว
2. Workflow จะทำงานอัตโนมัติในเบื้องหลัง

### ตั้งค่าการ Monitor

#### Error Handling

เพิ่ม **Error Trigger** เพื่อจัดการเมื่อเกิด error:

1. เพิ่ม Error Trigger Node
2. เชื่อมต่อกับ Slack/Telegram
3. ส่งการแจ้งเตือนเมื่อ workflow error

#### Execution Log

ตรวจสอบประวัติการทำงาน:
- เปิด **Executions**
- ดู execution history
- ตรวจสอบ error logs

### ตั้งค่าข้อจำกัด (Optional)

เพื่อป้องกัน spam:
- จำกัดจำนวนการ execute ต่อชั่วโมง
- เพิ่ม delay ระหว่าง executions
- ตั้งเวลาทำงาน (เช่น เฉพาะเวลาทำงาน)

## Tips & Best Practices

### 1. การตั้งชื่อ Node

ใช้ชื่อที่บอกความหมายชัดเจน:
- ❌ "Gmail Trigger"
- ✅ "รับอีเมลคำสั่งซื้อ"

### 2. การจัดระเบียบ Workflow

- จัดเรียง nodes ให้อ่านง่าย (ซ้าย → ขวา)
- ใช้สีแบ่งหมวดหมู่
- เพิ่ม Sticky Notes อธิบาย

### 3. การจัดการ Credentials

- ใช้ชื่อ credential ที่ชัดเจน
- อย่าแชร์ credentials
- ใช้ environment variables สำหรับ sensitive data

### 4. Error Handling

- เพิ่ม Error Trigger
- ตั้งค่า retry logic
- Log errors สำหรับ debug

### 5. Performance

- จำกัดข้อมูลที่ดึงจาก Gmail (ใช้ filters)
- ใช้ batch processing สำหรับข้อมูลมาก
- เปิด workflow เฉพาะเมื่อจำเป็น

## Troubleshooting - แก้ปัญหาที่พบบ่อย

### ปัญหาที่ 1: Gmail Trigger ไม่ทำงาน

**สาเหตุ:**
- API credentials ไม่ถูกต้อง
- ไม่อนุญาต permission
- Filters เข้มเกินไป

**วิธีแก้:**
- ตรวจสอบ OAuth settings
- Re-authenticate Gmail
- ลด filters ลง

### ปัญหาที่ 2: ข้อมูลไม่บันทึกใน Google Sheets

**สาเหตุ:**
- Column mapping ผิด
- Sheet name ไม่ตรง
- Permission ไม่เพียงพอ

**วิธีแก้:**
- ตรวจสอบชื่อคอลัมน์
- แชร์ Google Sheets ให้ service account
- ทดสอบ Execute Node

### ปัญหาที่ 3: การแจ้งเตือนไม่ส่ง

**สาเหตุ:**
- Token หมดอายุ
- Chat ID ผิด
- Network issue

**วิธีแก้:**
- Refresh token
- ตรวจสอบ Bot/Channel ID
- ลองส่ง test message

## Workflow ขั้นสูง - ต่อยอด

### 1. เพิ่มการวิเคราะห์ข้อมูล

เพิ่ม Function Node วิเคราะห์เนื้อหา:
- นับจำนวนคำ
- หา keyword สำคัญ
- จำแนกประเภทอีเมล

### 2. สร้าง Auto-Reply

เพิ่ม Gmail Send Node:
- ตอบกลับอัตโนมัติ
- ส่ง confirmation email
- Forward อีเมลสำคัญ

### 3. เชื่อมกับระบบอื่น

เพิ่ม nodes เชื่อมต่อ:
- **Airtable** - เก็บข้อมูลแบบ database
- **Notion** - สร้าง tasks อัตโนมัติ
- **Trello** - สร้าง cards
- **CRM** - อัปเดตข้อมูลลูกค้า

### 4. Machine Learning Integration

ใช้ AI วิเคราะห์:
- Sentiment analysis
- Text classification
- Extract entities

> **เรียนรู้เพิ่มเติม**
>
> สนใจเรียน n8n แบบเจาะลึก? เราสอน[แบบตัวต่อตัวที่เชียงใหม่](/blog/sorn-ai-chiangmai) หรือ [ออนไลน์](/blog/course-ai-online-thai)

## ตัวอย่าง Use Cases อื่นๆ

### 1. ระบบรับคำสั่งซื้อ
```
Gmail (รับคำสั่งซื้อ)
  → Google Sheets (บันทึกรายการ)
  → Slack (แจ้งทีมขาย)
  → Gmail Send (ส่ง confirmation)
```

### 2. Customer Support Ticket
```
Gmail (อีเมลร้องเรียน)
  → IF (ตรวจสอบความสำคัญ)
  → Notion (สร้าง ticket)
  → Telegram (แจ้งทีมด่วน)
```

### 3. Newsletter Tracker
```
Gmail (รับ newsletter)
  → Function (แยก links)
  → Airtable (เก็บ content ideas)
  → Weekly Digest (สรุปส่งทีม)
```

## สรุป

การตั้งค่า **Workflow Gmail → Google Sheets → แจ้งเตือน** ด้วย n8n ช่วยให้:

- ✅ **ประหยัดเวลา** - ไม่ต้องคัดลอกข้อมูลด้วยมือ
- ✅ **ลดข้อผิดพลาด** - ระบบทำงานอัตโนมัติ
- ✅ **เพิ่มประสิทธิภาพ** - ทีมรับแจ้งข้อมูลทันที
- ✅ **มีข้อมูลวิเคราะห์** - บันทึกทุกอย่างใน spreadsheet

### ขั้นตอนสรุป

1. เตรียม Gmail และ Google Sheets
2. สร้าง workflow ใน n8n
3. เพิ่ม Gmail Trigger
4. เชื่อม Google Sheets
5. เพิ่มการแจ้งเตือน
6. ทดสอบและเปิดใช้งาน

### Next Steps

หลังจากเรียนรู้ workflow แรกแล้ว ลองต่อยอด:
- สร้าง workflow อื่นๆ ตามความต้องการ
- เรียนรู้ [Vibe Coding](/blog/vibe-coding-explained) เพื่อสร้าง web app
- เข้า[คอร์ส AI Unlocked](https://aiunlock.co/) เรียนแบบครบวงจร

---

### เรียนรู้เพิ่มเติม

📧 **อีเมล**: aiunlockinnovations@gmail.com
📱 **Facebook**: [AI Unlocked VIP](https://www.facebook.com/aiunlockedvip)
📺 **YouTube**: [AI Unlocked Channel](https://www.youtube.com/@AIUnlocked168)
🎓 **แพลทฟอร์มคอร์ส**: [aiunlock.co](https://aiunlock.co/)

**#n8n #Automation #Workflow #Gmail #GoogleSheets #AIUnlocked**
