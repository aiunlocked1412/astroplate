---
title: "สร้าง Chatbot ด้วย n8n: เชื่อมต่อ LINE และ Facebook"
meta_title: "สร้าง Chatbot n8n เชื่อมต่อ LINE Facebook 2025"
description: "คู่มือสร้าง Chatbot ด้วย n8n เชื่อมต่อ LINE Official Account และ Facebook Messenger พร้อม AI ตอบกลับอัตโนมัติ"
date: 2025-10-22T19:00:00Z
image: "/images/blog-default.svg"
categories: ["n8n", "Automation", "Chatbot"]
author: "AI Unlocked Team"
tags: ["n8n chatbot", "LINE bot", "Facebook Messenger", "n8n automation", "AI chatbot", "คอร์ส n8n"]
draft: false
---

# สร้าง Chatbot ด้วย n8n: เชื่อมต่อ LINE และ Facebook

**Chatbot** เป็นเครื่องมือสำคัญสำหรับธุรกิจยุคใหม่ ด้วย **n8n** คุณสามารถสร้าง chatbot ที่เชื่อมต่อ LINE และ Facebook พร้อม AI ตอบกลับอัตโนมัติได้ง่ายๆ โดยไม่ต้องเขียนโค้ด

## ทำไมต้องมี Chatbot?

### ประโยชน์สำหรับธุรกิจ

**1. ตอบลูกค้า 24/7**
- ไม่ต้องมีคนคอยตอบ
- ตอบได้ทันที
- ไม่พลาดลูกค้า

**2. ประหยัดค่าใช้จ่าย**
- ลดพนักงาน customer service
- Automate FAQs
- Scale ได้ไม่จำกัด

**3. เพิ่มยอดขาย**
- แนะนำสินค้า
- ส่ง promotion
- Follow up อัตโนมัติ

**4. รวบรวมข้อมูลลูกค้า**
- Collect leads
- Survey feedback
- Analytics

อ่านเพิ่มเติม: [n8n Automation Introduction](/blog/n8n-automation-introduction/)

## เครื่องมือที่ต้องใช้

### 1. n8n (Workflow Automation)
- **Self-hosted:** ติดตั้งเองฟรี
- **Cloud:** $20-50/เดือน
- **จุดเด่น:** Flexible, powerful, open source

### 2. LINE Official Account
- **Free plan:** 500 messages/เดือน
- **Light plan:** 290 บาท/เดือน (15,000 messages)
- **Standard plan:** 2,190 บาท/เดือน (45,000 messages)

### 3. Facebook Page + Messenger
- **ฟรี:** ไม่จำกัดข้อความ
- **Requirements:** Facebook Page, Developer Account

### 4. OpenAI API (สำหรับ AI)
- **GPT-3.5:** ~$0.0015/1K tokens
- **GPT-4:** ~$0.03/1K tokens

## Architecture Overview

```
User Message
    ↓
LINE/Facebook
    ↓
n8n Webhook
    ↓
Process Message
    ↓
OpenAI API (Optional)
    ↓
Generate Response
    ↓
Send Reply
    ↓
LINE/Facebook
    ↓
User receives message
```

อ่านเพิ่มเติม: [สอน n8n Complete Guide](/blog/sorn-n8n-complete-guide/)

## Part 1: LINE Chatbot

### Step 1: Setup LINE Official Account

**1. Create LINE Official Account**
```
1. ไปที่ https://manager.line.biz/
2. Sign up / Login
3. Create account
   - Account name: [ชื่อบอท]
   - Category: [ประเภทธุรกิจ]
```

**2. Get Channel Access Token**
```
1. LINE Official Account Manager
2. Settings → Messaging API
3. Enable Messaging API
4. Get Channel Access Token (Long-lived)
5. เก็บ token ไว้
```

**3. Setup Webhook URL**
```
เดี๋ยวจะได้จาก n8n
ตอนนี้ไว้ก่อน
```

### Step 2: Create n8n Workflow

