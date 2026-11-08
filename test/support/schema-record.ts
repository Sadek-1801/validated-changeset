import { useRecommendedStore } from '@warp-drive/core';
import { setupSignals } from '@warp-drive/core/configure';
import { withDefaults } from '@warp-drive/core/reactive';
import type { ObjectValue } from '@warp-drive/core/types/json/raw';
import { JSONAPICache } from '@warp-drive/json-api';

// These tests never watch a record change, so signals can do nothing.
setupSignals(() => ({
  createSignal: () => ({}),
  consumeSignal: () => {},
  notifySignal: () => {},
  createMemo: (_obj, _key, fn) => fn,
  willSyncFlushWatchers: () => false
}));

const Store = useRecommendedStore({
  cache: JSONAPICache,
  schemas: [
    withDefaults({
      type: 'page',
      fields: [
        { kind: 'field', name: 'title' },
        { kind: 'field', name: 'owner' }
      ]
    }),
    withDefaults({
      type: 'user',
      fields: [{ kind: 'field', name: 'name' }]
    })
  ]
});

let id = 0;

// A WarpDrive schema record. Reading a string key outside its schema throws,
// while symbol reads and `in` answer without throwing.
export default function schemaRecord(type: 'page' | 'user', attributes: ObjectValue): any {
  return new Store().push({ data: { type, id: String(++id), attributes } });
}
