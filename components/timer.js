import React from "react"
import PropTypes from "prop-types"

import { StyleSheet, View, Text } from "react-native"

import { millisecondsToHuman } from "../utils/timer-utils"
import TimerButton from "./timer-button"

export default class Timer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    elapsed: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onEditPress: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired
  }

  render() {
    const { title, project, elapsed, onEditPress } = this.props
    const elapsedString = millisecondsToHuman(elapsed)

    return (
      <View style={styles.timerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>{project}</Text>
        <Text style={styles.elapsedTime}>{elapsedString}</Text>
        <View style={styles.buttonGroup}>
          <TimerButton color="blue" small title="Edit" onPress={onEditPress} />
          <TimerButton
            color="blue"
            small
            title="Remove"
            onPress={this.handleRemovePress}
          />
        </View>
        {this.renderActionButton()}
      </View>
    )
  }

  renderActionButton() {
    const { isRunning } = this.props

    if (isRunning) {
      return (
        <TimerButton
          color="#d82828"
          title="stop"
          onPress={this.handleStopPress}
        />
      )
    }
    return (
      <TimerButton
        color="#21ba45"
        title="start"
        onPress={this.handleStartPress}
      />
    )
  }

  handleRemovePress = () => {
    const { id, onRemovePress } = this.props
    onRemovePress(id)
  }

  handleStartPress = () => {
    const { id, onStartPress } = this.props
    onStartPress(id)
  }

  handleStopPress = () => {
    const { id, onStopPress } = this.props
    onStopPress(id)
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: "white",
    borderColor: "#d6d7da",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0
  },
  title: {
    fontSize: 14,
    fontWeight: "bold"
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
