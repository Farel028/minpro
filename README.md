# Surabaya Heritage Quest

A mobile-first Next.js (App Router) prototype that menggabungkan AR berbasis GPS, geolocation, dan gamifikasi ringan untuk mengenalkan situs-situs bersejarah di Surabaya.

## Fitur

- **Landing Page** dengan daftar quest situs sejarah dan paspor lencana dari localStorage.
- **AR Overlay** berbasis A-Frame + AR.js dengan marker hologram yang muncul di koordinat GPS, plus Demo Mode tanpa kamera.
- **Geolocation** untuk mendeteksi situs terdekat dan menampilkan jarak di landing page.
- **Progress Badges** yang disimpan di `localStorage` (`shq_badges_v1`).

## Teknologi

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS 3
- A-Frame + AR.js (via CDN)

## Pengembangan

1. Instal dependensi (butuh akses npm registry):

   ```bash
   npm install
   ```

2. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

   Aplikasi akan tersedia di `http://localhost:3000`.

## Catatan

- Mode AR memerlukan izin kamera dan GPS agar marker hologram dapat muncul di lokasi sebenarnya.
- Demo Mode berguna untuk presentasi indoor tanpa kamera.
- Fitur geolocation membutuhkan izin pengguna dan akan menampilkan toast hasil deteksi.
