class Environment {
  private symbolTable: {};

  constructor() {
    this.symbolTable = {};
  }

  init(name, value) {
    this.symbolTable[name] = value;
  }

  set(name, value) {
    this.symbolTable[name] = value;
  }

  get(name) {
    return this.symbolTable[name];
  }
}

export default Environment;
