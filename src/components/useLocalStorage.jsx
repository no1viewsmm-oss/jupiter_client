// Hàm set giá trị vào localStorage
export const setLocalStorage = (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
};

// Hàm lấy giá trị từ localStorage
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error("Error getting localStorage:", error);
    return defaultValue;
  }
};
