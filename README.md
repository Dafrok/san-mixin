# SAN MIXIN

## Installation

```
npm i san-mixin
```

## Arguments

- Component {Object} san component
- mixins {Object} mixin prototypes

## Usage

```js
import mixin from 'san-mixin'

const Component = san.defineComponent({
    initData() {
        return {
            foo: 1
        }
    },
    getBar() {
        console.log(this.data.get('bar'))
    }
})

mixin(Component, {
    initData() {
        return {
            bar: 2
        }
    },
    getFoo() {
        console.log(this.data.get('foo'))
    }
})

const instance = new Component()

console.log(instance.getFoo()) // 1
console.log(instance.getBar()) // 2
```