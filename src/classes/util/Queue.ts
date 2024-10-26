export class Queue<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(): T | undefined {
        return this.items.shift();
    }

    removeAt(index: number): T | undefined {
        return this.items.splice(index, 1)[0];
    }

    peek(): T | undefined {
        return this.items[0];
    }

    peekLast(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    forEach(callback: (item: T) => void): void {
        this.items.forEach(callback);
    }
}