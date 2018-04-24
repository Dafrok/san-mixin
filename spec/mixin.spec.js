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
        const probe = {}
        const Component = san.defineComponent({
            inited() {
                this.data.set('name', 'foo')
                probe.compiled1 = true
            }
        })
        mixin(Component, {
            inited() {
                this.data.set('age', 16)
                probe.compiled2 = true
            }
        })
        const component = new Component()
        expect(probe.compiled1).toBe(true)
        expect(probe.compiled2).toBe(true)
        expect(component.data.get('name')).toBe('foo')
        expect(component.data.get('age')).toBe(16)
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
                    return true
                }
            }
        })
        mixin(Component, {
            computed: {
                bar() {
                    return true
                }
            }
        })
        const component = new Component()
        expect(component.data.get('foo')).toBe(true)
        expect(component.data.get('bar')).toBe(true)
    })

    it('member functions', function () {
        const probe = {}
        const Component = san.defineComponent({
            foo() {
                return true
            }
        })
        mixin(Component, {
            bar() {
                return true
            }
        })
        const component = new Component()
        component.foo()
        component.bar()
        expect(component.foo()).toBe(true)
        expect(component.bar()).toBe(true)
    })
})