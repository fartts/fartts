export interface Listener<T extends keyof DocumentEventMap>
  extends EventListener {
  (event: DocumentEventMap[T]): void;
}

export interface AppState {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  safeWidth: number;
  safeHeight: number;
  halfWidth: number;
  halfHeight: number;
  r: number;
  step: number;
  rectWidth: number;
  rectHeight: number;
  lineWidth: number;
  C: number;
  dash: number;
}
