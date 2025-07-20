export const stripIds = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map(stripIds);
  } else if (obj && typeof obj === "object") {
    const newObj: any = {};
    for (const key in obj) {
      if (key !== "id") {
        newObj[key] = stripIds(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
};
