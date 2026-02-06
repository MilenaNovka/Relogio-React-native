import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // remove o header
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Alarme',
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <MaterialIcons name="alarm" style={styles.icon} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cronometro"
        options={{
          title: 'Cronômetro',
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <MaterialIcons name="timer" style={styles.icon} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Timer',
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <MaterialIcons name="hourglass-bottom" style={styles.icon} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#f0f0f0', 
    padding: 8,
    borderRadius: 12,
    marginBottom: 20
  },
  icon: {
    color: '#ACC1D3', 
    fontSize: 32,     
  },
});
