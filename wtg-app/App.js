import MapView from 'react-native-maps';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { MapScreen } from './screen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MapScreen />
      {/* <MapView style={styles.map}/> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
