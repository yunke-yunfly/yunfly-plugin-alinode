# @yunflyjs/yunfly-plugin-etcd

yunfly etcd plugin.

## Usage

1. install

```bash
yarn add @yunflyjs/yunfly-plugin-etcd
```

2. declare plugins in **config/config.plugin.ts**

```ts
/**
 * yunfly plugin
 */
const plugins: {[key:string]: string}[] = [
  {
    name: 'etcd',
    package: '@yunflyjs/yunfly-plugin-etcd'
  }
];
// 
export default plugins;
```

3. enable plugins in **config/config.default.ts**

```js
config.etcd = {
  enable: true,
  url: '127.0.0.1:4001', // etcd server urls 
  // refresh: false,        // refresh the interval host list automatically
  // timeout: 60 * 1000,    // default timeout for ops
}
```

- if you have more than run instance of etcd running you can pass an array to load balance.

```js
config.etcd = {
  url: '127.0.0.1:4001, 127.0.0.1:4002, 127.0.0.1:4003', // etcd server urls 
}
```

- you can also set urls through environment variables

```ts
// set env
process.env.ETCDV3_SERVER_URLS = '127.0.0.1:4001';
// cluster
process.env.ETCDV3_SERVER_URLS = '127.0.0.1:4001, 127.0.0.1:4002, 127.0.0.1:4003';

// etcd config
config.etcd = {
  enable: true,
  // refresh: false,        // refresh the interval host list automatically
  // timeout: 60 * 1000,    // default timeout for ops
}
```

## API

```ts
import { etcd } from '@yunflyjs/yunfly-plugin-etcd';
```

### etcd.getAllConfig

get all etcd config

```ts
import { etcd } from '@yunflyjs/yunfly-plugin-etcd';

const allConfig = await etcd.getAllConfig();
```

### etcd.get(key, [opts])

get a etcd key.

- option

```ts
{
  "json": boolean; // parse value as JSON for this request
}
```

- example

```ts
// async/await
const result = await etcd.get('hello');

// use promise
etcd.get('hello').then( data => console.log('ge hello value',data));

// example result
'{"name": "zhangsan" ,"age" : 25 }'
```

- return json

```ts
// async/await
const result = await etcd.get('hello',{ json: true });

// example result
{
  name: "zhangsan",
  age: 25
}
```

### etcd.set(key, value, [opts])

set a etcd key.

- option

```ts
{
  "json": boolean;
}
```

- example

```ts
// async/await
const result = await etcd.set('hello','{"name": "zhangsan" ,"age" : 25 }');
```

- set a JSON value

```ts
// async/await
const json = {"name": "zhangsan" ,"age" : 25 }
const result = await etcd.set('hello', json, { json: true });
```


### etcd.update(key, value, [opts])

Set a key if it already exists. Same as set(key, value, {prevExists: true})

### etcd.del(key, [opts])

Delete a key

```ts
const result = await etcd.del('hello');
```

### etcd.wait(key, [cb])

Wait a key to change. Same as get(key, {wait: true}) except the callback is called with a third argument next that will wait for the next change.

```ts
etcd.wait('hello', function onchange (err: any, result: any, next: any) {
  console.log('change!', result);
  next(onchange); // next will set waitIndex so we do not miss events
});
```

### etcd.mkdir(key, [cb])

Create a directory. Same as set(key, null, {dir: true})

### etcd.rmdir(key, [cb])

Remove a directory. Same as del(key, {dir: true})

## More Apis

- for more apis, please refer to: [@npmcorp/etcdjs](https://www.npmjs.com/package/@npmcorp/etcdjs)

### use @npmcorp/etcdjs apis

- example

```ts
etcd.store.destroy();
etcd.store.push(key, value, [opts], [cb])
etcd.store.compareAndSwap(key, value, prevValue, [opts], [cb])
......
```

## 中文文档

https://yunke-yunfly.github.io/doc.github.io/document/technology/etcd







