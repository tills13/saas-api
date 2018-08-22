declare interface QueryContext {
  userId: string
}

declare interface BoardPosition {
  x: number;
  y: number;
}

declare module "redis" {
  export function createClient (config): any

  export interface RedisClient extends NodeJS.EventEmitter {
    set (key: string, value: string): Promise<string>;
    getAsync (key: string): Promise<string>;
    zrangeAsync (key: string, start: number, end: number, withScores: "withscores");
    exists (key: string, value: string): Promise<number>;
  }
}
