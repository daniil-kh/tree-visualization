abstract class INode {
  protected abstract _right: INode;
  protected abstract _left: INode;
  protected abstract _parent: INode;

  public abstract clone(): INode;
  public abstract equal(node: INode): boolean;
  public abstract compare(node: INode): number;
  public abstract copy(node: INode): void;
  public abstract content(): unknown;

  public abstract get parent(): INode;
  public abstract set parent(node: INode);

  public abstract get right(): INode;
  public abstract set right(node: INode);

  public abstract get left(): INode;
  public abstract set left(node: INode);
}

class BNode<T> extends INode {
  protected _parent: BNode<T>;
  protected _right: BNode<T>;
  protected _left: BNode<T>;
  protected _data: T;

  constructor(data: T = null) {
    super();
    this._parent = null;
    this._right = null;
    this._left = null;
    this._data = data;
  }

  public get parent(): BNode<T> {
    return this._parent;
  }
  public set parent(node: BNode<T>) {
    this._parent = node;
  }

  public get left(): BNode<T> {
    return this._left;
  }
  public set left(node: BNode<T>) {
    this._left = node;
  }

  public get right(): BNode<T> {
    return this._right;
  }
  public set right(node: BNode<T>) {
    this._right = node;
  }

  public get data(): T {
    return this._data;
  }
  public set data(data: T) {
    this._data = data;
  }

  public clone(): BNode<T> {
    let newNode = new BNode<T>(this._data);
    newNode._parent = this._parent;
    newNode._left = this._left;
    newNode._right = this._right;

    return newNode;
  }

  public equal(node: BNode<T>): boolean {
    return this._data === node._data;
  }

  public compare(node: BNode<T>): number {
    if (this._data > node._data) {
      return 1;
    } else if (this._data < node._data) {
      return -1;
    } else {
      return 0;
    }
  }

  public copy(node: BNode<T>): void {
    this._data = node._data;
  }

  public content(): T {
    return this._data;
  }
}

class RBNode<T> extends INode {
  protected _parent: RBNode<T>;
  protected _right: RBNode<T>;
  protected _left: RBNode<T>;
  protected _data: T;
  protected _color: boolean;

  constructor(data: T = null) {
    super();
    this._parent = null;
    this._right = null;
    this._left = null;
    this._data = data;
    this._color = true;
  }

  public get parent(): RBNode<T> {
    return this._parent;
  }
  public set parent(node: RBNode<T>) {
    this._parent = node;
  }

  public get left(): RBNode<T> {
    return this._left;
  }
  public set left(node: RBNode<T>) {
    this._left = node;
  }

  public get right(): RBNode<T> {
    return this._right;
  }
  public set right(node: RBNode<T>) {
    this._right = node;
  }

  public get data() {
    return this._data;
  }
  public set data(data: T) {
    this._data = data;
  }

  public get color() {
    return this._color;
  }
  public set color(color: boolean) {
    this._color = color;
  }

  colorFlip() {
    this._color = !this._color;
  }

  clone(): RBNode<T> {
    let newNode = new RBNode<T>(this.data);
    newNode._parent = this._parent;
    newNode._left = this._left;
    newNode._right = this._right;
    newNode._color = this._color;

    return newNode;
  }

  public equal(node: RBNode<T>): boolean {
    return this._data === node._data;
  }

  public compare(node: RBNode<T>): number {
    if (this._data > node._data) {
      return 1;
    } else if (this._data < node._data) {
      return -1;
    } else {
      return 0;
    }
  }

  public copy(node: RBNode<T>) {
    this._data = node._data;
  }

  public content(): T {
    return this._data;
  }
}

/*
interface IIterator {
  next(): IIterator;
}

class TreeIterator implements IIterator {
  public node: INode;
  constructor(node: INode) {
    this.node = node;
  }
  next(): TreeIterator {
    if (this.node.right === null) {
      if (this.node.parent.right === null) {
        this.node = this.node.parent;
      } else {
        let tempNode: INode = this.node.parent.right.clone();
        while (tempNode.left != null) tempNode = tempNode.left;
        this.node = tempNode;
      }
    } else {
      let tempNode: INode = this.node.right.clone();
      while (tempNode.left != null) tempNode = tempNode.left;
      this.node = tempNode;
    }

    return this;
  }
}
*/

