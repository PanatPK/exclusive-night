# THE EX-CLUSIVE NIGHT — E-Invitation & Check-in System

ระบบบัตรเชิญออนไลน์ + ลงทะเบียน + เช็คอินหน้างาน สำหรับงาน STIEBEL ELTRON
วันอังคารที่ 6 ตุลาคม 2026 · Renaissance Bangkok Ratchaprasong Hotel

---

## ไฟล์ในชุดนี้

| ไฟล์ | ใช้ทำอะไร | ใครใช้ |
|---|---|---|
| `index.html` | บัตรเชิญ ลูกบิดหมุนเปิดข้อมูล | แขกรับเชิญ |
| `rsvp.html` | ฟอร์มตอบรับ (QR พามาที่หน้านี้) | แขกรับเชิญ |
| `admin.html` | แดชบอร์ดยอดตอบรับ ค้นหา ดาวน์โหลด CSV | ทีมงาน |
| `scan.html` | สแกน QR เช็คอินหน้างาน | สตาฟหน้างาน |
| `config.js` | ตั้งค่ากลาง แก้ไฟล์เดียวมีผลทุกหน้า | คนติดตั้ง |

ทั้ง 4 หน้าใช้ `config.js` ร่วมกัน **ต้องอัปโหลดไปไว้โฟลเดอร์เดียวกันเสมอ**

---

## ขั้นที่ 1 — ขึ้นเว็บด้วย GitHub Pages (ฟรี ใช้เวลาราว 5 นาที)

1. ไปที่ github.com กด **New repository** ตั้งชื่อเช่น `exclusive-night` เลือก **Public** แล้วกด Create
2. ในหน้า repo กด **Add file → Upload files** ลากไฟล์ทั้ง 5 ไฟล์ในโฟลเดอร์นี้เข้าไป (ไม่ต้องลากตัวโฟลเดอร์) กด **Commit changes**
3. ไปแท็บ **Settings → Pages** ตรง Source เลือก **Deploy from a branch** เลือก branch `main` โฟลเดอร์ `/ (root)` กด **Save**
4. รอประมาณ 1–2 นาที แล้วรีเฟรช จะได้ลิงก์หน้าตาแบบนี้

```
บัตรเชิญ    https://<ชื่อบัญชี>.github.io/exclusive-night/
ฟอร์ม       https://<ชื่อบัญชี>.github.io/exclusive-night/rsvp.html
แดชบอร์ด    https://<ชื่อบัญชี>.github.io/exclusive-night/admin.html
สแกนเนอร์   https://<ชื่อบัญชี>.github.io/exclusive-night/scan.html
```

GitHub Pages เป็น https อยู่แล้ว กล้องในหน้าสแกนจึงทำงานได้ทันที
QR บนบัตรเชิญจะชี้ไปที่ `rsvp.html` ในโฟลเดอร์เดียวกันโดยอัตโนมัติ ไม่ต้องตั้งค่าอะไร

---

## ขั้นที่ 2 — ต่อ Firebase เพื่อเก็บข้อมูลจริง

ถ้ายังไม่ต่อ ระบบจะทำงานได้ครบทุกหน้าจอ แต่ข้อมูลจะอยู่แค่ในเครื่องที่กรอก แดชบอร์ดกับสแกนเนอร์จะไม่เห็นกัน

1. เข้า console.firebase.google.com กด **Add project**
2. เมนูซ้าย **Build → Realtime Database → Create Database**
   เลือก region **asia-southeast1 (Singapore)** เพราะใกล้ไทยที่สุด
3. เลือก **Start in test mode** ไปก่อน แล้วกด Enable
4. ก๊อป Database URL ด้านบน (ลงท้าย `.firebasedatabase.app`) มาวางใน `config.js`

```js
db: {
  url : "https://exclusive-night-default-rtdb.asia-southeast1.firebasedatabase.app",
  path: "rsvps",
  auth: ""
}
```

5. อัปโหลด `config.js` ทับของเดิมบน GitHub
6. ที่แท็บ **Rules** ของ Realtime Database วางกฎนี้ระหว่างช่วงเปิดรับตอบรับ

```json
{
  "rules": {
    "rsvps": { ".read": true, ".write": true }
  }
}
```

> **หลังปิดรับตอบรับ** เปลี่ยน `".write"` เป็น `false` เพื่อล็อกไม่ให้มีใครส่งข้อมูลเข้ามาเพิ่ม
> และหลังจบงานให้ดาวน์โหลด CSV เก็บไว้ แล้วลบข้อมูลออกจาก Firebase ตามหลัก PDPA

---

## ขั้นที่ 3 — ทดสอบก่อนส่งลูกค้า

- [ ] เปิดบัตรเชิญ หมุนลูกบิดครบทั้ง 5 จุด มีเสียงคลิก ข้อมูลขึ้นถูกต้อง
- [ ] สแกน QR ด้วยมือถือจริง ต้องเด้งเข้าหน้าฟอร์มพร้อมรหัสบัตร
- [ ] กรอกฟอร์มทดสอบ 1 ใบ แล้วเปิดแดชบอร์ดดูว่ายอดขึ้นไหม
- [ ] เปิดหน้าสแกน กดเปิดกล้อง ยิง Entry Pass ของใบทดสอบ ต้องขึ้นเขียว
- [ ] ยิงซ้ำใบเดิม ต้องขึ้นเหลืองว่าเช็คอินไปแล้ว
- [ ] ลบข้อมูลทดสอบออกจาก Firebase ก่อนส่งงานจริง

---

## การส่งบัตรเชิญรายบุคคล

ต่อท้าย URL ด้วยรหัสและชื่อ ระบบจะแสดงชื่อบนบัตรและเติมในฟอร์มให้อัตโนมัติ

```
https://<ชื่อบัญชี>.github.io/exclusive-night/?code=EX-2026-042&name=คุณสมชาย ใจดี
```

รหัสบัตรจะถูกบันทึกไปกับข้อมูลลงทะเบียน ทำให้ตรวจสอบย้อนได้ว่าใบไหนตอบรับกลับมาแล้วบ้าง

## เคาน์เตอร์ลงทะเบียนหลายจุด

เปิดหน้าสแกนคนละลิงก์ ระบบจะบันทึกว่าเช็คอินจากเคาน์เตอร์ไหน

```
scan.html?counter=1
scan.html?counter=2
scan.html?counter=3
```

---

จัดทำโดย QOOKID Creation · 09-8794-9262 · center@qookid.co.th
