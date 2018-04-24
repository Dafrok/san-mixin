var mixin = sanMixin

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

    it('init data with no initial data', function () {
        const Component = san.defineComponent({})
        mixin(Component, {
            initData() {
                return {foo: true}
            }
        })
        const component = new Component()
        expect(component.data.get('foo')).toBe(true)
    })

    it('life cycles', function () {
        const probe = {}
        const Component = san.defineComponent({
            inited() {
                this.data.set('foo', true)
            }
        })
        mixin(Component, {
            compiled() {
                probe.foo = true
            },
            inited() {
                this.data.set('bar', true)
            }
        })
        const component = new Component()
        expect(probe.foo).toBe(true)
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
                    return this.data.get('baz')
                }
            }
        })
        mixin(Component, {
            computed: {
                bar() {
                    return this.data.get('baz')
                }
            }
        })
        const component = new Component({
            data: {
                baz: true
            }
        })
        expect(component.data.get('foo')).toBe(true)
        expect(component.data.get('bar')).toBe(true)
    })

    it('special members without initial member', function () {
        const Component = san.defineComponent({})
        mixin(Component, {
            computed: {
                foo() {
                    return this.data.get('bar')
                }
            }
        })
        const component = new Component({
            data: {
                bar: true
            }
        })
        expect(component.data.get('foo')).toBe(true)
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