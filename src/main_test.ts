import * as assert from 'node:assert';
import { supermemo, SuperMemoItem } from './main.ts';

Deno.test('supermemo', () => {
  let item: SuperMemoItem = {
    interval: 0,
    repetition: 0,
    efactor: 2.5,
  };

  Deno.test('Grade: 5', () => {
    item = supermemo(item, 5);

    assert.deepEqual(item, { interval: 1, repetition: 1, efactor: 2.6 });
  });

  Deno.test('Grade: 4', () => {
    item = supermemo(item, 4);

    assert.deepEqual(item, { interval: 6, repetition: 2, efactor: 2.6 });
  });

  Deno.test('Grade: 3', () => {
    item = supermemo(item, 3);

    assert.deepEqual(item, { interval: 16, repetition: 3, efactor: 2.46 });
  });

  Deno.test('Grade: 2', () => {
    item = supermemo(item, 2);

    assert.deepEqual(item, {
      interval: 1,
      repetition: 0,
      efactor: 2.1399999999999997,
    });
  });

  Deno.test('Grade: 1', () => {
    item = supermemo(item, 1);

    assert.deepEqual(item, {
      interval: 1,
      repetition: 0,
      efactor: 1.5999999999999996,
    });
  });

  Deno.test('Grade: 0', () => {
    item = supermemo(item, 0);

    assert.deepEqual(item, { interval: 1, repetition: 0, efactor: 1.3 });
  });
});
