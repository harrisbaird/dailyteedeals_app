/* @flow */

import {Share} from 'react-native'

export function showShareDialog(product) {
  let designName = product.design.name
  let artistName = product.design.artist.name

  Share.share(
    {
      message: `Get ${designName} by ${artistName} ${product.buy_url}`,
      url: product.buy_url,
      title: product.design.name
    },
    {
      dialogTitle: 'Share ' + product.design.name
    }
  )
}
