interface PrintDocumentOptions {
  bookingCode?: string;
  isInvoice?: boolean;
}

export function printDocument(elementId: string, options: PrintDocumentOptions = {}): boolean {
  try {
    const printableEl = document.getElementById(elementId);
    if (!printableEl) return false;

    const isInvoice = options.isInvoice ?? (elementId === 'printable-invoice');
    const docTitle = isInvoice
      ? `Invoice_MYCA_${options.bookingCode || 'Receipt'}`
      : `Tiket_MYCA_${options.bookingCode || 'Ticket'}`;

    const htmlContent = printableEl.innerHTML;

    // Hapus iframe lama kalau ada
    const oldFrame = document.getElementById('__print_frame__');
    if (oldFrame) oldFrame.remove();

    const iframe = document.createElement('iframe');
    iframe.id = '__print_frame__';
    iframe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;border:none;visibility:hidden;';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return false;

    doc.open();
    doc.write(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${docTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: #f8fafc;
      color: #0d1e2d;
      margin: 0;
      padding: 20px;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .printable-container {
      width: 720px;
      max-width: 720px;
      margin: 0 auto;
      background: #fff;
      border-radius: 20px;
      padding: 30px;
      box-sizing: border-box;
    }
    .grid-cols-1.md\\:grid-cols-12 {
      display: grid !important;
      grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
      gap: 1.5rem !important;
    }
    .md\\:col-span-8 { grid-column: span 8 / span 8 !important; }
    .md\\:col-span-4 { grid-column: span 4 / span 4 !important; text-align: right !important; }
    .grid-cols-1.sm\\:grid-cols-2 {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 1.5rem !important;
    }
    .col-span-1.sm\\:col-span-2 { grid-column: span 2 / span 2 !important; }
    .flex-col.sm\\:flex-row {
      display: flex !important;
      flex-direction: row !important;
      justify-content: space-between !important;
      align-items: center !important;
    }
    .grid.grid-cols-1.sm\\:grid-cols-2.gap-4 {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 1rem !important;
    }
    .md\\:text-right, .sm\\:text-right { text-align: right !important; }
    @media print {
      body { background: #fff !important; padding: 0 !important; }
      .printable-container {
        border: 1px solid #1a202c !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        width: 100% !important;
        max-width: 100% !important;
        padding: 30px !important;
        margin: 0 auto !important;
      }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="printable-container">
    ${htmlContent}
  </div>
  <script>
    // Tunggu Tailwind selesai render sebelum print
    function tryPrint() {
      window.focus();
      window.print();
    }
    if (document.readyState === 'complete') {
      setTimeout(tryPrint, 1200);
    } else {
      window.onload = function() { setTimeout(tryPrint, 1200); };
    }
  <\/script>
</body>
</html>`);
    doc.close();

    // Bersihkan iframe setelah print selesai
    iframe.contentWindow?.addEventListener('afterprint', () => {
      setTimeout(() => iframe.remove(), 500);
    });

    return true;
  } catch (e) {
    console.warn('Print via iframe gagal:', e);
    // Fallback: print halaman langsung
    try {
      window.print();
      return true;
    } catch (err) {
      console.error('Critical print error', err);
      return false;
    }
  }
}
