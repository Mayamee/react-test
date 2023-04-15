export default (length) => {
  const acc = [];
  for (let i = 0; i < length; i++) {
    acc.push({ id: i, name: `Test${i}` });
  }
  return acc;
};
