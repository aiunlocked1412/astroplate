---
title: "สร้างภาพด้วย AI Midjourney: คู่มือฉบับสมบูรณ์สำหรับผู้เริ่มต้น"
meta_title: "สร้างภาพด้วย AI Midjourney คู่มือสำหรับผู้เริ่มต้น 2025"
description: "เรียนรู้วิธีสร้างภาพด้วย AI Midjourney ตั้งแต่เริ่มต้น พร้อมเทคนิคเขียน Prompt และตัวอย่างที่จะทำให้คุณสร้างภาพสวยได้ทันที"
date: 2025-10-22T01:00:00Z
image: "/images/blog-default.svg"
categories: ["AI", "Image Generation"]
author: "AI Unlocked Team"
tags: ["Midjourney", "AI สร้างภาพ", "AI image generation", "สร้างภาพด้วย AI", "Midjourney tutorial", "คอร์ส AI"]
draft: false
---

# สร้างภาพด้วย AI Midjourney: คู่มือฉบับสมบูรณ์สำหรับผู้เริ่มต้น

**Midjourney** เป็นหนึ่งในเครื่องมือ **AI สร้างภาพ** ที่ได้รับความนิยมสูงสุดในโลก ด้วยความสามารถในการสร้างภาพที่สวยงาม สมจริง และมีศิลปะสูง จากเพียงแค่ข้อความ บทความนี้จะพาคุณเรียนรู้วิธีใช้ Midjourney ตั้งแต่เริ่มต้นจนถึงเทคนิคขั้นสูง

