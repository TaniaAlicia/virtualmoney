
export function convertDateFormat(mmYY: string): string {
  const [mm, yy] = (mmYY || "").split("/");
  if (!mm || !yy) return "";
  const month = mm.padStart(2, "0");
  const year = `20${yy.slice(-2)}`; 
  return `${month}/${year}`;
}
