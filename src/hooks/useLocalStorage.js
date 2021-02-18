export const setItemToStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const getItemFromStorage = (key) => {
    const item = localStorage.getItem(key);
    return item;
};

export const removeItemFromStorage = (key) => {
    localStorage.removeItem(key);
};

export const clearStorage = () => {
    localStorage.clear();
};
