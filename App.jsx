import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View,} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
    <Text>dnkjvnskfd</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
