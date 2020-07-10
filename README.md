# SuperMemo

A JavaScript/TypeScript implementation of the [SuperMemo 2](https://super-memory.com/english/ol/sm2.htm) (SM2) algorithm for spaced based repetition flashcards.

## Installation

```
npm install --save supermemo
```

## Usage

```
import { supermemo, SuperMemoItem } from 'supermemo';

let item: SuperMemoItem = {
  interval: 0,
  repetition: 0,
  efactor: 2.5,
};

console.log(item);

item = supermemo(item, 5);
console.log(item);

item = supermemo(item, 4);
console.log(item);
```

## References

- [The SuperMemo 2 Algorithm explanation.](https://super-memory.com/english/ol/sm2.htm)
- [The Delphi implementation of SuperMemo 2.](https://super-memory.com/english/ol/sm2source.htm)
