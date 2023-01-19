import {
  createTable,
  isHeader,
  isHeaderLeaf,
  isHidden,
  alignment,
  sortDirectionClass,
  sorted
} from '@/components/Grid/functions/functions'
import { shallowMount } from '@vue/test-utils'
import stachRowOrganizedPackage from './fixtures/stach-row-organized-package.json'

describe('GridComp.vue', () => {
  let table:any = null

  beforeEach(() => {
    table = stachRowOrganizedPackage.tables.main
  })
  describe('feature functions', () => {
    describe('createTable function', () => {
      it('return a deep clone of given table', () => {
        const myTable:any = createTable(table, true)

        expect(myTable.definition.columns).toBe(table.definition.columns)
      })

      it('adds isOrderedAsc properties to leaf headers', () => {
        const myTable:any = createTable(table, true)

        expect(myTable.data.rows[2].headerCellDetails[0].isOrderedAsc).not.toBeUndefined()
      })

      it('does not add isOrderedAsc properties to non-leaf headers', () => {
        const myTable:any = createTable(table, true)

        expect(myTable.data.rows[0].headerCellDetails[0].isOrderedAsc).toBeUndefined()
      })
    })

    describe('isHeader function', () => {
      it('returns true if given row is a header', () => {
        expect(isHeader(table.data.rows[0])).toBeTruthy()
      })

      it('returns false if given row is not a header', () => {
        expect(isHeader(table.data.rows[3])).toBeFalsy()
      })
    })

    describe('isHeaderLeaf function', () => {
      it('returns if a header is a leaf or not', () => {
        expect(isHeaderLeaf(table.data.rows[0], 0)).toBeFalsy()
        expect(isHeaderLeaf(table.data.rows[0], 1)).toBeFalsy()
        expect(isHeaderLeaf(table.data.rows[2], 0)).toBeTruthy()
      })
    })

    describe('isHidden function', () => {
      it('returns if a column is hidden or not', () => {
        expect(isHidden(table, table.data.rows[0], 2)).toBeTruthy()
        expect(isHidden(table, table.data.rows[0], 3)).toBeFalsy()
      })
    })

    describe('alignment function', () => {
      it('returns alignment of a column', () => {
        expect(alignment(table, table.data.rows[2], 0, 'horizontal')).toEqual('RIGHT')
      })

      it('returns undefined if no alignment is defined for a column', () => {
        expect(alignment(table, table.data.rows[0], 3, 'horizontal')).toBeUndefined()
      })
    })

    describe('sortDirectionClass function', () => {
      it('returns undefined if given row is not a header leaf', () => {
        expect(sortDirectionClass(table.data.rows[0], 0)).toBeUndefined()
      })

      it('returns "asc" if given header row is ordered ascending', () => {
        table.data.rows[2].headerCellDetails[0].isOrderedAsc = true
        expect(sortDirectionClass(table.data.rows[2], 0)).toEqual('asc')
      })

      it('returns "dsc" if given header row is ordered descending', () => {
        table.data.rows[2].headerCellDetails[0].isOrderedAsc = false
        expect(sortDirectionClass(table.data.rows[2], 0)).toEqual('dsc')
      })
    })
  })
})
