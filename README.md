# SuperMemo

A JavaScript/TypeScript implementation of the [SuperMemo 2](https://super-memory.com/english/ol/sm2.htm) (SM2) algorithm for spaced based repetition flashcards.

Hit the **Star** button if you love this project ⭐️

[<img src="https://raw.githubusercontent.com/appcraftstudio/buymeacoffee/master/Images/snapshot-bmc-button.png" height="48"/>](https://www.buymeacoffee.com/maxvien)

## Explanation

```ts
type SuperMemoItem = {
  interval: number;
  repetition: number;
  efactor: number;
};

type SuperMemoGrade = 0 | 1 | 2 | 3 | 4 | 5;

supermemo(item: SuperMemoItem, grade: SuperMemoGrade): SuperMemoItem
```

- **item**
  - **repetition**: the number of continous correct responses. The initial `repetition` value should be `0`.
  - **interval**: inter-repetition interval after the repetitions (in days). The initial `interval` value should be `0`.
  - **efactor**: easiness factor reflecting the easiness of memorizing and retaining a given item in memory. The initial `efactor` value should be `2.5`.
- **grade**:
  - **5**: perfect response.
  - **4**: correct response after a hesitation.
  - **3**: correct response recalled with serious difficulty.
  - **2**: incorrect response; where the correct one seemed easy to recall.
  - **1**: incorrect response; the correct one remembered.
  - **0**: complete blackout.

## Installation

### For Webpack

```
npm install --save supermemo
```

```ts
import { supermemo, SuperMemoItem, SuperMemoGrade } from 'supermemo';
```

### For Node

```
npm install --save supermemo
```

```js
const { supermemo } = require('supermemo');
```

### For Deno

```ts
import { supermemo, SuperMemoItem, SuperMemoGrade } from 'https://deno.land/x/supermemo/mod.ts';
```

## Usage

```ts
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

### How to implement SuperMemo with DayJS?

```ts
import dayjs from 'dayjs';
import { supermemo, SuperMemoItem, SuperMemoGrade } from 'supermemo';

interface Flashcard extends SuperMemoItem {
  front: string;
  back: string;
  dueDate: string;
}

function practice(flashcard: Flashcard, grade: SuperMemoGrade): Flashcard {
  const { interval, repetition, efactor } = supermemo(flashcard, grade);

  const dueDate = dayjs(Date.now()).add(interval, 'day').toISOString();

  return { ...flashcard, interval, repetition, efactor, dueDate };
}

let flashcard: Flashcard = {
  front: 'programer',
  back: 'an organism that turns caffeine in software',
  interval: 0,
  repetition: 0,
  efactor: 2.5,
  dueDate: dayjs(Date.now()).toISOString(),
};

console.log(flashcard);

flashcard = practice(flashcard, 5);
console.log(flashcard);

flashcard = practice(flashcard, 3);
console.log(flashcard);
```

## References

- [The explanation of SuperMemo 2 Algorithm](https://super-memory.com/english/ol/sm2.htm)
- [The Delphi implementation of SuperMemo 2 Algorithm](https://super-memory.com/english/ol/sm2source.htm)
