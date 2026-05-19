
movie-management-app/
client/     Frontend — React + TypeScript + Tailwind CSS
servers/    Backend — Express + Prisma 7 + SQLite
```

---
ติดตั้ง
1. ติดตั้ง Dependencies
bash
# Backend
cd servers
npm install

# Frontend (เปิด terminal ใหม่)
cd client
npm install

2. ตั้งค่า Backend
สร้างฐานข้อมูล + รัน migration

cd servers
npx prisma migrate dev
npx prisma generate
ฐานข้อมูล SQLite จะถูกสร้างที่ `servers/prisma/dev.db`
npm run dev
เซิร์ฟเวอร์ทำงานที่ `http://localhost:5000`

3. รัน Frontend

cd client
npm run dev

เปิดเบราว์เซอร์ที่ `http://localhost:5173`


ค่าที่รองรับ: `MANAGER` | `TEAMLEADER` | `FLOORSTAFF`


Feature

- แสดงรายชื่อหนัง — ดึงข้อมูลจาก backend แสดงเป็นการ์ด
- เพิ่มหนัง — กรอก title, year, rating ผ่านฟอร์ม
- แก้ไขหนัง — กดปุ่มรูปดินสอ แก้ไขผ่าน modal (เฉพาะ MANAGER)
- ลบหนัง — กดปุ่มถังขยะ ลบ (เฉพาะ MANAGER)
- Role-based UI — เลือก role จาก dropdown บน header
- `MANAGER` — เห็นปุ่มแก้ไข + ลบ
- `TEAMLEADER` / `FLOORSTAFF` — เห็นแค่รายการหนัง




Frontend
 React 19  UI framework 
 TypeScript  Type safety 
 MobX-State-Tree 7  State management 
 Tailwind CSS 4  Styling 
 Axios  HTTP client 
 Lucide React  Icons 
 Vite 8  Build tool 

Backend
 Express 5  Web framework 
 Prisma 7 + SQLite  ORM + Database 
 TypeScript  Type safety 
 ts-node-dev  Hot reload dev server 


- ฐานข้อมูล SQLite (`dev.db`) อยู่ใน `servers/prisma/` — ลบได้ถ้าต้องการเริ่มใหม่
- Prisma 7 ใช้ `prisma.config.ts` แทนการ config URL ใน `schema.prisma`
- Frontend ส่ง `x-user-role` header ผ่าน axios interceptor อัตโนมัติ
"# movie-management-app" 
