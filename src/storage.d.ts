export interface LocalStorage {
    [key: string]: StorageValue;
}
export interface StorageValue {
    data?: any;
    expire?: number;
}
declare type StorageType = "localStorage" | "sessionStorage";
declare class ReactStorage {
    private _prefix;
    private _type;
    private enabled;
    private storage;
    private static _instance;
    private constructor();
    static getInstance(): ReactStorage;
    set type(type: StorageType);
    get type(): StorageType;
    set prefix(prefix: string);
    get prefix(): string;
    private initialize;
    private _fillPrefix;
    /**
     * 获取对应 key 的 value 值
     * @param key 对应的键
     * @returns
     */
    get(key: string): any;
    /**
     * 存储值
     * @param key 对应的键
     * @param value 对应的值
     * @param expire 过期时间(单位毫秒)
     * @returns
     */
    set(key: string, value: any, expire?: number): any;
    /**
     * 返回所有的 keys
     * @returns
     */
    getKeys(): string[];
    /**
     * 删除对应的key
     * @param key
     */
    remove(key: string): void;
    /**
     * 删除所有 key
     */
    removeAll(): void;
    /**
     * 删除过期的key
     */
    removeExpired(): void;
}
export default ReactStorage;
