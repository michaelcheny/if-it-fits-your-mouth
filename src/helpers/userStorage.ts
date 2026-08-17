import type { User } from "../interfaces/user.interface";

const STORAGE_KEY = "userStats";
const LEGACY_STORAGE_KEY = "userStats-legacy";

/**
 * Stats are stored per sex so male and female profiles never bleed into each other.
 * `loadUser` returns the profile for the given sex; legacy single-profile saves
 * (pre 2.0) are migrated on first read under their own key.
 */
const keyFor = (gender: "male" | "female") => `${STORAGE_KEY}-${gender}`;

export const loadUser = (gender: "male" | "female"): User | undefined => {
  // One-time migration of the old single-profile save.
  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy !== null) {
      const parsed = JSON.parse(legacy) as User;
      if (parsed.gender === "male" || parsed.gender === "female") {
        localStorage.setItem(keyFor(parsed.gender), JSON.stringify(parsed));
      }
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  } catch {
    // corrupted legacy save — drop it
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  try {
    const raw = localStorage.getItem(keyFor(gender));
    if (raw === null) return undefined;
    const parsed = JSON.parse(raw) as User;
    // Minimal shape validation — saves may be missing fields.
    if (
      typeof parsed.age !== "number" ||
      !parsed.height ||
      typeof parsed.weight !== "number"
    ) {
      return undefined;
    }
    return parsed;
  } catch {
    return undefined;
  }
};

export const saveUser = (user: User) => {
  localStorage.setItem(keyFor(user.gender), JSON.stringify(user));
};
