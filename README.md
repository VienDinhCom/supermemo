# SuperMemo

A JavaScript/TypeScript implementation of the [SuperMemo 2](https://super-memory.com/english/ol/sm2.htm) (SM2) algorithm for spaced based repetition flashcards.

![NPM Downloads](https://img.shields.io/npm/dy/supermemo?label=NPM)
![JSR Version](https://img.shields.io/jsr/v/%40vien/supermemo?label=JSR)
![GitHub forks](https://img.shields.io/github/forks/viendinhcom/supermemo)
![GitHub Repo stars](https://img.shields.io/github/stars/viendinhcom/supermemo)

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

If you like this project, hit the STAR button to bookmark it ⭐️

## Installation

### For Browser

```ts
import { supermemo } from 'https://esm.sh/supermemo@2';
```

### For Node

```
npm install --save supermemo
```

#### CommonJS

```js
const { supermemo } = require('supermemo');
```

#### ES Modules

```ts
import { supermemo, SuperMemoItem, SuperMemoGrade } from 'supermemo';
```

### For Deno

```
deno add jsr:@vien/supermemo
```

```ts
import { supermemo, SuperMemoItem, SuperMemoGrade } from '@vien/supermemo';
```

OR

```ts
import { supermemo, SuperMemoItem, SuperMemoGrade } from 'jsr:@vien/supermemo';
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

## Experience

I work remotely, so improving my English is a constant challenge. I needed a way to expand my vocabulary and actually remember it.

That’s when I found the SuperMemo algorithm. It made sense. Spaced repetition helps lock words into long-term memory. So, I built this JavaScript/TypeScript library from the original Delphi code.

Then, I took it further—created a side project using React.js, Next.js and Hasura GraphQL. I used it to practice common words. Over time, I memorized more than 10,000 words. It worked.

After seeing the results, I turned it into a product to help others do the same. But it failed. Maybe I wasn’t good at marketing. Maybe most learners don’t have the patience I did.

Still, I learned something: a good method isn’t enough. People need the right mindset, too. Would I do it again? Probably. Because every failure teaches something new.

## References

- [The explanation of SuperMemo 2 Algorithm](https://super-memory.com/english/ol/sm2.htm)
- [The Delphi implementation of SuperMemo 2 Algorithm](https://super-memory.com/english/ol/sm2source.htm)
