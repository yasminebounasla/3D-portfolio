// Mini moteur 3D "fait main" en Canvas 2D — pas de WebGL, pas de Three.js.
// Sert de remplacement pour VisionCore/ScanGlobe : moins riche visuellement
// que la version WebGL, mais fonctionne sur à peu près n'importe quel
// navigateur/pilote, sans dépendre de la carte graphique.

const PHI = (1 + Math.sqrt(5)) / 2;

function normalize([x, y, z]) {
  const len = Math.sqrt(x * x + y * y + z * z) || 1;
  return [x / len, y / len, z / len];
}

// Icosaèdre de base (12 sommets, 20 faces), subdivisé une fois pour un
// maillage plus dense (équivalent à icosahedronGeometry(1, 1) en Three.js).
export function buildIcosahedron() {
  const t = PHI;
  let vertices = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map(normalize);

  let faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  // une subdivision : chaque triangle -> 4 triangles
  const midCache = new Map();
  const midpoint = (a, b) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (midCache.has(key)) return midCache.get(key);
    const va = vertices[a], vb = vertices[b];
    const m = normalize([(va[0]+vb[0])/2, (va[1]+vb[1])/2, (va[2]+vb[2])/2]);
    vertices.push(m);
    const idx = vertices.length - 1;
    midCache.set(key, idx);
    return idx;
  };

  const newFaces = [];
  for (const [a, b, c] of faces) {
    const ab = midpoint(a, b);
    const bc = midpoint(b, c);
    const ca = midpoint(c, a);
    newFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
  }

  // dériver les arêtes uniques à partir des faces
  const edgeSet = new Set();
  for (const [a, b, c] of newFaces) {
    [[a, b], [b, c], [c, a]].forEach(([i, j]) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      edgeSet.add(key);
    });
  }
  const edges = [...edgeSet].map((k) => k.split("-").map(Number));

  return { vertices, edges };
}

export function rotateY([x, y, z], a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [x * c + z * s, y, -x * s + z * c];
}

export function rotateX([x, y, z], a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [x, y * c - z * s, y * s + z * c];
}

// projection perspective simple : renvoie {x, y, depth} en coordonnées
// écran (centrées sur cx, cy), depth ∈ (0..1] utilisé pour l'opacité.
export function project([x, y, z], { cx, cy, scale, camZ = 4, focal = 4 }) {
  const zc = z + camZ;
  const f = focal / zc;
  return {
    x: cx + x * scale * f,
    y: cy - y * scale * f,
    depth: Math.min(1, Math.max(0.15, f / (focal / camZ))),
  };
}