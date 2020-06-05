import Z2 from './index';

describe('Math Expression', () => {
  it('should return sum when execute addition', () => {
    const z2 = new Z2();
    expect(z2.run('3 + 4')).toBe(7);
    expect(z2.run('3 + 4 + 15')).toBe(22);
  });

  it('should return correct value given mixed math expression', () => {
    const z2 = new Z2();
    expect(z2.run('3 + 4 * 2')).toBe(11);
    expect(z2.run('8 + 12 / 3 + 4 * 2')).toBe(20);
  });

  it('should return correct value given expression include parentheses', () => {
    const z2 = new Z2();
    expect(z2.run('(3 + 4) * 2')).toBe(14);
  });
});