## สารบัญ
- [Midjourney คืออะไร?](#midjourney-คืออะไร)
- [วิธีเริ่มต้นใช้งาน Midjourney](#วิธีเริ่มต้นใช้งาน-midjourney)
- [เทคนิคเขียน Prompt สำหรับสร้างภาพ](#เทคนิคเขียน-prompt-สำหรับสร้างภาพ)
- [Parameters และคำสั่งสำคัญ](#parameters-และคำสั่งสำคัญ)
- [ตัวอย่างและกรณีศึกษา](#ตัวอย่างและกรณีศึกษา)

## Midjourney คืออะไร?

**Midjourney** คือ AI ที่สามารถสร้างภาพจากข้อความ (Text-to-Image) โดยใช้เทคโนโลยี Generative AI ที่ทันสมัย ทำให้ใครๆ ก็สามารถสร้างงานศิลปะระดับมืออาชีพได้ โดยไม่ต้องมีทักษะการวาดภาพ

### ความสามารถของ Midjourney

- **สร้างภาพจากข้อความ** - แค่บรรยายสิ่งที่ต้องการ
- **สไตล์หลากหลาย** - จากการ์ตูนถึงโฟโต้เรียลลิสติก
- **คุณภาพสูง** - ภาพความละเอียดสูง เหมาะใช้งานจริง
- **ปรับแต่งได้** - Upscale, Variation, Remix
- **รวดเร็ว** - สร้างภาพได้ภายในไม่กี่วินาที

### เปรียบเทียบกับ AI อื่น

| ฟีเจอร์ | Midjourney | DALL-E 3 | Stable Diffusion |
|---------|-----------|----------|------------------|
| **คุณภาพภาพ** | สูงมาก | สูง | กลาง-สูง |
| **ความเป็นศิลปะ** | เยี่ยม | ดี | ดี |
| **ราคา** | $10-60/เดือน | รวมใน ChatGPT Plus | ฟรี (self-host) |
| **ใช้งาน** | Discord | ChatGPT/API | ต้องติดตั้งเอง |
| **โฟกัส** | ศิลปะ คุณภาพ | ทั่วไป | Customization |

อ่านเพิ่มเติม: [เครื่องมือ AI ที่ควรรู้จัก](/blog/ai-tools-overview/)

## วิธีเริ่มต้นใช้งาน Midjourney

### ขั้นตอนการสมัคร

**1. สร้างบัญชี Discord**
- Midjourney ทำงานบน Discord
- ดาวน์โหลดและสมัครที่ discord.com

**2. เข้าร่วม Midjourney Server**
- ไปที่ midjourney.com
- คลิก "Join the Beta"
- Accept invite เข้า Discord server

**3. สมัคร Subscription**
- พิมพ์ `/subscribe` ใน Discord
- เลือกแพ็คเกจที่เหมาะสม
- ชำระเงินผ่าน Stripe

### แพ็คเกจและราคา

**Basic Plan ($10/เดือน)**
- 200 generations/เดือน
- Fast mode (~3.3 ชม.)
- เหมาะกับ: ผู้เริ่มต้น ทดลองใช้

**Standard Plan ($30/เดือน)**
- 15 ชม. Fast mode
- Unlimited Relax mode
- เหมาะกับ: Freelancers, Content creators

**Pro Plan ($60/เดือน)**
- 30 ชม. Fast mode
- Unlimited Relax mode
- Stealth mode (ภาพไม่โผล่ต่อสาธารณะ)
- เหมาะกับ: มืออาชีพ, ธุรกิจ

**Mega Plan ($120/เดือน)**
- 60 ชม. Fast mode
- สำหรับการใช้งานหนัก

## เทคนิคเขียน Prompt สำหรับสร้างภาพ

### โครงสร้าง Prompt พื้นฐาน

```
/imagine [subject] [details] [style] [lighting] [parameters]
```

### 1. Subject (หัวข้อหลัก)

สิ่งที่ต้องการให้อยู่ในภาพ

**ตัวอย่าง:**
- `a cat` - แมว
- `a modern house` - บ้านสไตล์โมเดิร์น
- `portrait of a woman` - ภาพบุคคลผู้หญิง

### 2. Details (รายละเอียด)

ลักษณะเฉพาะของหัวข้อ

**ตัวอย่าง:**
```
a fluffy white cat with blue eyes, sitting on a red cushion
```

### 3. Style (สไตล์ภาพ)

รูปแบบหรือศิลปินที่ต้องการ

**สไตล์ยอดนิยม:**
- `photorealistic` - เหมือนภาพถ่ายจริง
- `anime style` - สไตล์อนิเมะ
- `watercolor painting` - ภาพสีน้ำ
- `3D render` - โมเดล 3 มิติ
- `cinematic` - สไตล์ภาพยนตร์
- `by Studio Ghibli` - สไตล์ Studio Ghibli

### 4. Lighting (แสง)

บรรยากาศและแสงสว่าง

**ตัวอย่าง:**
- `golden hour lighting` - แสงยามเย็น
- `dramatic lighting` - แสงที่ตึงเครียด
- `soft natural light` - แสงธรรมชาติอ่อนๆ
- `neon lights` - แสงนีออน
- `backlit` - แสงมาจากด้านหลัง

### 5. Parameters (พารามิเตอร์)

ปรับแต่งการสร้างภาพ

**พารามิเตอร์สำคัญ:**
- `--ar 16:9` - อัตราส่วนภาพ (aspect ratio)
- `--v 6` - เวอร์ชัน model (ล่าสุด v6)
- `--stylize 100` - ระดับความเป็นศิลปะ (0-1000)
- `--chaos 50` - ความหลากหลาย (0-100)
- `--quality 2` - คุณภาพ (.25, .5, 1, 2)

## ตัวอย่าง Prompts ที่ได้ผล

### Portrait Photography

```
/imagine portrait of a young woman, professional photography,
natural makeup, soft smile, studio lighting, shallow depth of field,
shot on Canon EOS R5, 85mm lens, --ar 2:3 --v 6 --q 2
```

### Fantasy Art

```
/imagine a magical forest with glowing mushrooms, fairy lights,
mystical atmosphere, fantasy art style, ethereal lighting,
by Studio Ghibli, highly detailed, --ar 16:9 --v 6
```

### Product Photography

```
/imagine luxury watch on marble surface, commercial photography,
dramatic lighting, reflections, high-end product shot,
ultra-sharp focus, black background, --ar 1:1 --v 6 --q 2
```

### Architecture

```
/imagine modern minimalist house, white concrete walls,
large glass windows, surrounded by nature, architectural photography,
blue sky, golden hour lighting, --ar 16:9 --v 6
```

### Character Design

```
/imagine cyberpunk character, neon jacket, futuristic sunglasses,
city night background, bokeh effect, cinematic style,
highly detailed, concept art, --ar 2:3 --v 6 --stylize 200
```

อ่านเพิ่มเติม: [เทคนิคเขียน Prompt AI](/blog/ai-prompt-writing-techniques/)

## Parameters และคำสั่งสำคัญ

### คำสั่งหลัก

**Imagine**
```
/imagine [prompt]
```
สร้างภาพใหม่

**Info**
```
/info
```
ดูข้อมูลการใช้งานและเวลาที่เหลือ

**Settings**
```
/settings
```
ปรับการตั้งค่าต่างๆ

### Parameters สำคัญ

**Aspect Ratio (--ar)**
```
--ar 1:1   (Square - Instagram)
--ar 16:9  (Landscape - YouTube)
--ar 9:16  (Vertical - Stories)
--ar 4:3   (Traditional photo)
--ar 2:3   (Portrait)
```

**Stylize (--s)**
```
--s 0      ตามคำสั่งมาก มีศิลปะน้อย
--s 100    (Default) สมดุล
--s 1000   มีศิลปะมาก ตีความเอง
```

**Chaos (--c)**
```
--c 0      ผลลัพธ์คล้ายกันมาก
--c 50     หลากหลายปานกลาง
--c 100    แต่ละภาพต่างกันมาก
```

**Quality (--q)**
```
--q .25    เร็ว คุณภาพพื้นฐาน
--q 1      (Default) สมดุล
--q 2      ช้า คุณภาพสูงสุด
```

### การใช้งานปุ่ม

หลังสร้างภาพ จะมีปุ่มให้เลือก:

**U1, U2, U3, U4** - Upscale (ขยายภาพ)
**V1, V2, V3, V4** - Variation (สร้างภาพคล้ายๆ)
**🔄** - Reroll (สร้างใหม่ทั้งหมด)

## เทคนิคขั้นสูง

### 1. Image Prompts (ใช้รูปเป็น Prompt)

```
/imagine [URL รูปภาพ] [prompt] --iw 2
```
- `--iw` = image weight (0-2)
- ยิ่งสูงยิ่งคล้ายรูปต้นแบบ

### 2. Multi-Prompts (แบ่งน้ำหนัก)

```
/imagine hot::2 dog::1
```
- hot (ความร้อน) น้ำหนัก 2
- dog (สุนัข) น้ำหนัก 1
- ได้ภาพที่เน้น "ร้อน" มากกว่า "สุนัข"

### 3. Negative Prompts (ไม่ต้องการ)

```
/imagine beautiful landscape --no people, buildings, cars
```
- ใช้ `--no` เพื่อบอกสิ่งที่ไม่ต้องการ

### 4. Remix Mode

เปิดใน `/settings` จะให้แก้ prompt ก่อนสร้าง Variation

### 5. Blend (ผสมรูป)

```
/blend [รูปที่ 1] [รูปที่ 2]
```
ผสมสองรูปเข้าด้วยกัน

## กรณีศึกษาการใช้งาน

### 1. Social Media Content

**Instagram Posts**
```
/imagine [product/scene] professional photography,
bright colors, clean composition, --ar 1:1
```

**Stories/Reels**
```
/imagine [content] vertical format, eye-catching,
vibrant colors, --ar 9:16
```

### 2. Marketing Materials

**Banners**
```
/imagine [product/concept] commercial photography,
professional, clean background, --ar 3:1
```

**Posters**
```
/imagine [event/product] poster design, bold typography,
eye-catching colors, --ar 2:3
```

### 3. Product Mockups

```
/imagine [product] on clean white background,
commercial product photography, studio lighting,
soft shadows, centered composition, --ar 1:1 --v 6
```

### 4. Concept Art

```
/imagine [concept] detailed concept art, digital painting,
ArtStation trending, highly detailed, cinematic lighting,
by [artist name], --ar 16:9 --stylize 500
```

### 5. Logo Design

```
/imagine minimalist logo design, [concept],
simple, clean, vector style, white background,
professional, --ar 1:1 --v 6
```

อ่านเพิ่มเติม: [AI สร้างภาพสต็อก](/blog/ai-stock-photos/)

## ข้อควรระวังและ Best Practices

### ✅ Do's (ควรทำ)

1. **เริ่มจากคำสั่งง่ายๆ** แล้วค่อยเพิ่มรายละเอียด
2. **ใช้ reference images** ช่วยให้ได้ผลตามต้องการ
3. **ทดสอบ parameters** ต่างๆ
4. **เก็บ prompts ที่ได้ผล** ไว้ใช้ซ้ำ
5. **ศึกษา showcase** จากคนอื่น

### ❌ Don'ts (ไม่ควรทำ)

1. **ใช้งานเชิงพาณิชย์แบบไม่ถูกต้อง** - ต้องมีแพ็คเกจที่เหมาะสม
2. **สร้างภาพที่ละเมิดลิขสิทธิ์** - หลีกเลี่ยงชื่อแบรนด์เฉพาะ
3. **สร้างเนื้อหาไม่เหมาะสม** - มี content policy
4. **คาดหวังครั้งแรกสมบูรณ์** - ต้อง iterate หลายรอบ

## Tips จาก AI Unlocked

จากประสบการณ์สอน **คอร์ส AI** เรามีเทคนิคเพิ่มเติม:

### เทคนิคประหยัดเครดิต

1. **ใช้ Relax mode** สำหรับงานที่ไม่รีบ
2. **ทดสอบ low quality** ก่อนแล้วค่อย upscale
3. **เลือก grid ที่ชอบ** ก่อน upscale หลายภาพ
4. **ใช้ Remix** แทนการ imagine ใหม่

### เทคนิคได้ภาพสวย

1. **เพิ่มคีย์เวิร์ดคุณภาพ**: "highly detailed", "8k", "professional"
2. **ระบุกล้อง/เลนส์**: "shot on Canon R5", "85mm lens"
3. **ระบุสไตล์ศิลปิน**: "by Greg Rutkowski", "Studio Ghibli style"
4. **ใช้คำ cinematic**: "cinematic lighting", "depth of field"

### Community และแหล่งเรียนรู้

- **Midjourney Discord** - community หลัก
- **Midjourney Showcase** - ดูผลงานคนอื่น
- **PromptHero** - รวม prompts ที่ใช้ได้จริง
- **Reddit r/midjourney** - tips และ tricks

## FAQ: คำถามที่พบบ่อย

### Midjourney ใช้ฟรีได้ไหม?

**ไม่ได้แล้ว** ปัจจุบัน Midjourney ยกเลิก free trial เนื่องจากมีคนใช้งานมาก ต้องสมัครแพ็คเกจขั้นต่ำ $10/เดือน

### ภาพที่สร้างใช้เชิงพาณิชย์ได้ไหม?

**ได้** ถ้าคุณมี:
- Paid subscription (ไม่ใช่ free trial)
- รายได้น้อยกว่า $1M/ปี (สำหรับ Basic-Pro)
- ถ้ารายได้เกิน ต้องใช้ Mega plan

### ทำไมภาพออกมาไม่เหมือนที่คิด?

สาเหตุที่พบบ่อย:
- Prompt คลุมเคลือ → เพิ่มรายละเอียด
- ไม่ระบุสไตล์ → ใส่สไตล์ที่ต้องการ
- Parameters ไม่เหมาะสม → ลอง adjust
- ต้อง iterate หลายรอบ

### เรียนใช้ Midjourney ยากไหม?

**ไม่ยาก** แต่ต้องฝึกฝน:
- เริ่มได้ภายใน 5 นาที
- ใช้ได้ดีใน 1-2 สัปดาห์
- เก่งใน 1-2 เดือน

สนใจเรียน: [คอร์ส AI สร้างภาพ](https://aiunlock.co/)

## สรุป

**Midjourney** เป็นเครื่องมือที่ทรงพลังสำหรับการสร้างภาพด้วย AI ใครๆ ก็สามารถสร้างงานศิลปะระดับมืออาชีพได้ โดยไม่ต้องมีทักษะการวาดภาพ

### เริ่มต้นอย่างไร:

1. **สมัคร Discord + Midjourney** ($10/เดือน)
2. **เริ่มจาก prompt ง่ายๆ**
3. **ทดลอง parameters ต่างๆ**
4. **เรียนรู้จากคนอื่น** ดู showcase
5. **ฝึกฝนสม่ำเสมอ** ยิ่งทำบ่อยยิ่งเก่ง

หากต้องการเรียนรู้เทคนิคการใช้ Midjourney และ AI สร้างภาพแบบเจาะลึก สามารถเรียน **[คอร์ส AI](https://aiunlock.co/)** กับเราได้ ทั้งออนไลน์และสอนส่วนตัวที่เชียงใหม่

---

**บทความที่เกี่ยวข้อง:**
- [เทคนิคเขียน Prompt AI](/blog/ai-prompt-writing-techniques/)
- [AI สร้างภาพสต็อก](/blog/ai-stock-photos/)
- [คอร์ส AI สำหรับผู้เริ่มต้น](/blog/ai-course-for-beginners/)

**สนใจเรียน AI สร้างภาพ?**
เข้าร่วม [คอร์ส AI ออนไลน์](https://aiunlock.co/) หรือ [ติดต่อเรา](/contact/)

**ติดตามเทคนิค AI ได้ที่:**
- Facebook: [AI Unlocked](https://www.facebook.com/aiunlockedvip)
- YouTube: [@AIUnlocked168](https://www.youtube.com/@AIUnlocked168)
