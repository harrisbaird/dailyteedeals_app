interface Currency {
  name: string,
  symbol: string,
  icon: string
}

const CURRENCIES: { [key: string]: Currency; } = {
  USD: {
    name: 'United States Dollar',
    symbol: '$',
    icon: 'usd'
  },
  GBP: {
    name: 'British Pound',
    symbol: '£',
    icon: 'gbp'
  },
  EUR: {
    name: 'Euro',
    symbol: '€',
    icon: 'eur'
  }
}

export default CURRENCIES
