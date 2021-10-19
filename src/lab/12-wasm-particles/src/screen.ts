import { el } from '../../../lib/core/dom';
import { max, min } from '../../../lib/core/math';

type CanvasSizing = 'cover' | 'contain';

export interface ScreenOptions {
  containerSelector: string;
  canvasSelector: string;
  contextType: string;

  pixelScale: number;
  canvasSizing: CanvasSizing;
}

export interface Screen {
  dpr: number;
  containerWidth: number;
  containerHeight: number;

  canvasWidth: number;
  canvasHeight: number;
  canvasScale: number;

  context: CanvasRenderingContext2D | WebGLRenderingContext | null;
}

function on(
  target: EventTarget,
  type: string,
  listener: EventListener,
  useCapture = false,
) {
  target.addEventListener(type, listener, useCapture);
}

function step(by = 1, from = 0) {
  if (from % by === 0) {
    // "from" is already a multiple/step of "by", we're done
    return from;
  }

  return from + (by - (from % by));
}

function getCanvasScale(
  sizing: CanvasSizing,
  containerWidth: number,
  containerHeight: number,
  canvasWidth: number,
  canvasHeight: number,
): number {
  switch (sizing) {
    case 'cover':
      return max(containerWidth / canvasWidth, containerHeight / canvasHeight);
    case 'contain':
      return min(containerWidth / canvasWidth, containerHeight / canvasHeight);
  }
}

const defaultScreenOptions: ScreenOptions = {
  containerSelector: 'main',
  canvasSelector: 'canvas',
  contextType: '2d',
  pixelScale: 1,
  canvasSizing: 'cover',
};

export function screen(opts?: Partial<ScreenOptions>): Screen {
  const {
    containerSelector,
    canvasSelector,
    contextType,
    pixelScale,
    canvasSizing,
  } = { ...defaultScreenOptions, ...opts };

  const container = el(containerSelector) as HTMLElement;
  const canvas = el(canvasSelector) as HTMLCanvasElement;
  const context = canvas.getContext(contextType) as CanvasRenderingContext2D;

  const store: Screen = {
    dpr: window.devicePixelRatio,
    containerWidth: container.clientWidth,
    containerHeight: container.clientHeight,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    canvasScale: 1,
    context,
  };

  on(window, 'resize', () => {
    store.containerWidth = container.clientWidth;
    store.containerHeight = container.clientHeight;

    const scaledWidth = step(pixelScale, store.containerWidth);
    const scaledHeight = step(pixelScale, store.containerHeight);

    store.canvasWidth = (scaledWidth * store.dpr) / pixelScale;
    store.canvasHeight = (scaledHeight * store.dpr) / pixelScale;
    store.canvasScale = getCanvasScale(
      canvasSizing,
      store.containerWidth,
      store.containerHeight,
      store.canvasWidth,
      store.canvasHeight,
    );

    canvas.width = store.canvasWidth;
    canvas.height = store.canvasHeight;
    canvas.style.transform = `scale(${store.canvasScale})`;
  });
  window.dispatchEvent(new Event('resize'));

  return {
    get dpr() {
      return store.dpr;
    },

    get containerWidth() {
      return store.containerWidth;
    },

    get containerHeight() {
      return store.containerHeight;
    },

    get canvasWidth() {
      return store.canvasWidth;
    },

    get canvasHeight() {
      return store.canvasHeight;
    },

    get canvasScale() {
      return store.canvasScale;
    },

    context,
  };
}
