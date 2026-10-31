# ZIOGOLD — Website Multi-Page Resmi (v22 · Final Bahasa Indonesia Copywriting)

Website multi-page statis resmi **ZIOGOLD** dengan sistem desain obsidian & emas (`Onest` font, precompiled Tailwind CSS v3.4.17, zero-reflow single-`rAF` scroll engine), disusun mengikuti **Naskah Final Bahasa Indonesia** secara presisi tanpa salah improvisasi, tanpa simbol em/en-dash (`—` / `–`), tanpa emoticon/emoji, tanpa Discord/Forex, dan tanpa halaman/elemen Broker/HFM.

---

## Struktur Halaman (6 Rute Aktif)

1. **`/` (`index.html` — Beranda)**
   Memuat seluruh **13 bagian naskah final** secara lengkap dan berurutan:
   - `01.` **Hero Section** (`Jangan Sekadar Mengikuti Harga, Pahami Pasarnya Bersama ZIOGOLD.` · `Penggagas Metode H1 · Wait and See` · Foto potret ZIOGOLD & kartu dock `t.me/ziogoldmaker` dipertahankan persis)
   - `02.` **Highlight** (`Trading Bukan Sekadar Mencari Profit. Saatnya Belajar dan Berkembang Bersama.` · `9K+ Anggota VIP`, `44K+ Total Anggota Komunitas`, `600+ Pips Potensi Pergerakan Harian`, `5+ Tahun Pengalaman Trading`)
   - `03.` **About ZIOGOLD** (`Bukan Perjalanan yang Instan. Ini Proses di Balik ZIOGOLD.` · 9 fase lengkap perjalanan `2019` hingga `2026`)
   - `04.` **Why ZIOGOLD** (`Lebih dari Sekadar Sinyal Trading.` · `01` Analisis dan Sinyal XAUUSD, `02` Metode H1 ZIOGOLD, `03` Belajar Trading Gratis, `04` Komunitas Global & VIP)
   - `05.` **Akses Komunitas** (`Temukan Ruang Belajar dan Berkembang Bersama ZIOGOLD.` · Perbandingan `GLOBAL COMMUNITY` & `VIP COMMUNITY`)
   - `06.` **Kolaborasi & Clipper** (`Berkarya dan Berkembang Bersama ZIOGOLD.` · Brand Partnership, Clipper Program, Panduan Konten, Cara Bergabung)
   - `07.` **Creator & Social Media** (`Kenali ZIOGOLD Lebih Dekat, di Luar Telegram.` · TikTok, Instagram, Facebook, Threads, Telegram Global)
   - `08.` **Aktivitas Komunitas** (`Lebih Dekat dengan Aktivitas Komunitas ZIOGOLD.` · Market Analysis, Live Trading, Trading Education, Community Discussion)
   - `09.` **Frequently Asked Questions** (`Temukan Jawabannya Sebelum Bergabung.` · 13 tanya-jawab akordeon lengkap `01.` s/d `13.`)
   - `10.` **Kontak Resmi & Pengingat Keamanan** (`Ada Pertanyaan? Hubungi Tim ZIOGOLD.` + `Lindungi Diri Anda dari Penipuan.`)
   - `11.` **Bergabung Bersama ZIOGOLD** (`Perjalanan Trading Anda Bisa Dimulai dari Sini.` · `Wait and See.`)
   - `12.` **Pernyataan Risiko** (`Trading Memiliki Risiko. Pahami Sebelum Memulai.` · `TRADE RESPONSIBLY. UNDERSTAND THE RISK. RESPECT THE PROCESS.`)
   - `13.` **Footer** (`ZIOGOLD`, `QUICK LINKS`, `OFFICIAL SOCIALS`, `STAY CONNECTED` · `*WAIT AND SEE.`, `© 2026 ZIOGOLD. All Rights Reserved.`)

2. **`/about/` (`Tentang ZIOGOLD`)** — Profil kreator, prinsip *Metode H1 · Wait and See*, linimasa 9 fase `2019–2026`, serta ruang dokumentasi aktivitas komunitas.
3. **`/education/` (`Edukasi Trading`)** — Materi pembelajaran gratis (Dasar XAUUSD, Teknikal & Fundamental, Support & Resistance, Supply & Demand, Fibonacci, Money Management), ilustrasi skenario *Metode H1 · Wait and See*, dan pencarian glosarium istilah XAUUSD.
4. **`/merchandise/` (`Merchandise Resmi`)** — Katalog produk komunitas (`ZIOGOLD Signature Cap`, `ZIOGOLD Heavyweight Tee`, `Wait and See Pullover Hoodie`), alur pemesanan melalui kontak resmi, dan tabel panduan ukuran.
5. **`/contact/` (`Kontak Resmi`)** — Direktori kanal terverifikasi, pengingat keamanan anti-penipuan, dan formulir kontak resmi dengan dukungan prapilih kategori (`?kategori=Merchandise`, `Akses VIP`, `Kolaborasi`).
6. **`/legal/` (`Kebijakan & Pernyataan Risiko`)** — Pernyataan Risiko XAUUSD (sesuai naskah final), Kebijakan Privasi, Ketentuan Penggunaan, dan Ketentuan Merchandise.

---

## Cara Memperbarui Tautan & Angka Komunitas (`assets/zio-registry.js`)

Seluruh tautan kanal dan angka sorotan dikelola secara terpusat di **`assets/zio-registry.js`**:

- **Tautan Aktif Terverifikasi:**
  - `telegramGlobal`: `https://t.me/ziogoldmaker`
  - `tiktok`: `https://vt.tiktok.com/ZSHW8mbw73KdU-eOZhW/`
  - `instagram`: `https://www.instagram.com/ziogold_/`
- **Slot Kanal Siap Isi (saat ini `""`):**
  - `facebook`, `threads`, `youtube`, `whatsapp`, `marketplaceCap`, `marketplaceTee`, `marketplaceHoodie`
  - Selama bernilai `""`, klik pada tautan tersebut menampilkan pemberitahuan sopan berbahasa Indonesia yang mengarahkan pengunjung ke Telegram Global resmi tanpa menghasilkan tautan rusak. Begitu URL resmi diisikan, seluruh halaman otomatis mengarah ke URL tersebut.

---

## Build & Audit Otomatis

Untuk membangun ulang seluruh halaman, mengompilasi ulang CSS, menjalankan audit kepatuhan naskah, dan menyinkronkan ke Live Preview:

```bash
python3 /home/user/scripts/build_site.py
```
