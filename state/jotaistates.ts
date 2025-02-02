import { atom } from 'jotai';

import ChatMessage from '../types/ChatMessage';

export const videoLocationAtom = atom<string | null>(null);
export const messagesAtom = atom<ChatMessage[]>([]);
export const videoNameAtom = atom<string | null>(null);
