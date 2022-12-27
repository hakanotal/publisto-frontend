export default compare_func = (datas) => {
  datas.sort((a, b) => {
    const val = a.id < b.id ? 1 : -1;
    return val;
  });
  return datas;
};
