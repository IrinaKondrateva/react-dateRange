export const loadDate = () => {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/date');
    xhr.send();
    xhr.onload = () => {
      xhr.status >= 400 ? rej() : res(xhr.response);
    };
    xhr.onerror = () => {
      rej(new Error('Не удалось загрузить'));
    };
  });
}

export const getDateFromLocalStorage = () => {
  return localStorage.getItem('date');
}

export const setDateToLocalStorage = (date) => {
  localStorage.setItem('date', date);
}