interface ITree {
  add(node: INode): void;
  delete(node: INode): void;
  find(node: INode): INode;
}

class BTree<T> implements ITree {
  protected root: INode;
  constructor() {
    this.root = null;
  }
  public add(node: INode): void {
    if (this.root === null) {
      this.root = node;
      node.parent = this.root;
      return;
    }

    this.addNode(this.root, node);
  }

  protected addNode(currentNode: INode, insetrtedNode: INode): void {
    if (currentNode.compare(insetrtedNode) > 0) {
      if (currentNode.left === null) {
        currentNode.left = insetrtedNode;
        insetrtedNode.parent = currentNode;
      } else {
        this.addNode(currentNode.left, insetrtedNode);
      }
    }
    if (currentNode.compare(insetrtedNode) <= 0) {
      if (currentNode.right === null) {
        currentNode.right = insetrtedNode;
        insetrtedNode.parent = currentNode;
      } else {
        this.addNode(currentNode.right, insetrtedNode);
      }
    }
  }

  protected deleteNode(node: INode): void {
    let nodeToDelete: INode = this.findNode(this.root, node);
    if (nodeToDelete.equal(this.root)) {
      let nodeToExchange = this.findMax(nodeToDelete.left);
      if (nodeToExchange.left !== null) {
        nodeToExchange.parent.left = nodeToExchange.left;
      }
      if (nodeToExchange.parent.right.equal(nodeToExchange)) {
        nodeToExchange.parent.right = nodeToExchange.right;
      } else {
        nodeToExchange.parent.left = nodeToExchange.left;
      }
      nodeToDelete.copy(nodeToExchange);

      return;
    }

    if (nodeToDelete === null) return;
    if (nodeToDelete.right === null && nodeToDelete.left === null) {
      if (nodeToDelete.parent.right.equal(nodeToDelete)) {
        nodeToDelete.parent.right = null;
      } else {
        nodeToDelete.parent.left = null;
      }
    } else if (nodeToDelete.left !== null) {
      let nodeToExchange = this.findMax(nodeToDelete.left);
      nodeToDelete.copy(nodeToExchange);
      if (nodeToExchange.left !== null) {
        nodeToExchange.left.parent = nodeToExchange.parent;
      }
      nodeToExchange.parent.right = nodeToExchange.right;
    } else if (nodeToDelete.right !== null) {
      if (nodeToDelete.parent.right.equal(nodeToDelete)) {
        nodeToDelete.parent.right = nodeToDelete.right;
      } else {
        nodeToDelete.parent.left = nodeToDelete.right;
      }
    }
  }

  public delete(node: INode): void {
    this.deleteNode(node);
  }

  public find(node: INode): INode {
    return this.findNode(this.root, node) as BNode<T>;
  }
  protected findNode(currentNode: INode, findedNode: INode): INode {
    if (currentNode === null) return null;
    if (currentNode.equal(findedNode)) {
      return currentNode;
    } else if (currentNode.compare(findedNode) > 0) {
      return this.findNode(currentNode.left, findedNode);
    } else if (currentNode.compare(findedNode) <= 0) {
      return this.findNode(currentNode.right, findedNode);
    }
  }

  protected findMax(currentNode: INode): INode {
    if (currentNode.right === null) {
      return currentNode;
    }

    return this.findMax(currentNode.right);
  }

  public show(): void {
    this.showTree(this.root, 1);
  }

  protected showTree(node: INode, height: number): void {
    if (node === null) {
      return;
    }
    this.showTree(node.left, height + 1);
    let output: string = "-".repeat(height) + ">" + node.content();
    console.log(output);
    this.showTree(node.right, height + 1);
  }
}

class AVLTree<T> extends BTree<T> {
  public add(node: INode) {
    if (this.root === null) {
      this.root = node;
      return;
    }

    this.addNode(this.root, node);
    this.checkBalanceFactor(this.findNode(this.root, node));
  }

  private checkBalanceFactor(node: INode): void {
    if (node.equal(this.root)) {
      this.fixUnbalanceDomain(node);
      return;
    }

    this.fixUnbalanceDomain(node);
    this.checkBalanceFactor(node.parent);
  }

