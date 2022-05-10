export const getQuizFromApi = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((error) => Promise.reject(error));
};
