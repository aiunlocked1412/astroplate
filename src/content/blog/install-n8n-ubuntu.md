---
title: "การติดตั้ง n8n บน Ubuntu Server: คู่มือ Step-by-Step สำหรับผู้เริ่มต้น"
meta_title: "วิธีติดตั้ง n8n บน Ubuntu | Step by Step Tutorial"
description: "คู่มือการติดตั้ง n8n บน Ubuntu Server แบบละเอียด ตั้งแต่ติดตั้ง Node.js, ตั้งค่า Nginx, SSL Certificate จนถึง Production-ready"
date: 2025-10-20T09:00:00Z
image: "/images/blog-default.svg"
categories: ["n8n", "Automation", "Tutorials"]
author: "วิรุฬห์ เก่งธัญการ"
tags: ["การติดตั้ง n8n", "n8n ubuntu", "ติดตั้ง n8n server", "n8n installation guide", "ubuntu automation setup", "n8n production setup"]
draft: false
---

# การติดตั้ง n8n บน Ubuntu Server: คู่มือสมบูรณ์

บทความนี้จะแนะนำ**การติดตั้ง n8n บน Ubuntu Server** อย่างละเอียด ตั้งแต่การเตรียม Server, ติดตั้ง Dependencies, ตั้งค่า Nginx Reverse Proxy, ติดตั้ง SSL Certificate ไปจนถึงการทำให้ n8n พร้อมใช้งานในระดับ Production เหมาะสำหรับผู้ที่ต้องการ **Self-host n8n** บนเซิร์ฟเวอร์ของตัวเอง

## ก่อนเริ่มติดตั้ง: สิ่งที่ต้องเตรียม

### ข้อกำหนดของระบบ

**ขั้นต่ำ (สำหรับทดลอง):**
- Ubuntu 20.04 LTS ขึ้นไป
- RAM: 1GB
- CPU: 1 Core
- Storage: 20GB
- IP Address แบบ Public

**แนะนำ (สำหรับ Production):**
- Ubuntu 22.04 LTS
- RAM: 2-4GB
- CPU: 2 Cores
- Storage: 40GB+ SSD
- Domain Name
- SSL Certificate

### สิ่งที่ต้องมี

✅ VPS/Server ที่รัน Ubuntu
✅ SSH Access (Root หรือ Sudo)
✅ Domain Name (ถ้าต้องการใช้ HTTPS)
✅ ความรู้พื้นฐาน Linux Command Line

อ่านเพิ่มเติม: [n8n Self-host: คู่มือสมบูรณ์](/blog/n8n-self-host-installation/)

## ขั้นตอนที่ 1: อัปเดตระบบ

เริ่มต้นด้วยการอัปเดต Package ทั้งหมด:

```bash
# อัปเดต Package lists
sudo apt update

# อัปเกรด Package ที่ติดตั้งแล้ว
sudo apt upgrade -y

# ติดตั้ง Package ที่จำเป็น
sudo apt install -y curl wget git build-essential
```

## ขั้นตอนที่ 2: ติดตั้ง Node.js

n8n ต้องใช้ Node.js เวอร์ชัน 18 หรือสูงกว่า:

### วิธีที่ 1: ใช้ NodeSource Repository (แนะนำ)

```bash
# ติดตั้ง Node.js 18.x LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# ตรวจสอบเวอร์ชัน
node --version  # ควรได้ v18.x.x
npm --version   # ควรได้ 9.x.x ขึ้นไป
```

### วิธีที่ 2: ใช้ NVM (Node Version Manager)

```bash
# ติดตั้ง NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# โหลด NVM
source ~/.bashrc

# ติดตั้ง Node.js
nvm install 18
nvm use 18
nvm alias default 18
```

## ขั้นตอนที่ 3: ติดตั้ง n8n

### ติดตั้ง n8n ด้วย npm

```bash
# ติดตั้ง n8n แบบ Global
sudo npm install -g n8n

# ตรวจสอบการติดตั้ง
n8n --version

# ทดลองรัน n8n ครั้งแรก (กด Ctrl+C เพื่อหยุด)
n8n start
```

