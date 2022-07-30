export default class TrieNode {
  constructor(key, data = null, parentNode = null, rootName = 'root') {
    this.rootName = rootName;
    this.key = key;
    this.parentNode = parentNode;
    this.children = new Map();
    this.data = data;
    this.endOfSequence = false;
  }

  getKey() {
    return this.key;
  }

  getData() {
    return this.data;
  }

  getParentNode() {
    return this.parentNode;
  }

  getChildren() {
    return this.children;
  }

  getChildrenCount() {
    return this.children.size;
  }

  setParentNode(parentNode) {
    this.parentNode = parentNode;
  }

  setData(data) {
    this.data = data;
  }

  setIsEndOfSequence(endOfSequence) {
    this.endOfSequence = endOfSequence;
  }

  getIntermediateSequence() {
    if (this.isRoot) return this.getKey();

    const keys = [];
    let node = this;

    while (node !== null) {
      keys.unshift(node.key);
      node = this.getParentNode();
    }

    return keys;
  }

  isHasData() {
    return this.data !== null;
  }

  isRoot() {
    return this.key === this.rootName;
  }

  isLeaf() {
    return this.children.length === 0;
  }

  isEndOfSequence() {
    return this.endOfSequence;
  }

  getChild(key) {
    return this.hasChild(key) ? this.children.get(key) : null;
  }

  hasChild(key) {
    if (!key) return false;

    return this.children.has(key);
  }

  addChild(key, data = null) {
    if (!key) return null;

    if (this.children.has(key)) {
      const node = this.children.get(key);
      return node;
    }

    const node = new TrieNode(key, data, this);
    this.children.set(key, node);
    return node;
  }

  removeChild(key) {
    if (!key || !this.children.has(key)) return null;

    const child = this.children.get(key);
    this.children.delete(key);
    return child;
  }

  findChild(key) {
    if (!key || !this.children.has(key)) return null;

    return this.children.get(key);
  }
}
