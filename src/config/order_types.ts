import {Design} from '../models'

const ORDER_TYPES = {
  INDEX_ASC: {
    name: 'Normal',
    sortFn: (a: Design, b: Design) => a.order.index - b.order.index
  },
  PRICE_ASC: {
    name: 'Price (Low To High)',
    sortFn: (a: Design, b: Design) => a.order.price - b.order.price
  },
  PRICE_DESC: {
    name: 'Price (High to Low)',
    sortFn: (a: Design, b: Design) => b.order.price - a.order.price
  }
}

export default ORDER_TYPES
