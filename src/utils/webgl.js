// Teste une seule fois si le navigateur peut vraiment créer un contexte
// WebGL (pas juste "le supporte en théorie" — certains pilotes GPU
// refusent la création même si l'API existe). Résultat mis en cache :
// un seul test pour toute la session, pas un par canvas.
let cached = null;

export function isWebGLAvailable() {
  if (cached !== null) return cached;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    cached = !!gl;

    if (gl) {
      const lose = gl.getExtension("WEBGL_lose_context");
      if (lose) lose.loseContext();
    }
  } catch (e) {
    cached = false;
  }

  return cached;
}