const BASE_COST = 10; // Custo fixo (embalagem e manuseio)
const COST_PER_KM = 5; // Custo por quilômetro

/**
 * Calcula o custo de frete com base na distância.
 * @param distance Distância em km
 * @returns Custo total do frete
 */
function calculateShippingCost(distance: number): number {
  if (distance < 1) {
    throw new Error("Distância mínima é de 1 km.");
  }
  return BASE_COST + distance * COST_PER_KM;
}