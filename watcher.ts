// watch to see when the [style] property updates
// then direct the EFFECT over to the style animator
// the EFFECT will be converted into a player
interface Effect {
  element: Element;
  payload: any;
  domFn: Function|null;
}

interface AttrEffect extends Effect {
  payload: {
    oldValue: string;
    newValue: string;
  }
}

const enum DomEffectType {
  Enter = 1,
  Leave = 2,
  Move = 3
}

interface DomEffect extends Effect {
  payload: {
    type: DomEffectType,
    previous: DomEffect|null;
  }
}

const OBSERVE_STYLE_CONFIG: MutationObserverInit = {attributes: true, attributeFilter: ['style'], attributeOldValue: true};
function watchStyle(element: HTMLElement, callback: (effect: AttrEffect) => any) {
  return watchAttr(element, 'style', OBSERVE_STYLE_CONFIG, callback);
}

const OBSERVE_CLASS_CONFIG: MutationObserverInit = {attributes: true, attributeFilter: ['class'], attributeOldValue: true};
function watchClass(element: HTMLElement, callback: (effect: AttrEffect) => any) {
  return watchAttr(element, 'class', OBSERVE_CLASS_CONFIG, callback);
}

function watchAttr(element: HTMLElement, attrName: string, config: MutationObserverInit, callback: (effect: Effect) => any) {
  const observer = new MutationObserver(mutations => {
    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
      const oldValue = mutation.oldValue || '';
      const newValue = element.getAttribute(attrName);
      const effect: AttrEffect = {
        element,
        domFn: null,
        payload: {oldValue, newValue}
      };
      callback(effect);
    }
  });
  observer.observe(element, config);
  return observer;
}

// a list of enters and leaves that occur
// the idea here is that each item is a chain infront of another
function watchDom(element: HTMLElement, deep: boolean, callback: (effect: DomEffect[]) => any) {
  const config: MutationObserverInit = {childList:true, subtree: deep};
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    const chain: DomEffect[] = [];
    let previous: DomEffect|null = null;
    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          const effect: DomEffect = {
            element: node as Element,
            domFn: null,
            payload: {
              type: DomEffectType.Enter,
              previous
            }
          };
          chain.push(effect);
          previous = effect;
        });
        mutation.removedNodes.forEach(node => {
          const effect: DomEffect = {
            element: node as Element,
            domFn: () => node.parentNode.removeChild(node),
            payload: {
              type: DomEffectType.Enter,
              previous
            }
          };
          chain.push(effect);
          previous = effect;
        });
      }
    }
  });
  observer.observe(element, config);
  return observer;
}