export const CARD_PK = 'CARD';
export const CARD_CURRENT_SK = 'CURRENT';
export const CONN_PK = 'CONN';

export const cardScopedPK = (cardId: string) => `CARD#${cardId}`;
export const playerSK = (playerId: string) => `PLAYER#${playerId}`;
export const quoteSK = (index: number) => `QUOTE#${index}`;

export const TTL_SECONDS = 6 * 60 * 60; // 6h
export const ttl = () => Math.floor(Date.now() / 1000) + TTL_SECONDS;
