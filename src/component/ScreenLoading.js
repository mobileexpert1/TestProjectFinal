import React from 'react';
import {Text, View,ActivityIndicator} from 'react-native';

function ScreenLoading(props) {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
      }}>
      <ActivityIndicator size={props.size} />
      <Text
        style={{
          fontSize: 12,
          color: 'black',
          textAlign: 'center',
        }}>
        {props.text}
      </Text>
    </View>
  );
}

export default ScreenLoading;
