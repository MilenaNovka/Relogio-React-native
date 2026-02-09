import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // remove o header
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#ACC1D3',
        
        tabBarStyle: {
          backgroundColor: '#132A3D',
          height: 70,
          fontSize: 20,
          borderTopWidth: 0, // linha
        },
        tabBarLabelStyle: { // texto
          fontSize: 12,           
          fontWeight: 'bold',     
          marginBottom: 5,        
        },
      }}
    >
      <Tabs.Screen
        name="index" // arquivo
        options={{
          title: 'Alarme', // titulo
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
    backgroundColor: '#3D5F7E', 
    padding: 8,
    borderRadius: 12,
    marginBottom: 30
  },
  icon: {
    color: '#ACC1D3', 
    fontSize: 32,     
  },
});
