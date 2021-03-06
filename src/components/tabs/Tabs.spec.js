import { shallowMount } from '@vue/test-utils'
import BTabs from '@components/tabs/Tabs'

let wrapper

describe('BTabs', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTabs)
        wrapper.setData({
            tabItems: [
                {
                    isActive: true,
                    activate: jest.fn(),
                    deactivate: jest.fn(),
                    visible: true,
                    $slots: {}
                },
                {
                    isActive: false,
                    clickable: false,
                    activate: jest.fn(),
                    deactivate: jest.fn(),
                    visible: true,
                    $slots: {}
                }
            ]
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTabs')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('calls changeTab when value is changed', () => {
        wrapper.vm.changeTab = jest.fn()
        wrapper.setProps({value: 1})
        expect(wrapper.vm.changeTab).toHaveBeenCalled()
    })

    it('emit change event with value when changeTab is called', () => {
        const idx = 1
        wrapper.vm.changeTab(idx)
        const valueEmitted = wrapper.emitted()['change'][0]
        expect(valueEmitted).toContainEqual(idx)
        expect(wrapper.vm.activeTab).toEqual(idx)
    })

    it('emit input event with value when tabClick is called', () => {
        const val = 1
        wrapper.vm.changeTab = jest.fn()
        wrapper.vm.tabClick(val)
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(val)
        expect(wrapper.vm.changeTab).toHaveBeenCalled()
    })
})
