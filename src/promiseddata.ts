/**
 * Listenable interface compatible with RXJS BehaviorSubject
 */
export interface IPromisedData {
  get value(): any;
  next(data: any): void;
  subscribe(next?: ((value: any) => void), error?: (error: any) => void, complete?: () => void): IPromisedSub;
}

/**
 * interface compatible with RXJS Subscription
 */
export interface IPromisedSub {
  unsubscribe(): void;
}

/**
 * Fake listenable object compatible with RXJS BehaviorSubject
 */
export class PromisedData implements IPromisedData {
  private _data: any = [];
  private _handlers: ((data: any[]) => void)[] = [];

  get value() { return this._data; }

  constructor(initialData: any[]) {
    this._data = initialData;
  }

  next(data: any[]) {
    this._data = data;
    this._handlers.forEach(h => h?.call(this, data));
  }

  subscribe (completed: (data: any[]) => void): IPromisedSub {
    this._handlers.push(completed);

    // immediately send last value
    setTimeout(() => completed?.call(this, this._data), 1);

    return new PromisedSubscription(this, completed);
  }

  removeHadler (handler: any) {
    this._handlers = this._handlers.filter(h => h !== handler);
  }
}

class PromisedSubscription implements IPromisedSub {
  private _parent: PromisedData;
  private _handler: any;

  constructor(parent: PromisedData, handler: any) {
    this._handler = handler;
    this._parent = parent;
  }

  unsubscribe() {
    this._parent.removeHadler(this._handler);
  }
}