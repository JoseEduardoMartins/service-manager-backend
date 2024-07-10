export const formatDate = (date: string) => {
  if (!date) return;

  const formattedDate = new Date(date);
  const year = formattedDate.getUTCFullYear();
  const month = (formattedDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = formattedDate.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
