/**
 * Curadoria operacional do catálogo Lean.
 * Os 55 produtos continuam disponíveis na Loja; estas camadas definem a ordem
 * de apresentação sem apagar nem promover automaticamente todo o catálogo.
 */
export const CATALOG_TIERS = {
  curated15: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  launch5: [1, 6, 10, 13, 14],
  featured3: [1, 6, 10],
} as const;

export const FEATURED_PRODUCT_IDS = CATALOG_TIERS.featured3;
