import { confetti, ConfettiOptions } from '@tsparticles/confetti';





export const ConfettiService = {
  shot: async (canvasId: string, options?: ConfettiOptions) => {
    let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    let attempts = 0;
    while (!canvas && attempts < 10) {
      canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (!canvas) return;
    canvas.confetti =
      canvas.confetti || (await confetti.create(canvas));
    canvas.confetti(options);
  },

  snow: async (canvasId: string, options?: ConfettiOptions) => {
    const duration = 15 * 1000,
      animationEnd = Date.now() + duration;

    let skew = 1;

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;
    canvas.confetti = canvas.confetti || (await confetti.create(canvas));

    (async function frame() {
      const timeLeft = animationEnd - Date.now(),
        ticks = Math.max(200, 500 * (timeLeft / duration));

      skew = Math.max(0.8, skew - 0.001);

      canvas.confetti({
        count: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
        ...options
      });
      await new Promise(resolve => setTimeout(resolve, 50));
      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
  },
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}