interface PrintDocumentOptions {
  bookingCode?: string;
  isInvoice?: boolean;
}

/**
 * Utility function to handle high-fidelity cross-browser printing.
 * It copies the target printable container's inner HTML into a temporary print window,
 * compiles styles with dynamic Tailwind CSS CDN, custom web fonts, and triggers print.
 * Fallbacks to standard print if pop-up window loading is blocked or fails.
 */
export function printDocument(elementId: string, options: PrintDocumentOptions = {}): boolean {
  try {
    const printableEl = document.getElementById(elementId);
    if (printableEl) {
      const isInvoice = options.isInvoice ?? (elementId === 'printable-invoice');
      const docTitle = isInvoice 
        ? `Invoice_MYCA_Semarang_${options.bookingCode || 'Receipt'}`
        : `Tiket_Booking_MYCA_Semarang_${options.bookingCode || 'Ticket'}`;

      // Open a new dedicated focus window
      const printWindow = window.open('', '_blank', 'width=850,height=950');
      if (printWindow) {
        const htmlContent = printableEl.innerHTML;
        
        printWindow.document.write(`
          <!DOCTYPE html>
          <html lang="id">
            <head>
              <meta charset="UTF-8">
              <title>${docTitle}</title>
              <!-- Load Google Fonts -->
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
              <!-- Fetch Tailwind CSS to ensure classes render matching the main UI design -->
              <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
              <style>
                @page {
                  size: A4 portrait;
                  margin: 15mm 15mm;
                }
                body {
                  font-family: 'Inter', system-ui, -apple-system, sans-serif;
                  background-color: #f8fafc;
                  color: #0d1e2d;
                  margin: 0;
                  padding: 20px;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
                .font-display {
                  font-family: 'Space Grotesk', sans-serif;
                }
                .font-mono {
                  font-family: 'JetBrains Mono', monospace;
                }

                /* Force high-fidelity desktop style overrides in print window regardless of mobile device viewport */
                .printable-container {
                  width: 720px !important;
                  min-width: 720px !important;
                  max-width: 720px !important;
                  margin: 0 auto !important;
                  box-sizing: border-box !important;
                  background-color: #ffffff !important;
                  border-radius: 20px !important;
                  padding: 30px !important;
                }

                /* Enforce Grids & Columns for 12-column layout */
                .grid-cols-1.md\:grid-cols-12 {
                  display: grid !important;
                  grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
                  gap: 1.5rem !important;
                }

                /* For grid spans inside columns */
                .md\:col-span-8 {
                  grid-column: span 8 / span 8 !important;
                  display: block !important;
                }

                .md\:col-span-4 {
                  grid-column: span 4 / span 4 !important;
                  display: block !important;
                  text-align: right !important;
                }

                /* Enforce 2-column info grid */
                .grid-cols-1.sm\:grid-cols-2 {
                  display: grid !important;
                  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                  gap: 1.5rem !important;
                }

                /* For nested spans */
                .col-span-1.sm\:col-span-2 {
                  grid-column: span 2 / span 2 !important;
                }

                /* Enforce row layout for estimate estimates and invoices */
                .flex-col.sm\:flex-row {
                  display: flex !important;
                  flex-direction: row !important;
                  justify-content: space-between !important;
                  align-items: center !important;
                }

                /* Bank Account list grids (grid-cols-1 sm:grid-cols-2 gap-4) */
                .grid.grid-cols-1.sm\:grid-cols-2.gap-4 {
                  display: grid !important;
                  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                  gap: 1.0rem !important;
                }

                /* Alignment overrides */
                .md\:text-right, .sm\:text-right {
                  text-align: right !important;
                }

                /* Custom printable styles ensuring perfect layout in PDF files */
                @media print {
                  body {
                    background-color: #ffffff !important;
                    padding: 0 !important;
                  }
                  .printable-container {
                    border: 1px solid #1a202c !important;
                    border-radius: 0px !important;
                    box-shadow: none !important;
                    padding: 30px !important;
                    margin: 0 auto !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    min-width: 100% !important;
                  }
                  .no-print {
                    display: none !important;
                  }
                }
              </style>
            </head>
            <body class="p-4 sm:p-6 md:p-8 bg-slate-50">
              <div class="printable-container max-w-3xl mx-auto bg-white border-2 border-slate-300 p-8 rounded-3xl shadow-sm relative">
                ${htmlContent}
              </div>
              <!-- Automatic Trigger -->
              <script>
                window.onload = function() {
                  // Slight delay to ensure Tailwind and local fonts render completely
                  setTimeout(function() {
                    window.focus();
                    window.print();
                  }, 500);
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
        return true;
      }
    }
  } catch (e) {
    console.warn("Direct window.print() failed or was blocked by browser sandbox/iframe security rules:", e);
  }

  // Fallback standard option
  try {
    window.focus();
    window.print();
    return true;
  } catch (err) {
    console.error("Critical print error", err);
    return false;
  }
}
