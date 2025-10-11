---
title: "ตั้งค่า Workflow แรกใน n8n เชื่อม Gmail กับ Spreadsheet"
description: "สอนวิธีสร้าง Workflow ใน n8n เพื่อบันทึกอีเมลใน Google Spreadsheet"
pubDate: 2025-10-25T00:00:00+07:00
tags: ["Workflow n8n Gmail", "เชื่อม n8n Gmail", "Google Sheets Automation", "n8n Tutorial"]
slug: "n8n-workflow-gmail-sheet"
---
การสร้าง Workflow แรกใน n8n เป็นเรื่องง่ายและช่วยประหยัดเวลามาก ตัวอย่างนี้เราจะเชื่อม Gmail กับ Google Spreadsheet เพื่อบันทึกข้อมูลอีเมลอัตโนมัติ เริ่มจากสร้าง Credential สำหรับ Gmail API และ Google Sheets ใน n8n จากนั้นสร้าง Trigger "Gmail" เพื่อดึงอีเมลเข้า

ต่อไปสร้าง Node "Google Sheets" แล้วเลือกสเปรดชีตที่ต้องการบันทึกข้อมูล จัดเรียงคอลัมน์ให้ตรงกับข้อมูลที่ต้องการเก็บ เช่น วันที่ ผู้ส่ง และหัวข้ออีเมล เชื่อมต่อ Node ระหว่าง Gmail และ Google Sheets และทดสอบ Workflow เมื่อตั้งค่าถูกต้อง ทุกครั้งที่มีอีเมลใหม่ ระบบจะบันทึกข้อมูลลงในสเปรดชีตอัตโนมัติ

สำหรับผู้เริ่มต้น การทำ Workflow แบบนี้ช่วยให้เข้าใจพื้นฐานการใช้งาน n8n เมื่อคุ้นเคยแล้วคุณสามารถสร้างเวิร์กโฟลว์ที่ซับซ้อนขึ้น เช่น การวิเคราะห์เนื้อหาอีเมลหรือส่งการแจ้งเตือนเพิ่มเติม ดูบทเรียนเต็มได้ที่ [n8n course](https://www.aiunlockinnovations.com/n8n-course)

![ภาพ Workflow n8n Gmail-Spreadsheet](n8n-gmail-sheet.jpg "Workflow n8n Gmail กับ Google Sheets")
