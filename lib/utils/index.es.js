const toLine = (value) => {
  return value.replace(/([A-Z])/g, "-$1").toLocaleLowerCase();
};
export { toLine };
