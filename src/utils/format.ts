export const formatDoc = (dni?: number | string) => {
  if (dni == null) return "—";
  const s = String(dni).replace(/\D/g, "");
  // ejemplo simple: 12.345.678
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};