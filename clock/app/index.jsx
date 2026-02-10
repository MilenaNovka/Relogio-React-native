import { useState } from "react";
import { ScrollView, SafeAreaView, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";

export default function Alarme() {
  const [alarms, setAlarms] = useState([
    {
      id: Date.now(),
      title: 'Título do alarme',
      hour: '00:00',
      freq: 'Todos os dias',
      isOn: false,
    },
  ]);

  const toggleAlarm = (id) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, isOn: !alarm.isOn } : alarm
      )
    );
  };

  const router = useRouter();
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Alarme</Text>
        <TouchableOpacity
           onPress={()=>router.push("/addAlarm")
           }>
            <FontAwesome name="plus" size={24} color="#E5EDF5" style={styles.addButton}/>
        </TouchableOpacity>
        </View>
      

      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {alarms.map((alarm) => {
          const textColor = alarm.isOn ? '#ACC1D3' : '#1A3953';

          return (
            <View key={alarm.id} style={styles.card}>
              <View style={styles.titleAndHour}>
                <Text style={[styles.titleAlarm, { color: textColor }]}>{alarm.title}</Text>
                <Text style={[styles.hour, { color: textColor }]}>{alarm.hour}</Text>
              </View>

              <View style={styles.buttonAndFreq}>
                <Text style={[styles.freq, { color: textColor }]}>{alarm.freq}</Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleAlarm(alarm.id)}
                  style={[styles.button,{ backgroundColor: alarm.isOn ? "#2E5077" : "#4A6C8A" },]}
                >
                  <View
                    style={[styles.buttonCircle,{ alignSelf: alarm.isOn ? "flex-end" : "flex-start" },]}
                  />
                </TouchableOpacity>
              </View> {/*Fim View do botão e frequência */}
            </View> /*Fim View de alarme como um todo */
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const textFont = 'arial';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A3953',
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    margin:5,
    marginHorizontal:25,
    justifyContent:'space-between'
  },
  title: {
    
    color: 'white',
    fontSize: 22,
  },
  addButton:{
    
  },
  list: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
  },
  card: {
    backgroundColor: '#6D8DA8',
    height: 80,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 21,
  },
  titleAlarm: {
    fontFamily: textFont,
  },
  hour: {
    fontFamily: textFont,
    fontSize: 35,
    marginTop: 1,
  },
  titleAndHour: {
    flexDirection: 'column',
    height: '30%',
  },
  buttonAndFreq: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  freq: {
    marginRight: 10,
  },
  button: {
    width: 60,
    height: 32,
    borderRadius: 16,
    padding: 4,
    justifyContent: "center",
  },
  buttonCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5EDF5",
  }
});

