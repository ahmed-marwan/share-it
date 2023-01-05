export const setItemInLocalStorage = (itemName: string, item: any) => {
  if (typeof item === 'object') {
    item = JSON.stringify(item);
  }

  localStorage.setItem(itemName, item);
};

export const getItemFromLocalStorage = (itemName: string) => {
  let item = localStorage.getItem(itemName);

  if (item) {
    return JSON.parse(item);
  }
};

export const removeItemFromLocalStorage = (itemName: string) => {
  localStorage.removeItem(itemName);
};

export const catchCustomError = (error: any) => {
  return {
    name: 'Custom error',
    message: error.response.data.message,
    data: error.response.data,
  };
};