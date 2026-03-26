function hash(str: string): number {
  let h = 0;

  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }

  return Math.abs(h);
}

export default function generatePrice(id: string): number {
  const hashedId = hash(id);

  const min = 80;
  const max = 320;

  const price = min + (hashedId % (max - min));

  return price;
}
