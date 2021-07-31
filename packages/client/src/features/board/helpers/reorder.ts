const reorder = (list: Array<string>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removedItem] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removedItem);

  return result;
};

export default reorder;
