import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CurrentStateIndicator({ state, style }) {
  return (
    <View style={[styles.page, style]}>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    
  }
});