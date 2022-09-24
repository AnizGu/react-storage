
export interface LocalStorage {
    [key: string]: StorageValue;
}

export interface StorageValue {
    data?: any;
    expire?: number;
}

declare type StorageType = "localStorage" | "sessionStorage";

const _storage: LocalStorage = {}; // 本地变量后备

/**
 * 检测storage 是否可用
 * @param storage 
 * @returns 
 */
function detect(type: StorageType) {
    try {
        const storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

class ReactStorage {

    private _prefix: string = '';
    private _type: StorageType = 'localStorage';
    private enabled: boolean = false;
    private storage: Storage;
    private static _instance: ReactStorage;

    private constructor() {
        this.enabled = detect(this._type);
        this.storage = window[this._type];
    }

    static getInstance() {
        if (!ReactStorage._instance) {
            ReactStorage._instance = new ReactStorage()
        }
        return ReactStorage._instance
    }

    set type(type: StorageType) {
        console.log('setType')
        this._type = type;
        this.initialize(this._type);
    }

    get type() {
        return this._type;
    }

    set prefix(prefix: string) {
        this._prefix = prefix;
    }

    get prefix() {
        return this._prefix;
    }

    private initialize(type: StorageType) {
        this.enabled = detect(type);
        this.storage = window[type];
    }

    private _fillPrefix(key: string) {
        if (!this.prefix) return key;
        if (key && key.indexOf(this.prefix) === 0)
            return key;
        return `${this.prefix}${key}`;
    }

    /**
     * 获取对应 key 的 value 值
     * @param key 对应的键
     * @returns 
     */
    get(key: string) {
        let obj: StorageValue = {};
        key = this._fillPrefix(key);
        if (this.enabled) {
            const value = this.storage.getItem(key);
            if (value)
                obj = JSON.parse(value);
        } else {
            obj = _storage[key];
        }

        if (obj && obj.data) {
            if (!obj.expire || obj.expire > (new Date()).getTime()) {
                return obj.data;
            }
            this.remove(key);
        }
        return undefined;
    }

    /**
     * 存储值
     * @param key 对应的键
     * @param value 对应的值
     * @param expire 过期时间(单位毫秒)
     * @returns 
     */
    set(key: string, value: any, expire?: number) {
        const obj: StorageValue = {
            data: value
        };

        key = this._fillPrefix(key);

        if (expire && expire > 0) {
            obj.expire = (new Date()).getTime() + expire;
        }

        if (this.enabled) {
            this.storage.setItem(key, JSON.stringify(obj));
        } else {
            _storage[key] = obj;
        }
        return value;
    }

    /**
     * 返回所有的 keys
     * @returns 
     */
    getKeys() {
        let keys: string[] = [];
        let resultKeys: string[] = [];

        if (this.enabled) {
            keys = Object.keys(this.storage);
        } else {
            keys = Object.keys(_storage);
        }

        keys.forEach((key) => {
            if (this.prefix) {
                const index = key.indexOf(this.prefix);
                const prefixLength = this.prefix.length;
                if (index === 0) {
                    resultKeys.push(key.substring(prefixLength));
                }
            } else {
                resultKeys.push(key);
            }
        });

        return resultKeys;
    }

    /**
     * 删除对应的key
     * @param key 
     */
    remove(key: string) {
        key = this._fillPrefix(key);
        if (this.enabled) {
            this.storage.removeItem(key);
        } else {
            delete _storage[key];
        }
    }

    /**
     * 删除所有 key
     */
    removeAll() {
        const keys = this.getKeys();
        keys.forEach((key) => {
            this.remove(key);
        });
    }

    /**
     * 删除过期的key
     */
    removeExpired() {
        const keys = this.getKeys();
        keys.forEach((key) => {
            this.get(key);
        });
    }
};

export default ReactStorage;