  private fixUnbalanceDomain(node: INode): void {
    let heightLeft: number = this.findHeight(node.left, 1);
    let heightRight: number = this.findHeight(node.right, 1);
    if (Math.abs(heightLeft - heightRight) > 1) {
      if (heightLeft > heightRight) {
        let heightLeftChild: number = this.findHeight(node.left.left, 1);
        let heightRightChild: number = this.findHeight(node.left.right, 1);

        if (heightLeftChild > heightRightChild) {
          this.rightRotation(node);
        } else {
          this.leftRightRotation(node);
        }
      } else {
        let heightLeftChild: number = this.findHeight(node.right.left, 1);
        let heightRightChild: number = this.findHeight(node.right.right, 1);

        if (heightLeftChild > heightRightChild) {
          this.rightLeftRotation(node);
        } else {
          this.leftRotation(node);
        }
      }
    }
  }

  private findHeight(node: INode, height: number): number {
    if (node === null) {
      return height - 1;
    }
    let left = this.findHeight(node.left, height + 1);
    let right = this.findHeight(node.right, height + 1);

    return left >= right ? left : right;
  }

  protected rightRotation(node: INode): void {
    if (node.equal(this.root)) {
      this.root = node.left;
    }
    if (node.parent !== null) {
      if (node.parent.left?.equal(node)) {
        node.parent.left = node.left;
      } else {
        node.parent.right = node.left;
      }
    }
    node.left.parent = node.parent;
    node.parent = node.left;
    node.left = node.left.right;
    if (node.left !== null) {
      node.left.parent = node;
    }
    node.parent.right = node;
  }

  protected leftRotation(node: INode): void {
    if (node.equal(this.root)) {
      this.root = node.right;
    }
    if (node.parent !== null) {
      if (node.parent.left?.equal(node)) {
        node.parent.left = node.right;
      } else {
        node.parent.right = node.right;
      }
    }
    node.right.parent = node.parent;
    node.parent = node.right;
    node.right = node.right.left;
    if (node.right !== null) {
      node.right.parent = node;
    }
    node.parent.left = node;
  }

  protected leftRightRotation(node: INode): void {
    this.leftRotation(node.left);
    this.rightRotation(node);
  }

  protected rightLeftRotation(node: INode): void {
    this.rightRotation(node.right);
    this.leftRotation(node);
  }

  private checkAllNodes(currentNode: INode): void {
    if (currentNode === null) return;

    this.checkAllNodes(currentNode.left);
    this.checkAllNodes(currentNode.right);

    this.checkBalanceFactor(currentNode);
  }

  public delete(node: INode): void {
    this.deleteNode(node);
    this.checkAllNodes(this.root);
  }
}

class RBTree<T> extends BTree<T> {
  protected root: RBNode<T>;
  constructor() {
    super();
    this.root = null;
  }

  public add(node: RBNode<T>): void {
    if (this.root === null) {
      this.root = node;
      this.root.color = false;
      return;
    }

    this.addNode(this.root, node);
    this.balanceTree(this.findNode(this.root, node) as RBNode<T>);
  }
  protected balanceTree(node: RBNode<T>): void {
    if (node?.equal(this.root)) {
      return;
    }

    let nodeGrandparent = node.parent.parent;
    this.balanceSubTree(node);
    if (nodeGrandparent !== null) this.balanceTree(nodeGrandparent);
    this.root.color = false;
  }

  protected balanceSubTree(node: RBNode<T>): void {
    if (node.equal(this.root)) {
      this.root.color = false;
      return;
    }

    if (node.parent.color === node.color && node.parent.parent !== null) {
      if (node.parent.parent.left?.equal(node.parent)) {
        if (
          node.parent.parent.right !== null &&
          node.parent.parent.right.color === true
        ) {
          this.recolor(node);
        } else {
          this.rotateSubtree(node);
        }
      } else {
        if (
          node.parent.parent.left !== null &&
          node.parent.parent.left.color === true
        ) {
          this.recolor(node);
        } else {
          this.rotateSubtree(node);
        }
      }
    }
  }

  protected recolor(node: RBNode<T>): void {
    if (node.parent.parent?.left.equal(node.parent)) {
      if (node.parent.parent.right !== null) {
        node.parent.parent.right.color = false;
      }
    } else {
      if (node.parent.parent.left !== null) {
        node.parent.parent.left.color = false;
      }
    }
    node.parent.color = false;
    node.parent.parent.color = true;
  }

