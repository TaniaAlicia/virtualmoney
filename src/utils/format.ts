export const formatDoc = (dni?: number | string) => {
  if (dni == null) return "—";
  const s = String(dni).replace(/\D/g, "");

  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};