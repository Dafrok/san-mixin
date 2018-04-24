const san = require('san')
const mixin = require('../index.js')

describe('mixin', function () {

    it('init data', function () {
        const Component = san.defineComponent({
            initData() {
                return {foo: true, from: 'component', func: () => {
                    return this.data.get('foo');
                }}
            }
        })
        mixin(Component, {
            initData() {
                return {bar: true, from: 'mixin'}
            }
        })
        const component = new Component()
        expect(component.data.get('foo')).toBe(true)
        expect(component.data.get('bar')).toBe(true)
        expect(component.data.get('func')()).toBe(true)
        expect(component.data.get('from')).toBe('component')
    })

    it('life cycles', function () {
        const Component = san.defineComponent({
            inited() {
                this.data.set('foo', true)
            }
        })
        mixin(Component, {
            inited() {
                this.data.set('bar', true)
            }
        })
        const component = new Component()
        expect(component.data.get('foo')).toBe(true)
        expect(component.data.get('bar')).toBe(true)
    })

    it('attributes', function () {
        const Component = san.defineComponent({})
        mixin(Component, {
            delimiters: true
        })
        new Component()
        expect(Component.prototype.delimiters).toBe(true)
    })

    it('special members', function () {
        const Component = san.defineComponent({
            computed: {
                foo() {
                    return this.data.get('foo')
                }
            }
        })
        mixin(Component, {
            computed: {
                bar() {
                    return this.data.get('foo')
                }
            }
        })
        const component = new Component({
            data: {
                foo: true
            }
        })
        expect(component.data.get('foo')).toBe(true)
        expect(component.data.get('bar')).toBe(true)
    })

    it('member functions', function () {
        const Component = san.defineComponent({
            foo() {
                return this.data.get('foo')
            }
        })
        mixin(Component, {
            bar() {
                return this.data.get('bar')
            }
        })
        const component = new Component({
            data: {
                foo: true,
                bar: true
            }
        })
        expect(component.foo()).toBe(true)
        expect(component.bar()).toBe(true)
    })
})