  protected rotateSubtree(node: RBNode<T>): void {
    if (node.parent.left?.equal(node)) {
      if (node.parent.parent.left?.equal(node.parent)) {
        this.rightRotation(node.parent.parent);
        node.parent.colorFlip();
        node.parent.right.colorFlip();
      } else {
        this.rightLeftRotation(node.parent.parent);
        node.colorFlip();
        node.left.colorFlip();
      }
    } else {
      if (node.parent.parent.left?.equal(node.parent)) {
        this.leftRightRotation(node.parent.parent);
        node.colorFlip();
        node.right.colorFlip();
      } else {
        this.leftRotation(node.parent.parent);
        node.parent.colorFlip();
        node.parent.left.colorFlip();
      }
    }
  }

  protected rightRotation(node: RBNode<T>): void {
    if (node.equal(this.root)) {
      this.root = node.left;
    }
    if (node.parent !== null) {
      if (node.parent.left?.equal(node)) {
        node.parent.left = node.left;
      } else {
        node.parent.right = node.left;
      }
    }
    node.left.parent = node.parent;
    node.parent = node.left;
    node.left = node.left.right;
    if (node.left !== null) {
      node.left.parent = node;
    }
    node.parent.right = node;
  }

  protected leftRotation(node: RBNode<T>): void {
    if (node.equal(this.root)) {
      this.root = node.right;
    }
    if (node.parent !== null) {
      if (node.parent.left?.equal(node)) {
        node.parent.left = node.right;
      } else {
        node.parent.right = node.right;
      }
    }
    node.right.parent = node.parent;
    node.parent = node.right;
    node.right = node.right.left;
    if (node.right !== null) {
      node.right.parent = node;
    }
    node.parent.left = node;
  }

  protected leftRightRotation(node: RBNode<T>): void {
    this.leftRotation(node.left);
    this.rightRotation(node);
  }

  protected rightLeftRotation(node: RBNode<T>): void {
    this.rightRotation(node.right);
    this.leftRotation(node);
  }

  public delete(node: RBNode<T>): void {
    this.deleteNode(node);
  }

  public find(node: INode): RBNode<T> {
    return this.findNode(this.root, node) as RBNode<T>;
  }

  protected showTree(node: RBNode<T>, height: number): void {
    if (node === null) {
      return;
    }
    this.showTree(node.left, height + 1);
    let output: string =
      (node.color ? "\x1b[31m" : "\x1b[30m") +
      "-".repeat(height) +
      ">" +
      node.content() +
      "\x1b[0m";
    console.log(output);
    this.showTree(node.right, height + 1);
  }
}

const bTreeExample = (): void => {
  const tree: BTree<number> = new BTree<number>();
  const array: Array<number> = [
    8,
    7,
    6,
    6,
    4,
    5,
    20,
    25,
    15,
    16,
    14,
    24,
    24,
    23,
    23,
    22,
    22,
  ];
  array.forEach((element: number): void => {
    tree.add(new BNode<number>(element));
  });

  tree.show();
  tree.delete(new BNode<number>(25));
  console.log("After deleting: ");
  tree.show();
};

const avlTreeExample = (): void => {
  const avlTree: AVLTree<number> = new AVLTree<number>();
  const array: Array<number> = [
    2,
    17,
    16,
    5,
    1,
    13,
    18,
    8,
    4,
    20,
    6,
    14,
    7,
    3,
    12,
    15,
    19,
    9,
    11,
    10,
  ];
  array.forEach((element: number): void => {
    avlTree.add(new BNode<number>(element));
  });

  avlTree.show();
  console.log("\n\n");
  avlTree.delete(new BNode<number>(12));
  avlTree.show();
};

const rbTreeExample = (): void => {
  const rbTree: RBTree<number> = new RBTree<number>();
  const array: Array<number> = [
    12,
    11,
    6,
    9,
    2,
    7,
    13,
    19,
    15,
    4,
    18,
    17,
    16,
    1,
    10,
    20,
    8,
    14,
    3,
    5,
  ];
  //const array: Array<number> = [1, 2, 3];
  array.forEach((element: number): void => {
    rbTree.add(new RBNode<number>(element));
  });

  rbTree.show();
};

rbTreeExample();
