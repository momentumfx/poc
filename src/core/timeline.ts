import { TimelineHandler } from '../';

const timelines: {[key: string]: TimelineHandler['render']} = {};

export default (name: string, render?: TimelineHandler['render']) : TimelineHandler['render'] => {
  if (!render && timelines[name]) {
    return timelines[name];
  }

  if(timelines[name]) {
    throw new Error(`Momentum: A timeline named ${name} is already registerd by ${timelines[name]}`);
  }

  timelines[name] = render;
};