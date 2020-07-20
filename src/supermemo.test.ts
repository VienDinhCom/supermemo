import { supermemo, SuperMemoItem } from './supermemo';

describe('supermemo', () => {
  let item: SuperMemoItem = {
    interval: 0,
    repetition: 0,
    efactor: 2.5,
  };

  it('Grade: 5', () => {
    item = supermemo(item, 5);

    expect(item).toEqual({ interval: 1, repetition: 1, efactor: 2.6 });
  });

  it('Grade: 4', () => {
    item = supermemo(item, 4);

    expect(item).toEqual({ interval: 6, repetition: 2, efactor: 2.6 });
  });

  it('Grade: 3', () => {
    item = supermemo(item, 3);

    expect(item).toEqual({ interval: 16, repetition: 3, efactor: 2.46 });
  });

  it('Grade: 2', () => {
    item = supermemo(item, 2);

    expect(item).toEqual({ interval: 1, repetition: 0, efactor: 2.1399999999999997 });
  });

  it('Grade: 1', () => {
    item = supermemo(item, 1);

    expect(item).toEqual({ interval: 1, repetition: 0, efactor: 1.5999999999999996 });
  });

  it('Grade: 0', () => {
    item = supermemo(item, 0);

    expect(item).toEqual({ interval: 1, repetition: 0, efactor: 1.3 });
  });
});
