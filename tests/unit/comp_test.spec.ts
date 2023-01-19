import GridComponentVue from "@/components/Grid/GridComponent.vue"
import { shallowMount } from '@vue/test-utils'
import { ref } from 'vue'
import stachRowOrganizedPackage from './fixtures/stach-row-organized-package.json'
describe ('comp_test', () => {
    let table: any
    const wrapper = shallowMount(GridComponentVue as any)
    beforeEach(() => {
        table = stachRowOrganizedPackage.tables.main
    })
    it ('test', async () =>{
        const tempWrapper = ref(shallowMount(GridComponentVue as any))
        await tempWrapper.value.setProps({table})
        expect(tempWrapper.value.findAll('th').at(1).attributes('colspan')).toEqual('2')
    })
    it('renders correct count of tr elements', async () => {
        const tempWrapper = ref(shallowMount(GridComponentVue as any))
        await tempWrapper.value.setProps({ table })
        expect(tempWrapper.value.findAll('tr').length).toEqual(18)
      })
    
      it('renders correct count of th elements (excluding hidden ones)', async () => {
        const tempWrapper = ref(shallowMount(GridComponentVue as any))
        await tempWrapper.value.setProps({ table })
        expect(tempWrapper.value.findAll('th').length).toEqual(12)
      })
    
      it('renders correct count of td elements (excluding hidden ones)', async () => {
        const tempWrapper = ref(shallowMount(GridComponentVue as any))
        await tempWrapper.value.setProps({ table })
        expect(tempWrapper.value.findAll('td').length).toEqual(105)
      })
    
      it('renders correct rowspan for the first th element', async () => {
        const tempWrapper = ref(shallowMount(GridComponentVue as any))
        await tempWrapper.value.setProps({ table })
        expect(tempWrapper.value.find('th').attributes('rowspan')).toEqual('3')
      })
    
      it('renders correct colspan for the second th element', async () => {
        const tempWrapper = ref(shallowMount(GridComponentVue as any))
        await tempWrapper.value.setProps({ table })
        expect(tempWrapper.value.findAll('th').at(1).attributes('colspan')).toEqual('2')
      })
    
      it('renders correct text-align for the second td element', async () => {
        const tempWrapper = ref(shallowMount(GridComponentVue as any))
        await tempWrapper.value.setProps({ table })
        expect(tempWrapper.value.findAll('td').at(1).attributes('style')).toMatch(/text-align:\s?right/i)
      })
    
      it('renders correct padding-left for the div of 22nd td element', async () => {
        const tempWrapper = ref(shallowMount(GridComponentVue as any))
        await tempWrapper.value.setProps({ table })
        expect(tempWrapper.value.findAll('td').at(21).find('div').attributes('style')).toMatch(/padding-left:\s?1em/)
      })
    
      describe('sorting feature', () => {
        it('renders initial sort arrows as ascending order', async () => {
            const tempWrapper = ref(shallowMount(GridComponentVue as any))
            await tempWrapper.value.setProps({ table })
          expect(
            tempWrapper.value.findAll('span.arrow').wrappers.every(wrapper2 => wrapper2.classes('asc') && !wrapper2.classes('dsc'))
          ).toBeTruthy()
        })
    
        it('renders a sort arrow as opposite after it is clicked', async () => {
          const tempWrapper = ref(shallowMount(GridComponentVue as any))
          await tempWrapper.value.setProps({ table })
          // Get the first arrow
          const firstArrowWrapper = tempWrapper.value.find('span.arrow')
          // Click the arrow
          await firstArrowWrapper.trigger('click')
          expect(firstArrowWrapper.classes('dsc')).toBeTruthy()
        })
    
        it('sorts in descending order', async () => {
          const tempWrapper = ref(shallowMount(GridComponentVue as any))
          await tempWrapper.value.setProps({ table })
          // Get the first arrow
          const firstArrowWrapper = tempWrapper.value.find('span.arrow')
          // Click the arrow
          await firstArrowWrapper.trigger('click')
          // The second td should be 100 now
          expect(tempWrapper.value.findAll('td').at(1).text()).toEqual('100')
        })
    
        it('sorts in ascending order', async () => {
          const tempWrapper = ref(shallowMount(GridComponentVue as any))
          await tempWrapper.value.setProps({ table })
          // Get the first arrow
          const firstArrowWrapper = tempWrapper.value.find('span.arrow')
          // Click the arrow twice to achieve ascending sorting
          firstArrowWrapper.trigger('click')
          await firstArrowWrapper.trigger('click')
          // The second td should be 0.15 now
          expect(tempWrapper.value.findAll('td').at(1).text()).toEqual('0.15')
        })
      })
})