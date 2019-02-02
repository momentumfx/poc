/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface Mfx2player {
    'listen': string;
  }
  interface Mfx2playerAttributes extends StencilHTMLAttributes {
    'listen'?: string;
    'onMfxPlayerInit'?: (event: CustomEvent) => void;
  }

  interface Mfx1timeline {
    'handler': string;
  }
  interface Mfx1timelineAttributes extends StencilHTMLAttributes {
    'handler'?: string;
    'onMfxTimelineInit'?: (event: CustomEvent) => void;
    'onMfxTimelineRender'?: (event: CustomEvent) => void;
  }
}

declare global {
  interface StencilElementInterfaces {
    'Mfx2player': Components.Mfx2player;
    'Mfx1timeline': Components.Mfx1timeline;
  }

  interface StencilIntrinsicElements {
    'mfx-2player': Components.Mfx2playerAttributes;
    'mfx-1timeline': Components.Mfx1timelineAttributes;
  }


  interface HTMLMfx2playerElement extends Components.Mfx2player, HTMLStencilElement {}
  var HTMLMfx2playerElement: {
    prototype: HTMLMfx2playerElement;
    new (): HTMLMfx2playerElement;
  };

  interface HTMLMfx1timelineElement extends Components.Mfx1timeline, HTMLStencilElement {}
  var HTMLMfx1timelineElement: {
    prototype: HTMLMfx1timelineElement;
    new (): HTMLMfx1timelineElement;
  };

  interface HTMLElementTagNameMap {
    'mfx-2player': HTMLMfx2playerElement
    'mfx-1timeline': HTMLMfx1timelineElement
  }

  interface ElementTagNameMap {
    'mfx-2player': HTMLMfx2playerElement;
    'mfx-1timeline': HTMLMfx1timelineElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
