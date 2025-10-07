export const INSTALLED_KEY = "installed_apps_v1";

export const getInstalled = () => {
  try {
    return JSON.parse(localStorage.getItem(INSTALLED_KEY) || "[]");
  } catch {
    return [];
  }
};

export const isInstalled = (id) => getInstalled().includes(id);

export const installApp = (id) => {
  const list = getInstalled();
  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem(INSTALLED_KEY, JSON.stringify(list));
  }
};

export const uninstallApp = (id) => {
  const list = getInstalled().filter((x) => x !== id);
  localStorage.setItem(INSTALLED_KEY, JSON.stringify(list));
};
