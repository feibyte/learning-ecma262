class Environment {
  private outer: Environment;

  private symbolTable: {};

  constructor(outer: Environment = null) {
    this.outer = outer;
    this.symbolTable = {};
  }

  init(name, value) {
    this.symbolTable[name] = value;
  }

  set(name, value) {
    this.symbolTable[name] = value;
  }

  get(name) {
    if (this.symbolTable[name] !== undefined) {
      return this.symbolTable[name];
    }
    if (this.outer) {
      return this.outer.get(name);
    }
    return undefined;
  }
}

export default Environment;
