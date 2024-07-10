export const getParams = (query: any) => {
  const params = {
    select: undefined,
    where: undefined,
  };

  if (query?.select) {
    const { select, ...where } = query;
    params.select = select;
    params.where = where;
  } else {
    params.where = query;
  }

  return params;
};
