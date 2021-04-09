import { INode } from "./types/node";

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

type Color = "RED" | "BLACK" | "DOUBLE BLACK";

type ColorsConstant = {
  red: Color;
  black: Color;
  double_black: Color;
};

const COLORS: ColorsConstant = {
  red: "RED",
  black: "BLACK",
  double_black: "DOUBLE BLACK",
};

class RBNode<T> extends INode {
  protected _parent: RBNode<T>;
  protected _right: RBNode<T>;
  protected _left: RBNode<T>;
  protected _data: T;
  protected _color: Color;

  constructor(data: T = null) {
    super();
    this._parent = null;
    this._right = null;
    this._left = null;
    this._data = data;
    this._color = COLORS.red;
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
  public set color(color: Color) {
    this._color = color;
  }

  colorFlip() {
    this._color = this._color === COLORS.red ? COLORS.black : COLORS.red;
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
    return node !== null ? this._data === node._data : false;
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

export default BNode;
