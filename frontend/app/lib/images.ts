// Bygger den korrekte billede-URL for en bil ud fra det gemte filnavn.
// Bruges både på "Mine Biler"-siden og på enkelt-bil-siden.
export function carImgSrc(car_image: string): string {
  if (!car_image) return "/placeholder-car.png";          // fallback (peg på en fil du har)
  if (car_image.startsWith("blob:")) return car_image;     // optimistisk preview
  return `${(globalThis as any)?.process?.env?.NEXT_PUBLIC_BACKEND_URL}/static/uploads/${car_image}`;   // rigtig fil på Flask
}
