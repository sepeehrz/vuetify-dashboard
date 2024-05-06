import {Scope} from './Scope';

let globalScope: Scope;

export function assignGlobalScope(scope: Scope) {
  if (globalScope) {
    throw new Error('Your app before setup global scope');
  }
  globalScope = scope;
}

export function getGlobalScope() {
  if (globalScope === null) {
    throw new Error('Cannot resolve instance before setup application');
  }
  return globalScope;
}
