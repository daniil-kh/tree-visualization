abstract class INode {
  protected _right: INode;
  protected _left: INode;
  protected _parent: INode;
  abstract clone(): INode;
  abstract equal(node: INode): boolean;
  abstract compare(node: INode): number;
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

  // need to refactor this part
  // begin of part

  public get parent() {
    return this._parent;
  }

  public get right() {
    return this._right;
  }

  public get left() {
    return this._left;
  }

  public get data() {
    return this._data;
  }

  public set parent(node: BNode<T>) {
    this._parent = node;
  }

  public set right(node: BNode<T>) {
    this._right = node;
  }

  public set left(node: BNode<T>) {
    this._left = node;
  }

  public set data(data: T) {
    this._data = data;
  }

  //end of part

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
}

class RBNode<T> extends BNode<T> {
  protected _parent: RBNode<T>;
  protected _right: RBNode<T>;
  protected _left: RBNode<T>;
  protected _color: boolean;

  constructor(data: T = null) {
    super(data);
    this._color = true;
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
  protected root: BNode<T>;
  constructor() {
    this.root = null;
  }
  public add(node: BNode<T>): void {
    if (this.root === null) {
      this.root = node;
      node.parent = this.root;
      return;
    }

    this.addNode(this.root, node);
  }

  protected addNode(currentNode: BNode<T>, insetrtedNode: BNode<T>): void {
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

  protected deleteNode(node: BNode<T>): void {
    let nodeToDelete: BNode<T> = this.findNode(this.root, node);
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
      nodeToDelete.data = nodeToExchange.data;

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
      nodeToDelete.data = nodeToExchange.data;
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

  public delete(node: BNode<T>): void {
    this.deleteNode(node);
  }

  public find(node: BNode<T>): BNode<T> {
    return this.findNode(this.root, node);
  }
  protected findNode(currentNode: BNode<T>, findedNode: BNode<T>): BNode<T> {
    if (currentNode === null) return null;
    if (currentNode.equal(findedNode)) {
      return currentNode;
    } else if (currentNode.compare(findedNode) > 0) {
      return this.findNode(currentNode.left, findedNode);
    } else if (currentNode.data <= findedNode.data) {
      return this.findNode(currentNode.right, findedNode);
    }
  }

  private findMin(currentNode: BNode<T>): BNode<T> {
    if (currentNode.left === null) {
      return currentNode;
    }

    return this.findMin(currentNode.left);
  }

  protected findMax(currentNode: BNode<T>): BNode<T> {
    if (currentNode.right === null) {
      return currentNode;
    }

    return this.findMax(currentNode.right);
  }

  public show(): void {
    this.showTree(this.root, 1);
  }

  protected showTree(node: BNode<T>, height: number): void {
    if (node === null) {
      return;
    }
    this.showTree(node.left, height + 1);
    let output: string = "-".repeat(height) + ">" + node.data;
    console.log(output);
    this.showTree(node.right, height + 1);
  }
}

class AVLTree<T> extends BTree<T> {
  public add(node: BNode<T>) {
    if (this.root === null) {
      this.root = node;
      return;
    }

    this.addNode(this.root, node);
    this.checkBalanceFactor(this.findNode(this.root, node));
  }

  private checkBalanceFactor(node: BNode<T>): void {
    if (node.equal(this.root)) {
      this.fixUnbalanceDomain(node);
      return;
    }

    this.fixUnbalanceDomain(node);
    this.checkBalanceFactor(node.parent);
  }

  private fixUnbalanceDomain(node: BNode<T>): void {
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

  private findHeight(node: BNode<T>, height: number): number {
    if (node === null) {
      return height - 1;
    }
    let left = this.findHeight(node.left, height + 1);
    let right = this.findHeight(node.right, height + 1);

    return left >= right ? left : right;
  }

  protected rightRotation(node: BNode<T>): void {
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

  protected leftRotation(node: BNode<T>): void {
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

  protected leftRightRotation(node: BNode<T>): void {
    this.leftRotation(node.left);
    this.rightRotation(node);
  }

  protected rightLeftRotation(node: BNode<T>): void {
    this.rightRotation(node.right);
    this.leftRotation(node);
  }

  private checkAllNodes(currentNode: BNode<T>): void {
    if (currentNode === null) return;

    this.checkAllNodes(currentNode.left);
    this.checkAllNodes(currentNode.right);

    this.checkBalanceFactor(currentNode);
  }

  public delete(node: BNode<T>): void {
    this.deleteNode(node);
    this.checkAllNodes(this.root);
  }
}

class RBTree<T> extends AVLTree<T> {
  protected root: RBNode<T>;
  public add(node: RBNode<T>): void {
    if (this.root === null) {
      this.root = node;
      return;
    }

    this.addNode(this.root, node);
    this.checkRBRules(this.findNode(this.root, node) as RBNode<T>);
  }
  protected checkRBRules(node: RBNode<T>) {}

  protected checkColor(node: RBNode<T>) {}

  public delete(node: RBNode<T>): void {
    this.deleteNode(node);
  }

  public find(node: RBNode<T>): RBNode<T> {
    return this.findNode(this.root, node) as RBNode<T>;
  }
}

const bTreeExample = (): void => {
  const tree = new BTree<number>();
  const array = [8, 7, 6, 6, 4, 5, 20, 25, 15, 16, 14, 24, 24, 23, 23, 22, 22];
  array.forEach((element) => {
    tree.add(new BNode<number>(element));
  });

  tree.show();
  tree.delete(new BNode<number>(25));
  console.log("After deleting: ");
  tree.show();
};

const avlTreeExample = (): void => {
  const avlTree = new AVLTree<number>();
  const array = [
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
  array.forEach((element) => {
    avlTree.add(new BNode<number>(element));
  });

  avlTree.show();
  console.log("\n\n");
  avlTree.delete(new BNode<number>(12));
  avlTree.show();
};

avlTreeExample();
