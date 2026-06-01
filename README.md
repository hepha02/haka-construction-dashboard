# HAKA Construction Admin

공사비 관리용 관리자 대시보드입니다.

## 실행

```powershell
npm install
npm run dev
```

## Supabase 연결

Supabase SQL Editor에서 `supabase/schema.sql`을 실행한 뒤 GitHub Pages 환경 변수 또는 로컬 `.env`에 아래 값을 넣습니다.

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```
