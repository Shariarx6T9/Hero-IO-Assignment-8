// src/utils/localStorage.js

export const INSTALLED_KEY = "installed_apps_v1";

// ✅ Get all installed app IDs as numbers
export const getInstalled = () => {
  try {
    const data = JSON.parse(localStorage.getItem(INSTALLED_KEY) || "[]");
    return data.map((id) => Number(id)); // ✅ ensures all IDs are numbers
  } catch {
    return [];
  }

};

// ✅ Check if an app is installed
export const isInstalled = (id) => getInstalled().includes(Number(id));

// ✅ Install an app by ID
export const installApp = (id) => {
  const list = getInstalled();
  const numId = Number(id);
  if (!list.includes(numId)) {
    list.push(numId);
    localStorage.setItem(INSTALLED_KEY, JSON.stringify(list));
  }
};

// ✅ Uninstall an app by ID
export const uninstallApp = (id) => {
  const numId = Number(id);
  const list = getInstalled().filter((x) => x !== numId);
  localStorage.setItem(INSTALLED_KEY, JSON.stringify(list));
};
