/* ============================================================
   THE EX-CLUSIVE NIGHT — ตั้งค่ากลาง
   แก้ไฟล์นี้ไฟล์เดียว มีผลกับทุกหน้า (index / rsvp / admin / scan)
   ============================================================ */
window.EXN = {

  /* ---------- Firebase Realtime Database ----------
     1) console.firebase.google.com → สร้าง Project
     2) Build → Realtime Database → Create Database → region: asia-southeast1
     3) ก๊อป URL ที่ได้ (ลงท้าย .firebasedatabase.app) มาวางที่ url ด้านล่าง
     4) แท็บ Rules วางตามนี้ระหว่างเปิดรับลงทะเบียน:
        { "rules": { "rsvps": { ".read": true, ".write": true } } }
     ถ้าเว้น url ว่างไว้ = โหมดเดโม เก็บข้อมูลในเครื่องที่กรอกเท่านั้น
  -------------------------------------------------- */
  db: {
    url : "",          /* เช่น "https://exclusive-night-default-rtdb.asia-southeast1.firebasedatabase.app" */
    path: "rsvps",
    auth: ""           /* ไม่บังคับ */
  },

  /* ---------- ลิงก์ที่ QR บนบัตรเชิญจะพาไป ----------
     เว้นว่างไว้ = ใช้ rsvp.html ในโฟลเดอร์เดียวกันอัตโนมัติ (แนะนำ)
     ใส่เองเมื่อหน้าแบบฟอร์มอยู่คนละโดเมน
  -------------------------------------------------- */
  rsvpURL: ""
};
