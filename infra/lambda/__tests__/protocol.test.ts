import { describe, it, expect } from 'vitest';
import { isClientMessage } from '../protocol';

describe('isClientMessage', () => {
  it('accepts a join message', () => {
    expect(isClientMessage({ type: 'join', name: 'Andrew' })).toBe(true);
  });
  it('rejects no type', () => {
    expect(isClientMessage({ name: 'Andrew' })).toBe(false);
  });
  it('rejects null', () => {
    expect(isClientMessage(null)).toBe(false);
  });
});
