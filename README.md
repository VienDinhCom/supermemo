# SuperMemo

A JavaScript/TypeScript implementation of the [SuperMemo 2](https://super-memory.com/english/ol/sm2.htm) (SM2) algorithm for spaced based repetition flashcards.

## Explanation

```
interface SuperMemoItem {
  interval: number;
  repetition: number;
  efactor: number;
}

type SuperMemoGrade = 0 | 1 | 2 | 3 | 4 | 5;

supermemo(item: SuperMemoItem, grade: SuperMemoGrade): SuperMemoItem
```

- **repetition**: the number of continous correct responses.
- **interval**: inter-repetition interval after the repetitions (in days).
- **efactor**: easiness factor reflecting the easiness of memorizing and retaining a given item in memory.
- **grade**:
  - **5**: perfect response.
  - **4**: correct response after a hesitation.
  - **3**: correct response recalled with serious difficulty.
  - **2**: incorrect response; where the correct one seemed easy to recall.
  - **1**: incorrect response; the correct one remembered.
  - **0**: complete blackout.

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

- [The explanation of SuperMemo 2 Algorithm](https://super-memory.com/english/ol/sm2.htm)
- [The Delphi implementation of SuperMemo 2 Algorithm](https://super-memory.com/english/ol/sm2source.htm)