**1. Add Webhook Trigger**
```
Nodes: Webhook
- HTTP Method: POST
- Path: /line-webhook
- Response: Respond immediately
```

**Copy Webhook URL:**
```
https://your-n8n.com/webhook/line-webhook
```

**2. Parse LINE Message**
```
Nodes: Code
- JavaScript

// Parse LINE webhook
const body = $input.item.json.body;
const events = body.events || [];

if (events.length === 0) {
  return [];
}

const event = events[0];
const messageType = event.message.type;
const messageText = event.message.text;
const replyToken = event.replyToken;
const userId = event.source.userId;

return [{
  json: {
    messageType,
    messageText,
    replyToken,
    userId
  }
}];
```

**3. Add Logic Node**
```
Nodes: Switch
- Mode: Rules
- Rules:
  - Value 1: {{$json.messageText}}
  - Operator: Contains
  - Value 2: "สวัสดี"
  - Output: greeting

  - Value 1: {{$json.messageText}}
  - Operator: Contains
  - Value 2: "ราคา"
  - Output: pricing

  - Otherwise: ai_response
```

**4. Greeting Response**
```
Nodes: Set
- greeting branch

Set Values:
- reply_message (String):
  "สวัสดีค่ะ! ยินดีต้อนรับสู่ [ชื่อร้าน]
  มีอะไรให้ช่วยไหมคะ? 😊"
```

**5. Pricing Response**
```
Nodes: Set
- pricing branch

Set Values:
- reply_message (String):
  "ราคาสินค้าของเรา:
  🔸 แพ็คเกจ A: 999 บาท
  🔸 แพ็คเกจ B: 1,999 บาท
  🔸 แพ็คเกจ C: 2,999 บาท

  สนใจแพ็คเกจไหนคะ?"
```

**6. AI Response (OpenAI)**
```
Nodes: HTTP Request
- ai_response branch
- Method: POST
- URL: https://api.openai.com/v1/chat/completions

Headers:
- Authorization: Bearer {{$credentials.openAiApi.apiKey}}
- Content-Type: application/json

Body (JSON):
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "คุณคือ AI assistant ของร้าน [ชื่อร้าน] ตอบคำถามเกี่ยวกับสินค้าและบริการอย่างสุภาพ"
    },
    {
      "role": "user",
      "content": "{{$json.messageText}}"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 500
}

Response:
reply_message = {{$json.choices[0].message.content}}
```

**7. Send Reply to LINE**
```
Nodes: HTTP Request
- Merge all branches here
- Method: POST
- URL: https://api.line.me/v2/bot/message/reply

Headers:
- Authorization: Bearer [LINE_CHANNEL_ACCESS_TOKEN]
- Content-Type: application/json

Body:
{
  "replyToken": "{{$json.replyToken}}",
  "messages": [
    {
      "type": "text",
      "text": "{{$json.reply_message}}"
    }
  ]
}
```

**8. Log to Database (Optional)**
```
Nodes: MySQL / Supabase

INSERT INTO chat_logs (
  user_id,
  message,
  reply,
  platform,
  created_at
) VALUES (
  '{{$json.userId}}',
  '{{$json.messageText}}',
  '{{$json.reply_message}}',
  'LINE',
  NOW()
)
```

### Step 3: Configure LINE Webhook

```
1. กลับไปที่ LINE Official Account Manager
2. Settings → Messaging API → Webhook URL
3. ใส่ webhook URL จาก n8n
4. Enable: Use webhook
5. Disable: Auto-reply messages
6. Test webhook
```

อ่านเพิ่มเติม: [n8n vs Vibe Coding](/blog/n8n-vs-vibe-coding/)

## Part 2: Facebook Messenger Chatbot

### Step 1: Setup Facebook App

**1. Create Facebook App**
```
1. ไปที่ https://developers.facebook.com/
2. My Apps → Create App
3. Type: Business
4. App Name: [ชื่อบอท]
```

**2. Add Messenger Product**
```
1. Dashboard → Add Product
2. เลือก Messenger → Set Up
```

