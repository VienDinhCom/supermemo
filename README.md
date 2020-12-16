# SuperMemo

A JavaScript/TypeScript implementation of the [SuperMemo 2](https://super-memory.com/english/ol/sm2.htm) (SM2) algorithm for spaced based repetition flashcards.

Hit the **Star** button if you love this project ⭐️

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

function practice(flashcard: Flashcard, grade: SuperMemoGrade, today: string): Flashcard {
  const { interval, repetition, efactor } = supermemo(flashcard, grade);
  const dueDate = dayjs(today).add(interval, 'day').toISOString();

  return { ...flashcard, interval, repetition, efactor, dueDate };
}

// e.g. first practice session takes place at "2020-12-14T16:25:00+01:00"
// (or equivalent ISOString: "2020-12-14T15:25:00.000Z")
let practiceDate = new Date(2020, 11, 14, 16, 25);

let flashcard: Flashcard = {
  front: 'programer',
  back: 'an organism that turns caffeine in software',
  interval: 0,
  repetition: 0,
  efactor: 2.5,
  dueDate: dayjs(practiceDate).toISOString(),
};

console.log(flashcard);

// First practice session is right after being introduced to the flashcard.
// User gets the best grade of 5.
flashcard = practice(flashcard, 5, dayjs(practiceDate).toISOString());
console.log('Got grade 5 @ 2020-12-14T15:25:00.000Z', flashcard);
// flashcard.interval is 1 so the dueDate is on the 15th:
// flashcard.dueDate is now '2020-12-15T15:25:00.000Z'

// On the 15th (or later):
practiceDate.setDate(practiceDate.getDate() + flashcard.interval);

// User practices the flashcard again and gets a grade of 3
flashcard = practice(flashcard, 3, dayjs(practiceDate).toISOString());
console.log('Got grade 3 @ 2020-12-15T15:25:00.000Z', flashcard);
// flashcard.interval is 6 so the dueDate is on the 21st (15th + 6 days):
// flashcard.dueDate is now '2020-12-21T15:25:00.000Z'
```

<details>
  <summary>console.log output:</summary>

```
    {
      front: 'programer',
      back: 'an organism that turns caffeine in software',
      interval: 0,
      repetition: 0,
      efactor: 2.5,
      dueDate: '2020-12-14T15:25:00.000Z'
    }

    Got grade 5 @ 2020-12-14T15:25:00.000Z {
      front: 'programer',
      back: 'an organism that turns caffeine in software',
      interval: 1,
      repetition: 1,
      efactor: 2.6,
      dueDate: '2020-12-15T15:25:00.000Z'
    }

    Got grade 3 @ 2020-12-15T15:25:00.000Z {
      front: 'programer',
      back: 'an organism that turns caffeine in software',
      interval: 6,
      repetition: 2,
      efactor: 2.46,
      dueDate: '2020-12-21T15:25:00.000Z'
    }
```
</details>

## References

- [The explanation of SuperMemo 2 Algorithm](https://super-memory.com/english/ol/sm2.htm)
- [The Delphi implementation of SuperMemo 2 Algorithm](https://super-memory.com/english/ol/sm2source.htm)
