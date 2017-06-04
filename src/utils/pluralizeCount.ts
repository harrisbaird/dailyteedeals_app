const pluralizeCount = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`

export default pluralizeCount
