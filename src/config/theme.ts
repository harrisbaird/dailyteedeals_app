import { Dimensions } from 'react-native'
import Device from 'react-native-device-info'

// Common colours
export const BLACK = '#000'
export const WHITE = '#fff'
export const TRANSPARENT = 'transparent'

export const BLACK_40 = '#00000064'
export const BLACK_50 = '#00000080'
export const WHITE_10 = '#ffffff16'

export const PRIMARY = '#111'
export const SECONDARY = '#333'
export const ACCENT = '#8C3130'

export const TEXT = WHITE
export const TEXT_SHADOW = BLACK_40

// Navigation
export const SCREEN_BG = BLACK
export const HEADER_BG = PRIMARY
export const HEADER_TINT = WHITE
export const TAB_BAR_BG = PRIMARY
export const TAB_BAR_ACTIVE_TINT = WHITE
export const TAB_BAR_INACTIVE_TINT = '#BFBFBF'

// Fonts
export const FONT_DEFAULT = 'FiraSans-Regular'
export const FONT_DEFAULT_BOLD = 'FiraSans-SemiBold'

// Grid
export const GRID_ITEMS_PER_ROW = Device.isTablet() ? 4 : 2
export const GRID_MARGIN = 4
export const GRID_ITEM_TEXT_PADDING = 10
export const GRID_ITEM_TITLE_LINE_HEIGHT = 20
export const GRID_ITEM_SUBTITLE_LINE_HEIGHT = 15

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height
