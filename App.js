import React from "react"
import uuidv4 from "uuid/v4"
import { newTimer } from "./utils/timer-utils"

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView
} from "react-native"

import EditableTimer from "./components/editable-timer"
import ToggleTimerForm from "./components/toggle-timer-frm"

export default class App extends React.Component {
  state = {
    timers: [
      {
        title: "Mow the lawn",
        project: "House Chores",
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: false
      },
      {
        title: "Bake squash",
        project: "Kitchen Chores",
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: true
      }
    ]
  }

  handleCreateFormSubmit = timer => {
    const { timers } = this.state

    this.setState({
      timers: [newTimer(timer), ...timers]
    })
  }

  handleFormSubmit = attrs => {
    const { timers } = this.state
    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs
          return {
            ...timer,
            title,
            project
          }
        }
        return timer
      })
    })
  }

  handleRemovePress = timerId => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId)
    })
  }
  toggleTimer = timerId => {
    this.setState(prevState => {
      const { timers } = prevState
      return {
        timers: timers.map(timer => {
          const { id, isRunning } = timer
          if (id === timerId) {
            return {
              ...timer,
              isRunning: !isRunning
            }
          }
          return timer
        })
      }
    })
  }
  componentDidMount() {
    const TIME_INTERVAL = 1000
    this.intervalId = setInterval(() => {
      const { timers } = this.state
      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer
          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed
          }
        })
      })
    }, TIME_INTERVAL)
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
  render() {
    const { timers } = this.state

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.timerListContainer}
        >
          <ScrollView style={styles.timerList}>
            <ToggleTimerForm
              isOpen={false}
              onFormSubmit={this.handleCreateFormSubmit}
            />
            {timers.map(({ title, project, id, elapsed, isRunning }) => (
              <EditableTimer
                key={id}
                title={title}
                project={project}
                id={id}
                elapsed={elapsed}
                isRunning={isRunning}
                onFormSubmit={this.handleFormSubmit}
                onRemovePress={this.handleRemovePress}
                onStartPress={this.toggleTimer}
                onStopPress={this.toggleTimer}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D7DA"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  timersList: {
    paddingBottom: 15
  },
  timerListContainer: {
    flex: 1
  }
})