เมื่อรัน n8n ครั้งแรก จะสร้างโฟลเดอร์ `~/.n8n` เพื่อเก็บข้อมูล

### เข้าถึง n8n ผ่าน Web Browser

เปิดเว็บเบราว์เซอร์ไปที่:
```
http://your-server-ip:5678
```

หากเข้าได้ แสดงว่าติดตั้งสำเร็จ! ✅

อ่านเพิ่มเติม: [สอน n8n: คู่มือสำหรับผู้เริ่มต้น](/blog/sorn-n8n-complete-guide/)

## ขั้นตอนที่ 4: สร้าง User สำหรับ n8n

เพื่อความปลอดภัย ไม่ควรรัน n8n ด้วย Root:

```bash
# สร้าง User สำหรับ n8n
sudo adduser --system --group n8n

# สร้างโฟลเดอร์สำหรับ n8n
sudo mkdir -p /home/n8n/.n8n
sudo chown -R n8n:n8n /home/n8n/.n8n
```

## ขั้นตอนที่ 5: ตั้งค่า Systemd Service

เพื่อให้ n8n รันอัตโนมัติเมื่อเซิร์ฟเวอร์ Restart:

### สร้างไฟล์ Service

```bash
sudo nano /etc/systemd/system/n8n.service
```

### เพิ่มเนื้อหาต่อไปนี้:

```ini
[Unit]
Description=n8n - Workflow Automation Tool
Documentation=https://docs.n8n.io
After=network.target

[Service]
Type=simple
User=n8n
WorkingDirectory=/home/n8n
Environment="N8N_BASIC_AUTH_ACTIVE=true"
Environment="N8N_BASIC_AUTH_USER=admin"
Environment="N8N_BASIC_AUTH_PASSWORD=ChangeThisPassword123!"
Environment="N8N_HOST=0.0.0.0"
Environment="N8N_PORT=5678"
Environment="N8N_PROTOCOL=http"
Environment="GENERIC_TIMEZONE=Asia/Bangkok"
Environment="N8N_LOG_LEVEL=info"
Environment="N8N_LOG_OUTPUT=console,file"
Environment="N8N_LOG_FILE_LOCATION=/home/n8n/.n8n/logs/"
ExecStart=/usr/bin/n8n start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**หมายเหตุ:** อย่าลืมเปลี่ยน `N8N_BASIC_AUTH_PASSWORD`!

### เปิดใช้งาน Service

```bash
# Reload systemd daemon
sudo systemctl daemon-reload

# เปิดใช้งาน n8n Service
sudo systemctl enable n8n

# เริ่มต้น n8n
sudo systemctl start n8n

# ตรวจสอบสถานะ
sudo systemctl status n8n
```

### คำสั่งที่มีประโยชน์

```bash
# ดู Logs
sudo journalctl -u n8n -f

# หยุด n8n
sudo systemctl stop n8n

# รีสตาร์ท n8n
sudo systemctl restart n8n

