// cross: produtos complementares (mesmo cliente, necessidade diferente)
// up:    versão mais completa/premium (mais caro ou mais ativos)
// down:  entrada mais acessível (fórmula mais simples)

export const PRODUCT_RELATIONS: Record<number, {
  cross: number[];
  up: number[];
  down: number[];
}> = {
  // --- ADELGAZAMIENTO ---
  1:  { cross: [4, 43, 8],    up: [40],     down: [33] },
  2:  { cross: [35, 1, 43],   up: [40],     down: [33] },
  3:  { cross: [4, 43, 50],   up: [],       down: [33] },
  4:  { cross: [3, 34, 43],   up: [],       down: [33] },
  33: { cross: [4, 3, 43],    up: [1, 18],  down: [] },
  34: { cross: [4, 42, 45],   up: [1],      down: [] },
  40: { cross: [43, 35, 49],  up: [],       down: [1, 2] },

  // --- RENDIMIENTO FISICO ---
  5:  { cross: [47, 54, 7],   up: [25],     down: [47] },
  6:  { cross: [41, 20, 53],  up: [41],     down: [46] },
  7:  { cross: [20, 28, 48],  up: [],       down: [49] },
  8:  { cross: [38, 28, 54],  up: [],       down: [46] },
  38: { cross: [8, 28, 50],   up: [],       down: [7] },
  46: { cross: [8, 30, 54],   up: [8],      down: [52] },
  54: { cross: [8, 47, 27],   up: [5],      down: [46] },

  // --- DERMOCOSMETICOS ---
  9:  { cross: [10, 11, 55],  up: [55],     down: [12] },
  10: { cross: [9, 11, 55],   up: [55],     down: [12] },
  11: { cross: [9, 55, 13],   up: [55],     down: [12] },
  12: { cross: [10, 9, 11],   up: [55],     down: [] },
  55: { cross: [9, 10, 13],   up: [],       down: [11, 12] },

  // --- BELLEZA ---
  13: { cross: [11, 14, 16],  up: [14],     down: [17] },
  14: { cross: [45, 16, 13],  up: [16],     down: [45] },
  15: { cross: [22, 45, 26],  up: [],       down: [22] },
  16: { cross: [53, 27, 49],  up: [],       down: [13, 53] },
  45: { cross: [37, 15, 36],  up: [14],     down: [37] },

  // --- SALUD ---
  17: { cross: [43, 49, 53],  up: [43],     down: [51] },
  18: { cross: [53, 50, 43],  up: [],       down: [33] },
  19: { cross: [17, 21],      up: [],       down: [] },
  20: { cross: [7, 48, 29],   up: [],       down: [48] },
  35: { cross: [2, 43, 50],   up: [2],      down: [33] },
  36: { cross: [37, 53, 45],  up: [],       down: [37] },
  37: { cross: [36, 45, 7],   up: [36],     down: [45] },
  41: { cross: [6, 53, 16],   up: [],       down: [6] },
  42: { cross: [4, 34, 45],   up: [],       down: [34] },
  43: { cross: [50, 18, 17],  up: [],       down: [52] },
  44: { cross: [43, 17, 51],  up: [],       down: [51] },
  48: { cross: [20, 7, 29],   up: [20],     down: [29] },
  49: { cross: [17, 37, 45],  up: [],       down: [7] },
  50: { cross: [43, 38, 18],  up: [43],     down: [52] },
  51: { cross: [44, 17, 53],  up: [44],     down: [] },
  52: { cross: [43, 23, 17],  up: [43],     down: [] },
  53: { cross: [18, 16, 43],  up: [18],     down: [52] },

  // --- MUJER ---
  21: { cross: [23, 24, 22],  up: [24],     down: [22] },
  22: { cross: [15, 45, 21],  up: [15],     down: [45] },
  23: { cross: [21, 17, 52],  up: [21],     down: [52] },
  24: { cross: [21, 7, 48],   up: [],       down: [21] },

  // --- HOMBRE ---
  25: { cross: [47, 27, 39],  up: [],       down: [5] },
  26: { cross: [25, 22],      up: [15],     down: [] },
  27: { cross: [53, 54, 17],  up: [16],     down: [53] },
  28: { cross: [38, 7, 8],    up: [38],     down: [7] },
  39: { cross: [25, 27, 17],  up: [],       down: [17] },
  47: { cross: [25, 54, 27],  up: [5],      down: [] },

  // --- LÍNEA HOME ---
  29: { cross: [30, 31, 20],  up: [20],     down: [32] },
  30: { cross: [29, 6, 46],   up: [6],      down: [32] },
  31: { cross: [29, 32, 44],  up: [],       down: [32] },
  32: { cross: [30, 31, 46],  up: [46],     down: [] },
};
