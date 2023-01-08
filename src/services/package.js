export const getIndexOfPackage = (packageList, id) => {
  return packageList.findIndex((i) => i.id.toString() === id.toString());
};

export const findPackageFromList = (packageList, id) => {
  return packageList.find((i) => i.id.toString() === id.toString());
};
