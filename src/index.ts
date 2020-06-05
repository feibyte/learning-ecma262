import { Parser } from 'acorn';
import {
  BinaryExpression,
  ExpressionStatement,
  Program,
  Node,
  Literal,
  Identifier,
  AssignmentExpression,
  FunctionDeclaration,
  CallExpression, BlockStatement, ReturnStatement,
} from 'estree';
import Environment from './Environment';

class Z2 {
  private env: Environment;

  run(code: string) {
    // @ts-ignore
    const program: Node = Parser.parse(code);
    this.env = new Environment();
    return this.evaluate(program);
  }

  evaluate(node) {
    switch (node.type) {
      case 'Program':
        return this.evaluateProgram(node);
      case 'ExpressionStatement':
        return this.evaluateExpressionStatement(node);
      case 'BinaryExpression':
        return this.evaluateBinaryExpression(node);
      case 'Literal':
        return this.evaluateLiteral(node);
      case 'VariableDeclaration':
        return this.evaluateVariableDeclaration(node);
      case 'Identifier':
        return this.evaluateIdentifier(node);
      case 'AssignmentExpression':
        return this.evaluateAssignmentExpression(node);
      case 'FunctionDeclaration':
        return this.evaluateFunctionDeclaration(node);
      case 'CallExpression':
        return this.evaluateCallExpression(node);
      case 'BlockStatement':
        return this.evaluateBlockStatement(node);
      case 'ReturnStatement':
        return this.evaluateReturnStatement(node);
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }

  evaluateProgram(node: Program) {
    let value;
    node.body.forEach((expression) => {
      value = this.evaluate(expression);
    });
    return value;
  }

  evaluateExpressionStatement(node: ExpressionStatement) {
    return this.evaluate(node.expression);
  }

  evaluateBinaryExpression(node: BinaryExpression) {
    const { operator } = node;
    const left = this.evaluate(node.left);
    const right = this.evaluate(node.right);
    switch (operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      case '%':
        return left % right;
      default:
        throw new Error(`Unknown operator: ${node.type}`);
    }
  }

  evaluateLiteral(node: Literal) {
    return node.value;
  }

  evaluateVariableDeclaration(node) {
    node.declarations.forEach((declaration) => {
      if (declaration.id.type === 'Identifier') {
        this.env.init(declaration.id.name, this.evaluate(declaration.init));
      } else {
        // TODO support other patterns such as ObjectPattern, ArrayPattern
      }
    });
  }

  evaluateIdentifier(node: Identifier) {
    return this.env.get(node.name);
  }

  evaluateAssignmentExpression(node: AssignmentExpression) {
    if (node.left.type === 'Identifier') {
      this.env.set(node.left.name, this.evaluate(node.right));
    }
  }

  evaluateFunctionDeclaration(node: FunctionDeclaration) {
    if (node.id.type === 'Identifier') {
      this.env.init(node.id.name, this.createFunction(node));
    }
  }

  createFunction(node) {
    return {
      parentEnv: this.env,
      node,
    };
  }

  evaluateCallExpression(node: CallExpression) {
    if (node.callee.type === 'Identifier') {
      const fn = this.env.get(node.callee.name);
      const env = new Environment(fn.parentEnv);
      const args = node.arguments.map((argumentNode) => this.evaluate(argumentNode));
      fn.node.params.forEach((param, index) => {
        env.init(param.name, args[index]);
      });
      const currentEnv = this.env;
      this.env = env;
      const result = this.evaluate(fn.node.body);
      this.env = currentEnv;
      return result;
    }
    throw Error('Unknown call');
  }

  evaluateBlockStatement(node: BlockStatement) {
    for (let i = 0; i < node.body.length; i++) {
      const statement = node.body[i];
      const result = this.evaluate(statement);
      if (statement.type === 'ReturnStatement') {
        return result;
      }
    }
    return undefined;
  }

  evaluateReturnStatement(node: ReturnStatement) {
    return this.evaluate(node.argument);
  }
}

export default Z2;
