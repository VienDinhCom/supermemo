/**
 * Represents an item in the SuperMemo algorithm, tracking learning progress.
 */
export type SuperMemoItem = {
  /** The number of days until the next review. */
  interval: number;
  /** The number of times the item has been successfully recalled in a row. */
  repetition: number;
  /** The ease factor, which determines how quickly the interval increases. */
  efactor: number;
};

/**
 * Represents a grade given to an item during a review session.
 *  - 0-2: Failure to recall (resets repetition)
 *  - 3-5: Successful recall (progresses repetition)
 */
export type SuperMemoGrade = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Applies the SuperMemo 2 (SM-2) algorithm to update an item's learning parameters
 * based on a given recall grade.
 *
 * @param item - The current SuperMemo item containing interval, repetition, and ease factor.
 * @param grade - The grade (0-5) assigned to the recall attempt.
 * @returns The updated SuperMemo item with adjusted interval, repetition, and ease factor.
 */
export function supermemo(item: SuperMemoItem, grade: SuperMemoGrade): SuperMemoItem {
  let nextInterval: number;
  let nextRepetition: number;
  let nextEfactor: number;

  if (grade >= 3) {
    if (item.repetition === 0) {
      nextInterval = 1;
      nextRepetition = 1;
    } else if (item.repetition === 1) {
      nextInterval = 6;
      nextRepetition = 2;
    } else {
      nextInterval = Math.round(item.interval * item.efactor);
      nextRepetition = item.repetition + 1;
    }
  } else {
    nextInterval = 1;
    nextRepetition = 0;
  }

  nextEfactor = item.efactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

  if (nextEfactor < 1.3) nextEfactor = 1.3;

  return {
    interval: nextInterval,
    repetition: nextRepetition,
    efactor: nextEfactor,
  };
}

/**
 * Default export of the SuperMemo function.
 */
export default supermemo;
