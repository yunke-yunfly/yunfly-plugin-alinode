/**
 * default config
 *
 * @export
 * @param {KoaApp} app
 * @returns
 */
export default function config(): any {
  const config: any = {};

  config.alinode = {
    enable: false,
  } as any;

  return config;
}
