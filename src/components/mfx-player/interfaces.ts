export interface Effect {
  element: HTMLElement;
  type: string;
  payload: any;
}

export interface Listener {
  (element: HTMLElement, cb: (effect: Effect) => any);
}
