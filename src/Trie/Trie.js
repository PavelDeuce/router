import TrieNode from './TrieNode.js';

export default class Trie {
  constructor(rootName = 'root', divider = '') {
    this.root = new TrieNode(rootName, null, null, rootName);
    this.divider = divider;
    this.sequencesCount = 0;
    this.nodesCount = 1;
  }

  getDivider() {
    return this.divider;
  }

  getNodesCount() {
    return this.nodesCount;
  }

  getSequencesCount() {
    return this.sequencesCount;
  }

  has(string) {
    if (!string) return false;

    const segments = string.split(this.getDivider());
    let currentNode = this.root;

    // eslint-disable-next-line no-restricted-syntax
    for (const segment of segments) {
      if (!currentNode.hasChild(segment)) {
        return false;
      }
      currentNode = currentNode.getChild(segment);
    }

    if (!currentNode.isEndOfSequence()) {
      return false;
    }

    return true;
  }

  insert(string, data = null) {
    const segments = string.split(this.getDivider());

    let currentNode = this.root;

    // eslint-disable-next-line no-restricted-syntax
    for (const segment of segments) {
      if (!currentNode.hasChild(segment)) {
        currentNode.addChild(segment, data);
        this.nodesCount += 1;
      }
      currentNode = currentNode.getChild(segment);
    }

    if (!currentNode.isEndOfSequence()) {
      currentNode.setIsEndOfSequence(true);
      this.sequencesCount += 1;
    }

    return this;
  }

  find(string) {
    if (!string) return null;

    let currentNode = this.root;
    const segments = string.split(this.getDivider());

    // eslint-disable-next-line no-restricted-syntax
    for (const segment of segments) {
      if (!currentNode.hasChild(segment)) return null;
      currentNode = currentNode.getChild(segment);
    }

    if (!currentNode.isEndOfSequence()) return null;

    return currentNode;
  }

  forEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Trie.forEach expects a callback function');
    }

    const forEachRecursive = (node = this.root, segment = '') => {
      if (node.isEndOfSequence()) {
        callback(segment);
      }

      node.getChildren().forEach((child) => {
        if (segment) {
          forEachRecursive(child, [segment, child.getKey()].join(this.getDivider()));
          return;
        }
        forEachRecursive(child, [child.getKey()].join(this.getDivider()));
      });
    };

    return forEachRecursive();
  }

  remove(string) {
    if (!string) return null;

    const segments = string.split(this.getDivider());
    let currentNode = this.root;

    // eslint-disable-next-line no-restricted-syntax
    for (const segment of segments) {
      if (!currentNode.hasChild(segment)) return null;
      currentNode = currentNode.getChild(segment);
    }

    if (!currentNode.isEndOfSequence()) return null;

    if (currentNode.getChildrenCount() > 0) {
      currentNode.setIsEndOfSequence(false);
      this.sequencesCount -= 1;
      return string;
    }

    do {
      currentNode.getParentNode().removeChild(currentNode.getKey());
      this.nodesCount -= 1;
      currentNode = currentNode.getParentNode();
    } while (currentNode.isLeaf() && !currentNode.isEndOfSequence() && !currentNode.isRoot());

    this.sequencesCount -= 1;
    return string;
  }

  toArray() {
    const result = [];
    this.forEach((sequence) => result.push(sequence));
    return result;
  }

  clear() {
    this.root = new TrieNode(this.getDivider());
    this.nodesCount = 1;
    this.sequencesCount = 0;
  }
}
