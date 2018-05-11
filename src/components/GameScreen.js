import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GameTile from './GameTile';
import Die from './Die';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jackpotContainer: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'white',
    borderBottomColor: 'black',
    borderWidth: 5,
  },
  diceContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderTopColor: 'white',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  statusText: {
    fontSize: 48,
    color: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 2,
    right: 25,
    bottom: 25,
    height: 75,
    width: 75,
  },
});

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tileFrontText: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      tileBackText: ['*', 'J', 'A', 'C', 'K', 'P', 'O', 'T', '*'],
      tileDisabled: [true, true, true, true, true, true, true, true, true],
      tileSelected: [false, false, false, false, false, false, false, false, false],
      die1Value: 0,
      die2Value: 0,
      selectionRemains: false,
      gameStatus: '',
    };
  }
  rollDice = () => {
    const die1Value = Math.floor(Math.random() * 6) + 1;
    const die2Value = Math.floor(Math.random() * 6) + 1;

    this.activateTile(die1Value, die2Value);
    this.setState({ die1Value, die2Value });
  };
  activateTile = (die1Value, die2Value) => {
    const totalValue = die1Value + die2Value;
    const newTileDisabled = [...this.state.tileDisabled];
    let winner = false;
    let selectionRemains = false;

    if (totalValue < 10) {
      if (!this.state.tileSelected[totalValue - 1]) {
        newTileDisabled[totalValue - 1] = false;
        this.setState({ tileDisabled: newTileDisabled });
        selectionRemains = true;
      }
    }
    if (!this.state.tileSelected[die1Value - 1]) {
      newTileDisabled[die1Value - 1] = false;
      this.setState({ tileDisabled: newTileDisabled });
      selectionRemains = true;
    }
    if (!this.state.tileSelected[die2Value - 1]) {
      newTileDisabled[die2Value - 1] = false;
      this.setState({ tileDisabled: newTileDisabled });
      selectionRemains = true;
    }

    winner = !this.state.tileSelected.includes(false);
    if (!selectionRemains && winner) this.setState({ gameStatus: 'You WIN!' });
    else if (!selectionRemains) this.setState({ gameStatus: 'GameOver' });
    this.setState({ selectionRemains });
  };
  selectTile = (index) => {
    const currTileSelected = [...this.state.tileSelected];
    currTileSelected[index] = true;
    this.setState({
      tileSelected: currTileSelected,
      tileDisabled: [true, true, true, true, true, true, true, true, true],
    }, this.rollDice);
  };
  displayTiles = () => {
    const tilesComponent = [];
    this.state.tileFrontText.forEach((value, index) => {
      const tile = (
        <TouchableOpacity
          key={value}
          disabled={this.state.tileDisabled[index]}
          onPress={() => { this.selectTile(index); }}
        >
          <GameTile
            frontText={this.state.tileFrontText[index]}
            backText={this.state.tileBackText[index]}
            selected={this.state.tileSelected[index]}
            disabled={this.state.tileDisabled[index]}
          />
        </TouchableOpacity>
      );
      tilesComponent.push(tile);
    });
    return tilesComponent;
  };
  resetGame = () => {
    this.setState({
      tileDisabled: [true, true, true, true, true, true, true, true, true],
      tileSelected: [false, false, false, false, false, false, false, false, false],
      gameStatus: '',
    }, this.rollDice);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.jackpotContainer}>
          {this.displayTiles()}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.statusText}>{this.state.gameStatus}</Text>
        </View>
        <View style={styles.diceContainer}>
          <Die value={this.state.die1Value} disabled />
          <Die value={this.state.die2Value} disabled />
        </View>
        { this.state.selectionRemains ||
          <View style={styles.buttonContainer}>
            <Button backgroundColor="navy" fontColor="oldlace" onPress={this.resetGame}>
              Start
            </Button>
          </View>
          }
      </View>
    );
  }
}

export default GameScreen;
