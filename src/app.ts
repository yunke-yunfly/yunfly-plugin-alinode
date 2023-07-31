import alinodePlugin from './lib';
import type { AlinodeOption } from './type';

interface AlinodeOpt {
  pluginConfig: AlinodeOption;
}

/**
 * alinode plugin
 *
 * @export
 * @param {*} { app, pluginConfig }
 * @returns {void}
 */
export default function AlinodePlugin({ pluginConfig }: AlinodeOpt): any {
  const enable = pluginConfig?.enable ?? true;
  if (!enable) {
    return;
  }
  setTimeout(() => { alinodePlugin(pluginConfig); });
}

export { killAgenthub, startAgenthub } from './lib';