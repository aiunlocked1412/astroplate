# Admin Dashboard - คู่มือการใช้งาน

## 🔐 ข้อมูล Login

**URL:** `/admin/login`

**Credentials:**
- Username: `lnw1`
- Password: `zzzzzz55`

> ⚠️ **สำคัญ:** ข้อมูล credentials เก็บอยู่ในไฟล์ `.env` ซึ่งถูก ignore จาก git แล้ว

---

## 🔒 ระบบรักษาความปลอดภัย (อัปเดต)

### 1. Authentication Middleware
- **ทุกหน้าใน `/admin`** (ยกเว้น `/admin/login`) ต้อง login ก่อน
- ถ้ายังไม่ login จะถูก redirect ไปหน้า login อัตโนมัติ
- ใช้ Astro middleware (`src/middleware.ts`)

### 2. SEO Protection
- **หน้า admin ทั้งหมดมี `noindex, nofollow`**
- Google และ search engines อื่นจะไม่ index หน้าเหล่านี้
- มี `robots.txt` บล็อก `/admin/` และ `/api/auth/`

### 3. Session Security
- HTTP-only cookies
- Session หมดอายุ 24 ชั่วโมง
- Secure cookies ใน production

---

## 📁 โครงสร้างไฟล์

```
src/
├── pages/
│   ├── admin/
│   │   ├── login.astro          # หน้า login
│   │   ├── dashboard.astro      # หน้า admin dashboard
│   │   └── settings.astro       # หน้า settings (ตัวอย่าง)
│   └── api/
│       └── auth/
│           ├── login.ts         # API สำหรับ login
│           └── logout.ts        # API สำหรับ logout
├── layouts/
│   └── AdminLayout.astro        # Layout สำหรับหน้า admin
├── middleware.ts                 # Authentication middleware
└── .env                          # ไฟล์เก็บ credentials (ไม่ commit)

public/
└── robots.txt                    # บล็อก search engines
```

---

## 🚀 การใช้งาน

### 1. เข้าสู่ระบบ
1. เปิดเบราว์เซอร์และไปที่ `/admin/login`
2. กรอก username และ password
3. คลิก "เข้าสู่ระบบ"

### 2. Admin Dashboard
หลังจาก login สำเร็จ คุณจะเห็น:

#### **สถิติภาพรวม**
- 📊 จำนวนบทความทั้งหมด
- 🏷️ จำนวนหมวดหมู่
- ✅ จำนวนบทความที่เผยแพร่แล้ว

#### **ตารางรายการบทความ**
แสดงข้อมูล:
- หมายเลข
- หัวข้อบทความ
- คำอธิบาย
- หมวดหมู่
- วันที่เผยแพร่
- สถานะ (เผยแพร่แล้ว/แบบร่าง)
- ลิงก์ไปยังบทความ

#### **ฟังก์ชันค้นหา**
- ใช้ช่องค้นหาด้านบนตารางเพื่อกรองบทความตามชื่อ

#### **สถิติตามหมวดหมู่**
- แสดงจำนวนบทความในแต่ละหมวดหมู่

### 3. ออกจากระบบ
- คลิกปุ่ม "ออกจากระบบ" ที่มุมบนขวา

---

## 🔒 ระบบรักษาความปลอดภัย

### Authentication
- ใช้ **HTTP-only cookies** เพื่อเก็บ session
- Session มีอายุ 24 ชั่วโมง
- การเข้าถึงหน้า dashboard ต้อง login ก่อน
- หากยังไม่ login จะถูก redirect ไปหน้า login อัตโนมัติ

### Credentials
- Username และ Password เก็บใน `.env`
- ไฟล์ `.env` ถูก gitignore แล้ว
- สามารถเปลี่ยน credentials ได้ใน `.env`

---

## 🛠️ การตั้งค่า

### ไฟล์ .env
```env
# Admin Credentials
ADMIN_USERNAME=lnw1
ADMIN_PASSWORD=zzzzzz55

# Session Secret (ควรเปลี่ยนใน production)
SESSION_SECRET=your-secret-key-change-this-in-production
```

### การเปลี่ยน Credentials
1. แก้ไขไฟล์ `.env`
2. เปลี่ยน `ADMIN_USERNAME` และ `ADMIN_PASSWORD`
3. Restart dev server

---

## 🎨 ฟีเจอร์

### ✅ ที่มีอยู่แล้ว
- [x] ระบบ Login/Logout
- [x] Session management (24 ชั่วโมง)
- [x] Dashboard แสดงสถิติ
- [x] ตารางรายการบทความ
- [x] ฟังก์ชันค้นหา
- [x] สถิติตามหมวดหมู่
- [x] Responsive design (mobile-friendly)
- [x] Dark theme

### 💡 ฟีเจอร์ที่อาจเพิ่มในอนาคต
- [ ] แก้ไขบทความผ่าน dashboard
- [ ] ลบบทความ
- [ ] เพิ่มบทความใหม่
- [ ] จัดการหมวดหมู่และ tags
- [ ] อัพโหลดรูปภาพ
- [ ] Analytics (views, clicks)
- [ ] Export ข้อมูล (CSV, JSON)

---

## 🐛 Troubleshooting

### ปัญหา: Login ไม่ได้
**แก้ไข:**
1. ตรวจสอบ username/password ในไฟล์ `.env`
2. ตรวจสอบว่า server รันอยู่
3. ลองเคลียร์ cookies ของเบราว์เซอร์

### ปัญหา: ถูก logout อัตโนมัติ
**สาเหตุ:** Session หมดอายุ (24 ชั่วโมง)
**แก้ไข:** Login ใหม่อีกครั้ง

### ปัญหา: Dashboard ไม่แสดงบทความ
**แก้ไข:**
1. ตรวจสอบว่ามีไฟล์ในโฟลเดอร์ `src/content/blog/`
2. ตรวจสอบ frontmatter ของแต่ละบทความว่าถูกต้อง
3. Restart dev server

---

## 🔗 URLs สำคัญ

- **หน้า Login:** `/admin/login`
- **หน้า Dashboard:** `/admin/dashboard`
- **API Login:** `/api/auth/login` (POST)
- **API Logout:** `/api/auth/logout` (POST)

---

## 📝 หมายเหตุ

1. **ไม่ควร commit ไฟล์ `.env`** - มี credentials อยู่ข้างใน
2. **Production:** ควรเปลี่ยน `SESSION_SECRET` เป็นค่าที่ปลอดภัยกว่า
3. **HTTPS:** ใน production ควรใช้ HTTPS เสมอ
4. **Rate Limiting:** ควรเพิ่ม rate limiting สำหรับ login API

---

## 🚀 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📧 ติดต่อสอบถาม

หากมีปัญหาหรือข้อสงสัย กรุณาติดต่อ:
- Email: aiunlockinnovations@gmail.com
- Facebook: https://www.facebook.com/aiunlockedvip
