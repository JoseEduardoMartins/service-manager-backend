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

export const getSelects = (fields: string[]) => {
  if (!fields) return [];

  if (typeof fields === 'string') return [fields];

  const selects = fields.reduce((field, key) => {
    field[key] = true;
    return field;
  }, {});

  return selects;
};

type GetOrderByType = {
  orderField?: string;
  orderBy?: 'ASC' | 'DESC';
};

export const getOrderBy = ({ orderField, orderBy }: GetOrderByType) =>
  typeof orderField === 'string' && typeof orderBy === 'string'
    ? {
        [orderField]: orderBy,
      }
    : {};
