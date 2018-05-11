import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frontTileStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 5,
    height: 100,
    width: 50,
  },
  backTileStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderWidth: 5,
    borderRadius: 5,
    height: 100,
    width: 50,
  },
  frontTileText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  backTileText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
const GameTile = ({
  frontText,
  backText,
  selected,
  disabled,
}) => {
  let activeStyle = {};
  if (!disabled) activeStyle = { borderColor: 'red' };
  return (
    <View>
      { !selected &&
        <View style={[styles.frontTileStyle, activeStyle]}>
          <Text style={styles.frontTileText}>{frontText}</Text>
        </View>
      }
      { selected &&
        <View style={styles.backTileStyle}>
          <Text style={styles.backTileText}>{backText}</Text>
        </View>
      }
    </View>
  );
};

export default GameTile;
