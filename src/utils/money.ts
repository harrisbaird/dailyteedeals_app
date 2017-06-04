import CURRENCIES from '../config/currencies'
import {Price} from '../models'

export function findPriceInCents(prices: {[key: string]: Price}, currency: string): string {
  // Product prices are in cents, converted to float and
  // rounded up amount to nearest whole unit.
  // Not ideal but will do for now.
  let price = prices[currency]
  return Math.ceil(price.amount / 100).toString()
}

export function formatMoney(prices: {[key: string]: Price}, currency: string): string {
  let amount = findPriceInCents(prices, currency)
  return CURRENCIES[currency].symbol + amount
}
