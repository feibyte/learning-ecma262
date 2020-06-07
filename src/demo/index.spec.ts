import Z2 from './index';

describe('Math Expression', () => {
  it('should return sum when adding two numbers', () => {
    const z2 = new Z2();
    expect(z2.run('3 + 4')).toBe(7);
    expect(z2.run('3 + 4 + 15')).toBe(22);
  });

  it('should return correct value given mixed math expression', () => {
    const z2 = new Z2();
    expect(z2.run('3 + 4 * 2')).toBe(11);
    expect(z2.run('8 + 12 / 3 + 4 * 2')).toBe(20);
    expect(z2.run('1 + 2 * 3 - 4 / 5')).toBe(6.2);
  });

  it('should return correct value given expression include parentheses', () => {
    const z2 = new Z2();
    expect(z2.run('(3 + 4) * 2')).toBe(14);
  });
});

describe('Var and Declaration', () => {
  it('should calculate correct value given expression has variable', () => {
    const z2 = new Z2();
    expect(z2.run(`
      var a = 3;
      a * 9;
  `)).toBe(27);
    expect(z2.run(`
      var a = 3;
      var b = 4;
      var c = 2;
      a + b * c;
  `)).toBe(11);
  });

  it('should return correct value when var is changed', () => {
    const z2 = new Z2();
    expect(z2.run(`
      var a = 3;
      a = 5;
      var c = 2;
      a * c;
  `)).toBe(10);
  });
});

describe('Function and Scope', () => {
  it('should create a new scope in function', () => {
    const z2 = new Z2();
    expect(z2.run(`
      var a = 3;
      function outer() {
        var a = 5;
        return a;
      }
      outer();
  `)).toBe(5);
  });

  it('should access its own variable after calling a function', () => {
    const z2 = new Z2();
    expect(z2.run(`
      var a = 3;
      function outer() {
        var a = 5;
        return a;
      }
      outer();
      a + 1;
    `)).toBe(4);
  });

  it('should be able to access outer variable in function', () => {
    const z2 = new Z2();
    expect(z2.run(`
      var a = 3;
      function outer() {
        return a;
      }
      outer();
    `)).toBe(3);
  });

  it('should support closure', () => {
    const z2 = new Z2();
    expect(z2.run(`
      var b = 5;
      function outer() {
       var b = 10;
       function inner() {
         var a = 20;
         return a + b;
        }
       return inner;
      }
      var fn = outer();
      fn();
  `)).toBe(30);
  });
});
