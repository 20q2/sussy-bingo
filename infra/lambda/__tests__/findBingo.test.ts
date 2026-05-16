import { describe, it, expect } from 'vitest';
import { findBingo } from '../state';

describe('findBingo (5-in-a-row detection on 7x7)', () => {
  it('returns null when no 5-in-a-row exists', () => {
    expect(findBingo([[0,0],[0,1],[0,2],[0,3]])).toBeNull();   // 4 in a row
    expect(findBingo([[0,0],[1,1],[2,3],[4,5]])).toBeNull();   // scattered
    expect(findBingo([])).toBeNull();
  });

  it('detects a horizontal 5-in-a-row', () => {
    const line = findBingo([[2,1],[2,2],[2,3],[2,4],[2,5]]);
    expect(line).toEqual([[2,1],[2,2],[2,3],[2,4],[2,5]]);
  });

  it('detects a vertical 5-in-a-row', () => {
    const line = findBingo([[0,3],[1,3],[2,3],[3,3],[4,3]]);
    expect(line).toEqual([[0,3],[1,3],[2,3],[3,3],[4,3]]);
  });

  it('detects a \\-diagonal 5-in-a-row', () => {
    const line = findBingo([[0,0],[1,1],[2,2],[3,3],[4,4]]);
    expect(line).toEqual([[0,0],[1,1],[2,2],[3,3],[4,4]]);
  });

  it('detects a /-diagonal 5-in-a-row', () => {
    const line = findBingo([[0,4],[1,3],[2,2],[3,1],[4,0]]);
    expect(line).toEqual([[0,4],[1,3],[2,2],[3,1],[4,0]]);
  });

  it('detects a 5-run inside a longer 6-cell row', () => {
    const line = findBingo([[3,0],[3,1],[3,2],[3,3],[3,4],[3,5]]);
    expect(line?.length).toBe(5);
  });

  it('does NOT detect a 4-in-a-row diagonal that runs out of the board', () => {
    // [3,3],[4,4],[5,5],[6,6] is only 4 — 7x7 board, would need [2,2]
    expect(findBingo([[3,3],[4,4],[5,5],[6,6]])).toBeNull();
  });
});
