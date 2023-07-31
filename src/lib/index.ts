import { strict as assert } from 'assert';
import * as path from 'path';
import type { AlinodeOption, AnyOption } from '../type';

const treeKill = require('tree-kill');
const spawn = require('cross-spawn');
const findProcess = require('find-process');
const fs = require('fs-extra');
const debug = require('debug')('alinode');

export default async function alinodePlugin(pluginConfig: AlinodeOption): Promise<void> {
  debug('【alinode】: plugin config', pluginConfig);
  agenthubConfig(pluginConfig);
  await killAllAgenthubService();
  runAgenthub();
}

/**
 * gen config
 *
 * @param {AlinodeOption} pluginConfig
 */
function agenthubConfig(pluginConfig: AlinodeOption) {
  const { appid, secret } = pluginConfig || {};
  assert(appid, '【alinode】: the appid parameter cannot be empty');
  assert(secret, '【alinode】: the secret parameter cannot be empty');
  fs.writeJsonSync(path.resolve(__dirname, './config.json'), pluginConfig);
}

/**
 * 初始化agenthub服务
 *
 */
function runAgenthub() {
  const agenthub = spawn.sync(
    'agenthub',
    ['start', path.join(__dirname, './config.json')],
    { stdio: 'inherit' },
  );
  setTimeout(async () => {
    if (agenthub.pid) {
      debug('【alinode】: agenthub service started successfully, monitoring started!');
      debug('【alinode】: list of currently surviving agenthub processes:', await getAgenthubPids());
    }
    else {
      debug('【alinode】: agenthub service startup failed');
    }
  }, 500);
}

/**
 * get agenthub process list
 *
 * @returns {Promise<number[]>}
 */
async function getAgenthubPids(): Promise<number[]> {
  const agenthublist = await findProcess('name', 'agenthub') || [];
  return agenthublist.reduce((prev: number[], next: AnyOption) => [...prev, next.pid], []);
}

/**
 * kill all agenthub process
 *
 * @param {number[]} [agenthubList=[]]
 */
async function killAllAgenthubService() {
  const agenthubList = await getAgenthubPids() || [];
  agenthubList.forEach((item: number) => {
    try {
      treeKill(item, 'SIGTERM');
    } catch (err: any) {
      // nothing
    }
  });
}

/**
 * kill agenthub server
 *
 * @export
 */
export async function killAgenthub (): Promise<void> {
  const agenthubList = await getAgenthubPids();
  if (agenthubList.length) {
    killAllAgenthubService();
    debug('【alinode】: kill all agenthub processes successfully');
  }
}

/**
 * start agenthub
 *
 * @export
 * @return {*} 
 */
export async function startAgenthub (): Promise<void> {
  const agenthubList = await getAgenthubPids();
  if (agenthubList.length) {
    return;
  }
  runAgenthub();
} 


