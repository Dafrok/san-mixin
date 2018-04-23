const san = require('san')
const mixin = require('../index.js')

describe('mixin', function () {

    it('init data', function () {
        const Component = san.defineComponent({
            initData() {
                return {foo: true}
            }
        })
        mixin(Component, {
            initData() {
                return {bar: true}
            }
        })
        const component = new Component()
        expect(component.data.get('foo')).toBe(true)
        expect(component.data.get('bar')).toBe(true)
    })

    it('life cycles', function () {
        const probe = {}
        const Component = san.defineComponent({
            compiled() {
                probe.compiled1 = true
            }
        })
        mixin(Component, {
            compiled() {
                probe.compiled2 = true
            }
        })
        new Component()
        expect(probe.compiled1).toBe(true)
        expect(probe.compiled2).toBe(true)
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