const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export function formatDate(date) {
  let newDate = new Date(date);
  return newDate.toLocaleDateString('en-TT', options);
}
