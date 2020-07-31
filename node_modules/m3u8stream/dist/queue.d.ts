declare type Callback = (err?: Error, result?: any) => void;
interface Task {
    item: {};
    callback: Callback;
}
export default class Queue {
    _worker: (item: any, cb: Callback) => void;
    _concurrency: number;
    tasks: Task[];
    total: number;
    active: number;
    /**
     * A really simple queue with concurrency.
     */
    constructor(worker: (item: any, cb: Callback) => void, options?: {
        concurrency?: number;
    });
    /**
     * Push a task to the queue.
     */
    push(item: any, callback?: Callback): void;
    /**
     * Process next job in queue.
     */
    _next(): void;
    /**
     * Stops processing queued jobs.
     */
    die(): void;
}
export {};
