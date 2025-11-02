// src/utils/downloadServiceReceiptPDF.ts
import jsPDF from "jspdf";

export type ServiceReceiptInput = {
  amount: number; // en ARS (positivo)
  dated: Date; // fecha/hora
  serviceName: string; // p.ej. "Cablevisión"
  cardMasked: string; // p.ej. "Visa ************3241"
  operationCode?: string; // opcional; si no viene, se genera uno
  accountHolderName?: string; // opcional para usar en "De"
  accountHolderCvu?: string; // opcional para usar en "De"
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
  // "10 de agosto de 2022 a las 16:34 hs."
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
  const doc = new jsPDF({ unit: "pt", format: "a4" }); // 595 x 842 pt aprox
  const W = doc.internal.pageSize.getWidth();
  const M = 48; // margen

  // Colores
  const dark = "#171717";
  const light = "#ffffff";
  const green = "#C1FD35"; // tu verde UI
  const text = "#0f0f0f";
  const gray = "#e8e8e8";

  // Fondo
  doc.setFillColor(dark);
  doc.rect(0, 0, W, doc.internal.pageSize.getHeight(), "F");

  // Banner superior
  const bannerH = 64;
  doc.setFillColor(green);
  doc.rect(M + 10, M, W - (M + 10) * 2, bannerH, "F");

  doc.setTextColor(text);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("DIGITAL", M + 28, M + 40);
  doc.setFillColor(dark);
  // “etiqueta” oscura para “MONEY HOUSE”
  const tagX = M + 120;
  const tagY = M + 18;
  const tagW = 190;
  const tagH = 30;
  doc.setFillColor(dark);
  doc.roundedRect(tagX, tagY, tagW, tagH, 6, 6, "F");
  doc.setTextColor(light);
  doc.setFontSize(16);
  doc.text("MONEY HOUSE", tagX + 12, M + 40);

  // Título y fecha
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

  // Tarjeta principal blanca
  const cardY = M + bannerH + 80;
  const cardH = 440;
  doc.setFillColor(light);
  doc.roundedRect(M + 10, cardY, W - (M + 10) * 2, cardH, 10, 10, "F");

  const x = M + 28;
  let y = cardY + 34;

  // Encabezado “Transferencia / Pago de servicio” y Monto
  doc.setTextColor(text);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Pago de servicio", x, y);
  y += 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(currency(amount), x, y);
  y += 14;

  // Separador
  y += 16;
  doc.setDrawColor(gray);
  doc.setLineWidth(0.8);
  doc.line(x, y, W - x, y);
  y += 28;

  // “Para”
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#666");
  doc.setFontSize(12);
  doc.text("Para", x, y);
  y += 22;
  doc.setTextColor(text);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(serviceName, x, y);

  // “Tarjeta”
  y += 34;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor("#666");
  doc.text("Tarjeta", x, y);
  y += 18;
  doc.setTextColor(text);
  doc.text(cardMasked, x, y);

  // (Opcional) Datos del emisor (De:)
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

  // Separador
  y += 16;
  doc.setDrawColor(gray);
  doc.setLineWidth(0.8);
  doc.line(x, y, W - x, y);
  y += 28;

  // Código de operación
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

  // Guardar
  doc.save(`comprobante_${code}.pdf`);
}
