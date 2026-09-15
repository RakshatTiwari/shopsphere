const STORAGE_PREFIX = "shopsphere:";

function getStorageKey(key) {
  return `${STORAGE_PREFIX}${key}`;
}

export function readStorage(key, fallback) {
  try {
    const storedValue = localStorage.getItem(getStorageKey(key));

    if (storedValue === null) {
      return fallback;
    }

    const parsedValue = JSON.parse(storedValue);

    return parsedValue ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(getStorageKey(key), JSON.stringify(value));
  } catch {
    // Ignore storage failures.
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(getStorageKey(key));
  } catch {
    // Ignore storage failures.
  }
}