**3. Generate Page Access Token**
```
1. Messenger → Settings
2. Access Tokens
3. เลือก Page
4. Generate Token
5. เก็บ token ไว้
```

**4. Setup Webhook**
```
1. Messenger → Settings → Webhooks
2. Callback URL: [จาก n8n]
3. Verify Token: [สร้างเอง random string]
4. Subscribe to:
   - messages
   - messaging_postbacks
```

### Step 2: Create n8n Workflow

**1. Webhook Trigger**
```
Nodes: Webhook
- Path: /facebook-webhook
- HTTP Method: GET, POST
- Response Code: 200
```

**2. Webhook Verification (GET)**
```
Nodes: IF
- Condition: {{$json.query["hub.mode"]}} equals "subscribe"

True branch:
Nodes: Respond to Webhook
- Response: {{$json.query["hub.challenge"]}}
```

**3. Parse Facebook Message (POST)**
```
Nodes: Code

const body = $input.item.json.body;
const entry = body.entry?.[0];
const messaging = entry?.messaging?.[0];

if (!messaging) {
  return [];
}

const senderId = messaging.sender.id;
const messageText = messaging.message?.text;
const postback = messaging.postback?.payload;

return [{
  json: {
    senderId,
    messageText: messageText || postback,
    timestamp: messaging.timestamp
  }
}];
```

**4. Business Logic**
```
(Same as LINE)
- Switch node
- Greeting
- Pricing
- AI response
```

**5. Send Reply to Facebook**
```
Nodes: HTTP Request
- Method: POST
- URL: https://graph.facebook.com/v18.0/me/messages

Query Parameters:
- access_token: [PAGE_ACCESS_TOKEN]

Body:
{
  "recipient": {
    "id": "{{$json.senderId}}"
  },
  "message": {
    "text": "{{$json.reply_message}}"
  }
}
```

อ่านเพิ่มเติม: [Setup n8n Workflow](/blog/setup-n8n-workflow/)

## Advanced Features

### 1. Rich Messages (LINE)

**Flex Message:**
```json
{
  "type": "flex",
  "altText": "สินค้าแนะนำ",
  "contents": {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://example.com/product.jpg",
      "size": "full"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "สินค้า A",
          "weight": "bold",
          "size": "xl"
        },
        {
          "type": "text",
          "text": "ราคา 999 บาท",
          "color": "#FF6B6B"
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "ซื้อเลย",
            "uri": "https://example.com/buy"
          },
          "style": "primary"
        }
      ]
    }
  }
}
```

### 2. Quick Replies

**LINE:**
```json
{
  "type": "text",
  "text": "เลือกหมวดหมู่สินค้า:",
  "quickReply": {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "เสื้อผ้า",
          "text": "ดูสินค้าเสื้อผ้า"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "รองเท้า",
          "text": "ดูสินค้ารองเท้า"
        }
      }
    ]
  }
}
```

**Facebook:**
```json
{
  "text": "เลือกหมวดหมู่สินค้า:",
  "quick_replies": [
    {
      "content_type": "text",
      "title": "เสื้อผ้า",
      "payload": "CATEGORY_CLOTHING"
    },
    {
      "content_type": "text",
      "title": "รองเท้า",
      "payload": "CATEGORY_SHOES"
    }
  ]
}
```

### 3. Context Management

**Save conversation context:**
```
Nodes: Redis / Database

SET user:{userId}:context = {
  "last_topic": "pricing",
  "selected_product": "A",
  "timestamp": "2025-01-20T10:00:00Z"
}

Expire: 1 hour
```

**Retrieve context:**
```
GET user:{userId}:context

Use in AI prompt:
"Previous context: User was asking about {{$json.context.last_topic}}"
```

### 4. Multi-language Support

```
Nodes: Code

function detectLanguage(text) {
  // Simple detection
  const thaiRegex = /[\u0E00-\u0E7F]/;
  return thaiRegex.test(text) ? 'th' : 'en';
}

const language = detectLanguage(messageText);

// AI prompt:
const systemPrompt = language === 'th'
  ? "คุณคือ AI assistant ตอบเป็นภาษาไทย"
  : "You are an AI assistant. Respond in English";
```