# ดูสถานะ
sudo systemctl status n8n
```

## ขั้นตอนที่ 6: ติดตั้ง Nginx Reverse Proxy

เพื่อให้เข้าถึง n8n ผ่าน Domain Name และรองรับ HTTPS:

### ติดตั้ง Nginx

```bash
sudo apt install nginx -y
```

### สร้างไฟล์ Config สำหรับ n8n

```bash
sudo nano /etc/nginx/sites-available/n8n
```

### เพิ่ม Configuration:

```nginx
# HTTP (จะอัปเกรดเป็น HTTPS ในขั้นตอนถัดไป)
server {
    listen 80;
    listen [::]:80;

    server_name your-domain.com;  # เปลี่ยนเป็น Domain ของคุณ

    # กัน DDoS เบื้องต้น
    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;

        # Headers สำหรับ Proxy
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Headers สำหรับ Real IP
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket Support
        proxy_set_header X-Forwarded-Host $server_name;
        proxy_set_header X-NginX-Proxy true;
        proxy_redirect off;

        # Timeouts
        proxy_connect_timeout 90;
        proxy_send_timeout 90;
        proxy_read_timeout 90;
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### เปิดใช้งาน Config

```bash
# สร้าง Symbolic Link
sudo ln -s /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/

# ลบ Default Config (ถ้ามี)
sudo rm /etc/nginx/sites-enabled/default

# ทดสอบ Config
sudo nginx -t

# รีสตาร์ท Nginx
sudo systemctl restart nginx

# ตั้งให้ Nginx เริ่มอัตโนมัติ
sudo systemctl enable nginx
```

ตอนนี้คุณสามารถเข้าถึง n8n ผ่าน `http://your-domain.com` แล้ว!

อ่านเพิ่มเติม: [n8n Workflow: เชื่อม Gmail กับ Google Sheets](/blog/n8n-workflow-gmail-sheet/)

## ขั้นตอนที่ 7: ติดตั้ง SSL Certificate (HTTPS)

ใช้ Let's Encrypt เพื่อติดตั้ง SSL Certificate ฟรี:

### ติดตั้ง Certbot

```bash
# ติดตั้ง Certbot และ Nginx Plugin
sudo apt install certbot python3-certbot-nginx -y
```

### ขอ SSL Certificate

```bash
# รัน Certbot
sudo certbot --nginx -d your-domain.com

# ถ้ามี Subdomain หลายตัว
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Certbot จะถามคำถามหลายข้อ:
1. อีเมลสำหรับ Renewal Notifications
2. ยอมรับ Terms of Service
3. รับข่าวสารจาก EFF (ถ้าต้องการ)
4. Redirect HTTP ไป HTTPS (แนะนำให้เลือก 2: Redirect)

### ทดสอบ Auto-renewal

```bash
# ทดสอบการต่ออายุอัตโนมัติ
sudo certbot renew --dry-run
```

### ตรวจสอบ Certificate

เปิดเว็บเบราว์เซอร์ไปที่ `https://your-domain.com`
- ควรเห็น 🔒 Lock Icon
- Certificate ควรเป็น Let's Encrypt

## ขั้นตอนที่ 8: อัปเดต n8n Environment Variables

แก้ไข Service File เพื่อเพิ่มการตั้งค่าสำหรับ HTTPS:

```bash
sudo nano /etc/systemd/system/n8n.service
```

อัปเดต Environment Variables:

```ini
Environment="N8N_HOST=your-domain.com"
Environment="N8N_PORT=5678"
Environment="N8N_PROTOCOL=https"
Environment="WEBHOOK_URL=https://your-domain.com/"
```

รีสตาร์ท Service:

```bash
sudo systemctl daemon-reload
sudo systemctl restart n8n
```

## ขั้นตอนที่ 9: ตั้งค่า Firewall

ใช้ UFW (Uncomplicated Firewall) เพื่อรักษาความปลอดภัย:

```bash
# เปิดใช้งาน UFW
sudo ufw enable

# อนุญาต SSH (สำคัญมาก!)
sudo ufw allow 22/tcp

# อนุญาต HTTP และ HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# ตรวจสอบ Rules
sudo ufw status

# ผลลัพธ์ควรเป็น:
# Status: active
# To                         Action      From
# --                         ------      ----
# 22/tcp                     ALLOW       Anywhere
# 80/tcp                     ALLOW       Anywhere
# 443/tcp                    ALLOW       Anywhere
```

**หมายเหตุ:** Port 5678 ไม่ควร Allow จากภายนอก เพราะเราใช้ Nginx Proxy แล้ว

อ่านเพิ่มเติม: [ความปลอดภัยข้อมูลเมื่อใช้ AI](/blog/ai-data-security/)

## ขั้นตอนที่ 10: ติดตั้ง PostgreSQL (Optional แต่แนะนำ)

สำหรับ Production ควรใช้ PostgreSQL แทน SQLite:

### ติดตั้ง PostgreSQL

```bash
# ติดตั้ง PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# เริ่มต้น Service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### สร้าง Database และ User

```bash
# เข้า PostgreSQL
sudo -u postgres psql

# ใน PostgreSQL Prompt
CREATE DATABASE n8n;
CREATE USER n8n_user WITH ENCRYPTED PASSWORD 'YourStrongPassword';
GRANT ALL PRIVILEGES ON DATABASE n8n TO n8n_user;
\q
```

### อัปเดต n8n Service

```bash
sudo nano /etc/systemd/system/n8n.service
```

เพิ่ม Environment Variables:

```ini
Environment="DB_TYPE=postgresdb"
Environment="DB_POSTGRESDB_HOST=localhost"
Environment="DB_POSTGRESDB_PORT=5432"
Environment="DB_POSTGRESDB_DATABASE=n8n"
Environment="DB_POSTGRESDB_USER=n8n_user"
Environment="DB_POSTGRESDB_PASSWORD=YourStrongPassword"
```

รีสตาร์ท:

```bash
sudo systemctl daemon-reload
sudo systemctl restart n8n
```

## ขั้นตอนที่ 11: ตั้งค่า Monitoring และ Logging

### ดู Logs ของ n8n

```bash
# Real-time logs
sudo journalctl -u n8n -f

# Logs ย้อนหลัง 100 บรรทัด
sudo journalctl -u n8n -n 100

# Logs ของวันนี้
sudo journalctl -u n8n --since today
```

### ตรวจสอบ Resource Usage

```bash
# ติดตั้ง htop
sudo apt install htop -y

# รัน htop
htop

# กด F4 แล้วพิมพ์ "n8n" เพื่อหา Process
```

### ตั้งค่า Log Rotation

```bash
# สร้างไฟล์ Logrotate Config
sudo nano /etc/logrotate.d/n8n
```

เพิ่มเนื้อหา:

```
/home/n8n/.n8n/logs/*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 n8n n8n
    sharedscripts
}
```

## ขั้นตอนที่ 12: Backup และ Restore

### สร้าง Backup Script

```bash
# สร้าง Backup Directory
sudo mkdir -p /backup/n8n

# สร้าง Backup Script
sudo nano /usr/local/bin/n8n-backup.sh
```

เพิ่มเนื้อหา:

```bash
#!/bin/bash

# ตัวแปร
BACKUP_DIR="/backup/n8n"
DATE=$(date +%Y%m%d_%H%M%S)
N8N_DIR="/home/n8n/.n8n"

# สร้าง Backup
tar -czf "${BACKUP_DIR}/n8n_backup_${DATE}.tar.gz" -C /home/n8n .n8n

# Backup PostgreSQL
if [ -f /etc/systemd/system/n8n.service ]; then
    if grep -q "DB_TYPE=postgresdb" /etc/systemd/system/n8n.service; then
        sudo -u postgres pg_dump n8n > "${BACKUP_DIR}/n8n_db_${DATE}.sql"
    fi
fi

# ลบ Backup เก่าที่เก็บไว้เกิน 30 วัน
find ${BACKUP_DIR} -type f -mtime +30 -delete

echo "Backup completed: ${DATE}"
```

ตั้งค่า Permission:

```bash
sudo chmod +x /usr/local/bin/n8n-backup.sh
```

### ตั้งค่า Cron Job สำหรับ Auto-backup

```bash
# แก้ไข Crontab
sudo crontab -e

# เพิ่มบรรทัดนี้ (Backup ทุกวันเวลา 2:00 AM)
0 2 * * * /usr/local/bin/n8n-backup.sh >> /var/log/n8n-backup.log 2>&1
```

อ่าน Case Study: [ระบบออกใบเสร็จอัตโนมัติด้วย n8n](/blog/receipt-system-ai-n8n/)

## Performance Tuning

### เพิ่ม Environment Variables เพิ่มเติม

```bash
sudo nano /etc/systemd/system/n8n.service
```

เพิ่ม:

```ini
# Payload Size
Environment="N8N_PAYLOAD_SIZE_MAX=16"

# Execution Data Pruning
Environment="EXECUTIONS_DATA_PRUNE=true"
Environment="EXECUTIONS_DATA_MAX_AGE=168"  # 7 days

# Node.js Memory
Environment="NODE_OPTIONS=--max-old-space-size=2048"  # 2GB RAM

# Workers
Environment="EXECUTIONS_PROCESS=main"  # หรือ "own" ถ้า RAM เยอะ
```

### Optimize PostgreSQL

```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

ค้นหาและแก้ไข:

```ini
shared_buffers = 256MB       # 25% ของ RAM
effective_cache_size = 1GB   # 50-75% ของ RAM
maintenance_work_mem = 128MB
work_mem = 16MB
```

รีสตาร์ท PostgreSQL:

```bash
sudo systemctl restart postgresql
```

## Troubleshooting: แก้ปัญหาที่พบบ่อย

### 1. n8n ไม่สามารถเริ่มต้นได้

```bash
# ตรวจสอบ Logs
sudo journalctl -u n8n -n 50

# ตรวจสอบ Permission
sudo chown -R n8n:n8n /home/n8n/.n8n

# ตรวจสอบว่า Port 5678 ถูกใช้อยู่หรือไม่
sudo netstat -tulpn | grep 5678
```

### 2. ไม่สามารถเข้าถึงผ่าน Domain

```bash
# ตรวจสอบ Nginx
sudo nginx -t
sudo systemctl status nginx

# ตรวจสอบ Firewall
sudo ufw status

# ตรวจสอบ DNS
nslookup your-domain.com
```

### 3. Webhook ไม่ทำงาน

- ตรวจสอบว่า `WEBHOOK_URL` ตั้งค่าถูกต้อง
- ตรวจสอบว่าใช้ HTTPS แล้ว
- ตรวจสอบ SSL Certificate

### 4. Database Connection Error

```bash
# ตรวจสอบ PostgreSQL
sudo systemctl status postgresql

# ทดสอบการเชื่อมต่อ
sudo -u postgres psql -d n8n

# ตรวจสอบ Password ใน Service File
sudo nano /etc/systemd/system/n8n.service
```

### 5. Memory Issues

```bash
# เพิ่ม Swap Space
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# ทำให้ Permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

อ่านเพิ่มเติม: [ข้อผิดพลาดที่พบบ่อยในการเรียน AI](/blog/common-ai-mistakes/)

## การอัปเดต n8n

### อัปเดตด้วย npm

```bash
# อัปเดต n8n
sudo npm update -g n8n

# รีสตาร์ท Service
sudo systemctl restart n8n

# ตรวจสอบเวอร์ชัน
n8n --version
```

### ตรวจสอบ Changelog

ก่อนอัปเดต ควรตรวจสอบ [n8n Changelog](https://github.com/n8n-io/n8n/releases)

## Security Best Practices

### 1. อัปเดตระบบเป็นประจำ

```bash
# อัปเดตรายสัปดาห์
sudo apt update && sudo apt upgrade -y

# อัปเดต Security Patches อัตโนมัติ
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

### 2. ใช้รหัสผ่านที่แข็งแรง

- Basic Auth Password: อย่างน้อย 16 ตัวอักษร
- PostgreSQL Password: ใช้ Password Generator
- SSH: ใช้ SSH Key แทน Password

### 3. จำกัดการเข้าถึง SSH

```bash
# แก้ไข SSH Config
sudo nano /etc/ssh/sshd_config

# ปิดการใช้ Root Login
PermitRootLogin no

# ปิด Password Authentication (ใช้ SSH Key)
PasswordAuthentication no

# รีสตาร์ท SSH
sudo systemctl restart sshd
```

### 4. ติดตั้ง Fail2Ban

```bash
# ติดตั้ง Fail2Ban
sudo apt install fail2ban -y

# สร้าง Config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# เปิดใช้งาน
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## เช็คลิสต์หลังการติดตั้ง

- [ ] n8n เริ่มต้นอัตโนมัติเมื่อ Server Restart
- [ ] เข้าถึงได้ผ่าน HTTPS
- [ ] SSL Certificate ใช้งานได้
- [ ] Basic Authentication ทำงาน
- [ ] Webhook ทำงานได้
- [ ] PostgreSQL เชื่อมต่อสำเร็จ
- [ ] Firewall ตั้งค่าแล้ว
- [ ] Backup Script ทำงาน
- [ ] Logs Rotation ทำงาน
- [ ] Monitoring Setup เสร็จสิ้น

## FAQ: คำถามที่พบบ่อย

### ใช้เวลาติดตั้งนานไหม?

ประมาณ 30-60 นาที สำหรับผู้ที่มีพื้นฐาน Linux

### ต้องมีความรู้อะไรบ้าง?

- พื้นฐาน Linux Command Line
- SSH
- พื้นฐาน Nginx (ถ้าต้องการ Custom)

### ติดตั้งบน Windows ได้ไหม?

ได้ แต่แนะนำให้ใช้ Docker หรือ WSL2

### ใช้ SQLite หรือ PostgreSQL ดี?

- SQLite: เหมาะกับทดลอง/ใช้เล็กน้อย
- PostgreSQL: แนะนำสำหรับ Production

### อัปเดต n8n ง่ายไหม?

ง่ายมากครับ แค่รัน `npm update -g n8n` แล้วรีสตาร์ท

อ่านเพิ่มเติม: [สอน n8n: คู่มือสมบูรณ์](/blog/sorn-n8n-complete-guide/)

## สรุป: n8n พร้อมใช้งานแล้ว!

ตอนนี้คุณมี **n8n Production-ready** บนเซิร์ฟเวอร์ของคุณเองแล้ว! 🎉

คุณสามารถ:
- ✅ เข้าถึงผ่าน HTTPS
- ✅ สร้าง Workflow ได้ไม่จำกัด
- ✅ ควบคุมข้อมูลเอง 100%
- ✅ ประหยัดค่าใช้จ่าย
- ✅ ปรับแต่งได้ตามต้องการ

### ขั้นตอนถัดไป

1. **เรียนรู้การสร้าง Workflow** - [n8n Workflow Tutorial](/blog/n8n-workflow-gmail-sheet/)
2. **ศึกษา Best Practices** - [n8n Automation Introduction](/blog/n8n-automation-introduction/)
3. **ดู Case Studies** - [ระบบใบเสร็จอัตโนมัติ](/blog/receipt-system-ai-n8n/)

**ต้องการเรียนรู้เพิ่มเติม?**

📚 [คอร์ส n8n Automation ออนไลน์](https://aiunlock.co/)
💬 [ปรึกษาฟรี - สอนตัวต่อตัวที่เชียงใหม่](/contact/)
📖 [บทความเพิ่มเติมเกี่ยวกับ n8n](/blog/)

---

## บทความที่เกี่ยวข้อง

- [สอน n8n: คู่มือสมบูรณ์สำหรับผู้เริ่มต้น](/blog/sorn-n8n-complete-guide/)
- [n8n Self-host: ติดตั้งบนเซิร์ฟเวอร์ของคุณเอง](/blog/n8n-self-host-installation/)
- [n8n Automation: เริ่มต้นสร้าง Workflow](/blog/n8n-automation-introduction/)
- [เปรียบเทียบ n8n vs Vibe Coding](/blog/n8n-vs-vibe-coding/)
- [n8n Workflow: เชื่อม Gmail กับ Google Sheets](/blog/n8n-workflow-gmail-sheet/)

---

**AI Unlocked** - เรียน AI, Automation และ Vibe Coding
📧 Email: aiunlockinnovations@gmail.com
🌐 คอร์สออนไลน์: [aiunlock.co](https://aiunlock.co/)
📍 สอนส่วนตัวที่เชียงใหม่ | [ติดต่อเรา](/contact/)
