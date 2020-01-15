import * as path from 'path';
import { ASTNode } from '../interfaces/AST';
import { IASTScope } from '../Visitor/Visitor';

export function getDynamicImport(node: ASTNode) {
  // meriyah case
  if (node.type === 'ImportExpression') {
    if (node.source) {
      return { source: node.source.value };
    }
    return { error: 'At this moment computed statements are not supported' };
  }
  // eslint parser case
  if (node.type === 'CallExpression') {
    if (node.callee && node.callee.type === 'Import') {
      if (node.arguments.length === 1 && !!node.arguments[0].value) {
        return { source: node.arguments[0].value };
      }
      return { error: 'At this moment computed statements are not supported' };
    }
  }
}

export function generateVariableFromSource(source: string, index: number) {
  let variable = path.basename(source).replace(/\.|-/g, '_') + '_' + index;
  if (!/^[a-z]/i.test(variable)) {
    variable = 'a' + variable;
  }
  return variable;
}

export function isLocalDefined(name: string, scope: IASTScope) {
  if (!scope) return;
  if (scope.locals && scope.locals[name] === 1) return true;
  if (scope.hoisted && scope.hoisted[name] === 1) return true;
}
