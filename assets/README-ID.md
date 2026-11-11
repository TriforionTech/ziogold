# Paket aset web ZioGold

Aset dibuat dari `ziogold-logo.jpg` yang diberikan. Paket ini menyiapkan ikon browser, ikon ponsel/PWA, logo transparan, dan gambar preview berbagi.

## Isi paket

| File | Kegunaan |
|---|---|
| `favicon.ico` | Favicon multiukuran 16, 32, dan 48 px untuk dukungan browser umum |
| `favicon.svg` | Favicon SVG mandiri; gambar logo di dalamnya tetap raster dari sumber |
| `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png` | Favicon PNG eksplisit |
| `apple-touch-icon.png` | Ikon iPhone/iPad, 180×180 px |
| `android-chrome-192x192.png`, `android-chrome-512x512.png` | Ikon Android/PWA |
| `android-chrome-maskable-192x192.png`, `android-chrome-maskable-512x512.png` | Versi maskable dengan ruang aman untuk pemotongan bentuk ikon |
| `site.webmanifest` | Manifest PWA; saat ini mengasumsikan file ikon berada di `/assets/` |
| `og-image.jpg` | Gambar preview WhatsApp, Facebook, dan Open Graph; JPEG 1200×630 px |
| `logo-transparent.png` | Logo hasil ekstraksi latar hitam, PNG transparan 2× untuk pemakaian web |
| `head-snippet.html` | Contoh tag favicon, Open Graph/Twitter Card, dan JSON-LD untuk ditempel ke `<head>` |

## Cara pasang

1. Unggah aset ke folder publik situs (contoh: `public/assets/` sehingga URL-nya menjadi `/assets/...`).
2. Salin isi `head-snippet.html` ke bagian `<head>` situs. Ganti `yourdomain.com`, nama brand jika ejaan resminya berbeda, judul halaman, dan deskripsinya.
3. Pastikan `og-image.jpg` bisa dibuka lewat URL HTTPS publik tanpa login. Tag Open Graph itulah yang dipakai WhatsApp untuk preview saat link dibagikan; tidak perlu file favicon khusus WhatsApp.
4. Jika situs dipasang di subfolder, sesuaikan path di `site.webmanifest` dan snippet HTML. Setelah deploy, cache preview dari aplikasi sosial kadang perlu di-refresh.

## Catatan kualitas sumber

File sumber berupa JPEG 320×320 px dan logo hanya sekitar 165 px lebarnya. Ikon kecil dan kartu preview sudah dibuat pada ukuran standar, tetapi pembesaran tidak menambah detail asli. Untuk logo header berukuran besar atau materi cetak, mintalah file master beresolusi tinggi atau vektor asli (SVG/AI/PDF). `favicon.svg` adalah pembungkus SVG mandiri dengan gambar raster tertanam, bukan hasil gambar ulang vektor.
