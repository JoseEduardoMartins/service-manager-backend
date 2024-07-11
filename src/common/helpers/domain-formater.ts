export function domainFormatter(origin: string) {
  if (origin.includes('localhost')) return 'localhost';

  const domainArr = decodeURIComponent(origin).split('.');
  domainArr.shift();

  return '.' + domainArr.join('.');
}
