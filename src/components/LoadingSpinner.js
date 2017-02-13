/* @flow */

import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { COLOUR_SPINNER } from '../constants'

type Props = {
  loading: boolean,
}

class LoadingSpinner extends React.Component<void, Props, void>{
  render() {
    let { loading } = this.props

    if (!loading) return null

    return (
      <ActivityIndicator size='large' color={COLOUR_SPINNER} style={styles.spinner}/>
    )
  }
}


const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});


const mapStateToProps = (state) => {
  return {
    loading: state.deals.loading,
  }
}

export default connect(
	mapStateToProps,
)(LoadingSpinner)
