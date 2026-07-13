// Wrapper localStorage sécurisé : ne throw jamais (quota dépassé, navigation
// privée, JSON corrompu) et versionne les données stockées pour pouvoir
// invalider silencieusement un ancien format sans faire planter la page.

const STORAGE_VERSION = 1;

interface StoredEnvelope<T> {
  version: number;
  data: T;
}

export function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredEnvelope<T>;
    if (!parsed || parsed.version !== STORAGE_VERSION) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

export function safeSet<T>(key: string, data: T): boolean {
  if (typeof window === "undefined") return false;
  try {
    const envelope: StoredEnvelope<T> = { version: STORAGE_VERSION, data };
    window.localStorage.setItem(key, JSON.stringify(envelope));
    return true;
  } catch {
    return false;
  }
}

export function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // stockage indisponible : rien à nettoyer
  }
}
