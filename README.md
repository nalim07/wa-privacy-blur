# WA Privacy Blur v1.2.0

Perbaikan utama versi ini adalah pemisahan penuh antara:

- **Blur isi chat terbuka**
- **Blur box chat / input**

## Bug yang diperbaiki

Pada versi sebelumnya selector ini terlalu luas:

```css
#main .selectable-text.copyable-text
```

WhatsApp dapat menggunakan class tersebut baik pada pesan maupun area composer.
Akibatnya fitur Blur Isi Chat dapat ikut mem-blur tulisan yang sedang diketik.

Di v1.2:

```css
#main [data-pre-plain-text]
```

digunakan khusus untuk pesan yang sudah ada di percakapan.

Sedangkan area mengetik memakai:

```css
#main footer [contenteditable="true"]
```

Kedua fitur sekarang tidak menggunakan selector yang sama.

Selain itu, composer hanya menerima `filter: blur()` pada satu elemen,
bukan parent dan child sekaligus, sehingga efek blur tidak bertumpuk.

## Update

1. Extract ZIP.
2. Buka `chrome://extensions`.
3. Hapus versi lama atau load folder v1.2 sebagai extension baru.
4. Klik **Load unpacked**.
5. Pilih folder `wa-privacy-blur-v1.2`.
6. Refresh WhatsApp Web dengan `Ctrl + Shift + R`.

Untuk pengujian:

- Blur isi chat terbuka: ON
- Blur box chat / input: OFF

Tulisan yang sedang Anda ketik seharusnya tetap terlihat normal.
