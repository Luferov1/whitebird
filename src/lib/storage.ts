export type StorageKey = 'currentUser' | 'users' | 'posts' | 'comments' | 'likes' | 'favorites' | 'priorities';

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function loadFromStorage<T>(key: StorageKey, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  return safeParse<T>(localStorage.getItem(key), fallback);
}

export function saveToStorage<T>(key: StorageKey, value: T): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromStorage(key: StorageKey): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(key);
}
