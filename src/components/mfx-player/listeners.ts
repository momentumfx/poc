import {Effect} from './interfaces';

export function listenForClass(element: HTMLElement, cb: (effect: Effect) => any) {
  const observer = new MutationObserver(records => {
    records.forEach(r => {
      const element = r.target as HTMLElement;
      const effect: Effect = {
        element, 
        type: 'class',
        payload: {
          oldClass: r.oldValue,
          newClass: element.className
        }
      };
      cb(effect);
    });
  });

  observer.observe(element, {
    attributeFilter: ['class'],
    attributeOldValue: true,
    subtree: true
  });

  return () => {
    observer.disconnect();
  }
}