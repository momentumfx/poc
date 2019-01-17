import momentum from '../core';
import { TimelineHandler } from '../';

export const Timeline = ({name}) => 
  ({prototype: {render}}: {prototype: TimelineHandler}) => {
    momentum.timeline(name, render);
  }