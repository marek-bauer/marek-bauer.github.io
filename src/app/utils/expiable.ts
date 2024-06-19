export class Expiable<A> {
  private ttl: number;
  private getter: () => Promise<A>;

  private value: [A, Date] | null = null;

  constructor(timeToLiveInSeconds: number, getter: () => Promise<A>) {
    this.ttl = timeToLiveInSeconds;
    this.getter = getter;
  }

  public async refresh(): Promise<A> {
    const val = await this.getter();
    this.value = [val, new Date()];
    return val;
  }

  public async get(): Promise<A> {
    if (this.value === null) {
      return this.refresh();
    } else if ( (Date.now() - this.value[1].getTime()) / 1000 > this.ttl ) {
      return this.refresh();
    } else {
      return this.value[0];
    }
  }
}