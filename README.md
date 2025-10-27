# Surabaya Heritage Quest

A mobile-first Next.js (App Router) prototype that menggabungkan AR marker Hiro, geolocation, dan gamifikasi ringan untuk mengenalkan kampung-kampung bersejarah di Surabaya.

## Fitur

- **Landing Page** dengan daftar quest kampung, paspor lencana dari localStorage, dan daftar UMKM.
- **AR Overlay** berbasis A-Frame + AR.js untuk marker Hiro, plus Demo Mode tanpa kamera.
- **Geolocation** untuk mendeteksi kampung terdekat dan mengurutkan UMKM.
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

- Untuk AR Mode, gunakan marker Hiro: <https://raw.githubusercontent.com/AR-js-org/AR.js/master/three.js/examples/marker-training/examples/pattern-files/hiro.png>
- Demo Mode berguna untuk presentasi indoor tanpa kamera.
- Fitur geolocation membutuhkan izin pengguna dan akan menampilkan toast hasil deteksi.
