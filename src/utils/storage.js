const KEYS = {
  profile: "tapak.profile",
  answers: "tapak.answers",
  currentIndex: "tapak.currentIndex",
  result: "tapak.result",
};

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode, quota) — fail silently, state still lives in memory
  }
}

function clearAll() {
  Object.values(KEYS).forEach((key) => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  });
}

export { KEYS, read, write, clearAll };
