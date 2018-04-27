# SAN MIXIN

[![build](https://travis-ci.org/Dafrok/san-mixin.svg?branch=master)]()
[![npm](https://img.shields.io/npm/v/san-mixin.svg)](https://www.npmjs.com/package/san-mixin)
[![codecov](https://codecov.io/gh/Dafrok/san-mixin/branch/master/graph/badge.svg)](https://codecov.io/gh/Dafrok/san-mixin)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

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