### 5. Broadcast Messages

**Send to all users:**
```
Nodes: Schedule Trigger
- Cron: 0 9 * * * (ทุกวัน 9 โมงเช้า)

↓

Nodes: Database (Get all users)
SELECT user_id FROM users WHERE active = 1

↓

Nodes: Loop
- For each user

↓

Nodes: LINE/Facebook Send API
Message: "🎉 โปรโมชั่นวันนี้! ลดสูงสุด 50%"
```

อ่านเพิ่มเติม: [n8n Gmail Sheet Integration](/blog/n8n-workflow-gmail-sheet/)

## Best Practices

### ✅ Do's

**1. เตรียม FAQs**
- รวบรวมคำถามที่ถูกถามบ่อย
- เตรียมคำตอบที่ดี
- Test thoroughly

**2. Handle Errors**
- Network errors
- API timeouts
- Invalid inputs
- Fallback responses

**3. Log Everything**
- User messages
- Bot responses
- Errors
- Performance metrics

**4. Monitor & Improve**
- Track conversation success rate
- Identify confusing topics
- Improve AI prompts
- Add more FAQs

### ❌ Don'ts

**1. อย่าตอบช้า**
- ตอบภายใน 3 วินาที
- ถ้าประมวลผลนาน → ส่ง "กำลังประมวลผล..."

**2. อย่าให้ AI ตอบทุกอย่าร**
- FAQs → hardcoded responses (เร็วกว่า)
- Complex queries → AI
- Sensitive topics → escalate to human

**3. อย่าละเลย Privacy**
- อย่าเก็บข้อมูลส่วนตัวที่ไม่จำเป็น
- แจ้งให้ผู้ใช้รู้
- มี privacy policy

## Troubleshooting

### ปัญหาที่พบบ่อย

**1. Webhook ไม่ทำงาน**
- ตรวจสอบ URL ถูกต้องไหม
- n8n workflow active ไหม
- Webhook verification passed ไหม

**2. บอทไม่ตอบ**
- Check n8n execution log
- API tokens ถูกต้องไหม
- Rate limits เกินไหม

**3. AI ตอบผิด**
- ปรับ system prompt
- เพิ่ม context
- ลด temperature
- ใช้ GPT-4 แทน 3.5

**4. ข้อความสูญหาย**
- Check webhook queue
- Database connections
- Memory limits

## สรุป

**สร้าง Chatbot ด้วย n8n** ไม่ยากและไม่แพง สามารถทำได้เองโดยไม่ต้องจ้าง developer

**ประโยชน์:**
- ⚡ ตอบลูกค้า 24/7
- 💰 ประหยัดค่าใช้จ่าย
- 📈 เพิ่มยอดขาย
- 🤖 AI ช่วยตอบอัตโนมัติ

**Cost Breakdown:**
- n8n: ฟรี (self-host) หรือ $20-50/เดือน
- LINE: 290-2,190 บาท/เดือน
- Facebook: ฟรี
- OpenAI: ~100-500 บาท/เดือน
- **รวม: 390-2,740 บาท/เดือน**

**ROI:** ประหยัดค่าพนักงาน 15,000-30,000 บาท/เดือน

หากต้องการเรียน n8n Chatbot แบบเจาะลึก เรียน **[คอร์ส n8n Automation](https://aiunlock.co/)** กับเราได้

---

**บทความที่เกี่ยวข้อง:**
- [n8n Automation Introduction](/blog/n8n-automation-introduction/)
- [สอน n8n Complete Guide](/blog/sorn-n8n-complete-guide/)
- [Setup n8n Workflow](/blog/setup-n8n-workflow/)

**สนใจเรียน n8n?**
[คอร์ส n8n ออนไลน์](https://aiunlock.co/) | [ติดต่อเรา](/contact/)
