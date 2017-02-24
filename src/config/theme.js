/* @flow */

import { Platform } from 'react-native'

export const ITEM_MARGIN = 1

export const COLOUR_HEADER_BG = '#0a0a0a'
export const COLOUR_HEADER_TEXT = '#FFF'
export const COLOUR_BG = '#0e1828'
export const COLOUR_ACCENT = '#2f025a'
export const COLOUR_GRADIENT_START = '#b11b78'
export const COLOUR_GRADIENT_END = '#342594'

export const COLOUR_SPINNER = '#ccc'

export const COLOUR_BLACK = '#000'
export const COLOUR_WHITE = '#fff'
export const COLOUR_TRANSPARENT = 'transparent'

export const COLOUR_SETTINGS_BORDER = Platform.OS == 'ios' ? COLOUR_SPINNER : COLOUR_TRANSPARENT
