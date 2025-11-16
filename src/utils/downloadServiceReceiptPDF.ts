import jsPDF from "jspdf";

export type ServiceReceiptInput = {
  amount: number;
  dated: Date;
  serviceName: string;
  cardMasked: string;
  operationCode?: string;
  accountHolderName?: string;
  accountHolderCvu?: string;
  operationType?: "payService" | "addMoney";
};

const currency = (n: number) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS" });

const formatDateTime = (d: Date) => {
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return (
    new Intl.DateTimeFormat("es-AR", opts).format(d).replace(", ", " a las ") +
    " hs."
  );
};

export function downloadServiceReceiptPDF({
  amount,
  dated,
  serviceName,
  cardMasked,
  operationCode,
  accountHolderName,
  accountHolderCvu,
  operationType,
}: ServiceReceiptInput) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const M = 48;

  const dark = "#171717";
  const light = "#ffffff";
  const green = "#C1FD35";
  const text = "#0f0f0f";
  const gray = "#e8e8e8";

  doc.setFillColor(dark);
  doc.rect(0, 0, W, doc.internal.pageSize.getHeight(), "F");

  const bannerH = 64;
  doc.setFillColor(green);
  doc.rect(M + 10, M, W - (M + 10) * 2, bannerH, "F");

  doc.setTextColor(text);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("DIGITAL", M + 28, M + 40);
  doc.setFillColor(dark);
  const tagX = M + 120;
  const tagY = M + 18;
  const tagW = 190;
  const tagH = 30;
  doc.setFillColor(dark);
  doc.roundedRect(tagX, tagY, tagW, tagH, 6, 6, "F");
  doc.setTextColor(light);
  doc.setFontSize(16);
  doc.text("MONEY HOUSE", tagX + 12, M + 40);

  doc.setTextColor(green);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  const title =
    operationType === "addMoney"
      ? "Comprobante de carga de dinero"
      : "Comprobante de pago de servicio";
  doc.text(title, M + 10, M + bannerH + 40);

  doc.setTextColor(light);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(formatDateTime(dated), M + 10, M + bannerH + 60);

  const cardY = M + bannerH + 80;
  const cardH = 440;
  doc.setFillColor(light);
  doc.roundedRect(M + 10, cardY, W - (M + 10) * 2, cardH, 10, 10, "F");

  const x = M + 28;
  let y = cardY + 34;

  doc.setTextColor(text);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Pago de servicio", x, y);
  y += 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(currency(amount), x, y);
  y += 14;

  y += 16;
  doc.setDrawColor(gray);
  doc.setLineWidth(0.8);
  doc.line(x, y, W - x, y);
  y += 28;

  doc.setFont("helvetica", "normal");
  doc.setTextColor("#666");
  doc.setFontSize(12);
  doc.text("Para", x, y);
  y += 22;
  doc.setTextColor(text);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(serviceName, x, y);

  y += 34;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor("#666");
  doc.text("Tarjeta", x, y);
  y += 18;
  doc.setTextColor(text);
  doc.text(cardMasked, x, y);

  if (accountHolderName || accountHolderCvu) {
    y += 30;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor("#666");
    doc.text("De", x, y);
    y += 20;
    doc.setTextColor(text);
    if (accountHolderName) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(accountHolderName, x, y);
      y += 18;
    }
    if (accountHolderCvu) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`CVU: ${accountHolderCvu}`, x, y);
      y += 16;
    }
  }

  y += 16;
  doc.setDrawColor(gray);
  doc.setLineWidth(0.8);
  doc.line(x, y, W - x, y);
  y += 28;

  const code =
    operationCode ||
    String(Date.now()).slice(-7) +
      String(Math.floor(Math.random() * 900) + 100);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#666");
  doc.setFontSize(12);
  doc.text("Código de operación", x, y);
  y += 18;
  doc.setTextColor(text);
  doc.text(code, x, y);

  doc.save(`comprobante_${code}.pdf`);
}
