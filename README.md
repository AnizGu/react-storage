# React Stroage
> 带过期时间的本地存储

[![NPM](https://img.shields.io/npm/v/@gulibs/react-storage.svg)](https://www.npmjs.com/package/react-storage)

## 安装

```bash
npm install --save react-storage
```

**or**

```bash
yarn add react-storage
```
### 使用

```typescript
import { ReactStorage } from '@gulibs/react-storage';

const App: React.FC = ()=> {

    const storage = ReactStorage.getInstance();

    useEffect(()=> {
        storage.type = 'sessionStorage';
        storage.type = 'localStorage';
        storage.set('hello', '你好');
        console.log('get', storage.get('hello'));
        console.log("getKeys", storage.getKeys());
        storage.remove('test');
        storage.removeExpired();
        storage.removeAll();
    }, []);
    ...
}
```
