import { Parser } from 'acorn';
import {
  BinaryExpression, ExpressionStatement, Program, Node,
} from 'estree';

class Z2 {
  run(code: string) {
    // @ts-ignore
    const program: Node = Parser.parse(code);
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
        return node.value;
      default:
        throw new Error('Unknown node type');
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
        throw new Error('Unknown operator');
    }
  }
}

export default Z2;
