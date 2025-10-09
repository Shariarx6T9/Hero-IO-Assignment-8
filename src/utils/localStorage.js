// src/utils/localStorage.js
export const INSTALLED_KEY = "installed_apps_v1";

export const getInstalled = () => {
  try {
    const raw = localStorage.getItem(INSTALLED_KEY) || "[]";
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.map((id) => Number(id)) : [];
  } catch (e) {
    console.error("getInstalled parse error", e);
    return [];
  }
};

export const installApp = (id) => {
  try {
    const current = getInstalled();
    if (!current.includes(Number(id))) {
      current.push(Number(id));
      localStorage.setItem(INSTALLED_KEY, JSON.stringify(current));
    }
    return current;
  } catch (e) {
    console.error("installApp error", e);
    return getInstalled();
  }
};

export const uninstallApp = (id) => {
  try {
    const current = getInstalled().filter((i) => Number(i) !== Number(id));
    localStorage.setItem(INSTALLED_KEY, JSON.stringify(current));
    return current;
  } catch (e) {
    console.error("uninstallApp error", e);
    return getInstalled();
  }
};

export const isInstalled = (id) => {
  return getInstalled().includes(Number(id));
};
