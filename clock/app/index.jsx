import { useState } from "react";
import { ScrollView, SafeAreaView, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {useAudioPlayer} from 'expo-audio'
import Modal from 'react-native-modal';


export default function Home() {

  const [alarms, setAlarms] = useState([
    {
      id: Date.now(),
      title: 'Título do alarme',
      time: '00:00',
      hour: '00',
      min: '00',
      freq: 'Todos os dias',
      isOn: false,
    },
  ]);
  const params = useLocalSearchParams();
  useEffect(() => {
    if (params.novaHora) {
      handleAddAlarm(
        params.novoTitulo,
        params.novaHora,
        params.novoMin,
        params.novaFreq
      );
    }
  }, [params.novaHora, params.novoMin]);
  const handleAddAlarm = (title, hour, min, freq) => {
    hour = String(hour).padStart(2, '0');
    min = String(min).padStart(2, '0');
    const newAlarm = {
    id: Date.now(),
    title: title,
    time: hour+':'+min,
    hour: hour,
    min: min,
    freq: freq,
    isOn:true,
  };
  setAlarms([...alarms,newAlarm])
  };
  

  const toggleAlarm = (id) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, isOn: !alarm.isOn } : alarm
      )
    );
  };

  const router = useRouter();

  // _________________________________________________________

  const [isModalVisible, setModalVisible] = useState(false); // controla o modal

  const closeModal = () => {
    setModalVisible(false);
    if (player) {
      player.pause(); 
     player.seekTo(0); // Volta o som para o inicio para a próxima vez
    }
    const agora = new Date();
    const h = String(agora.getHours()).padStart(2, '0');
    const m = String(agora.getMinutes()).padStart(2, '0');
    const alarmeEncontrado = alarms.find(a => 
      a.isOn && a.hour === h && a.min === m
    );
    alarmeEncontrado.isOn = false

  }

  const player = useAudioPlayer(require('../assets/sounds/alarm.mp3')) // som do alarme
  if (player) { // usar o som em loop
    player.loop = true;
  }

  
  
 useEffect(() => {
  const conferirAlarme = setInterval(() => {

    const agora = new Date();
    const h = String(agora.getHours()).padStart(2, '0');
    const m = String(agora.getMinutes()).padStart(2, '0');

    const alarmeEncontrado = alarms.find(a => 
      a.isOn && a.hour === h && a.min === m
    );

    if (alarmeEncontrado) {
      setModalVisible(true);
      player.play();
      console.log("Tocando:", alarmeEncontrado.title);
    }
  }, 1000); // Checa a cada segundo

  return () => clearInterval(conferirAlarme); // Limpa ao fechar o app
}, [alarms]); // Re-executa se a lista de alarmes mudar

function alarmeAtual(){
  const agora = new Date();
    const h = String(agora.getHours()).padStart(2, '0');
    const m = String(agora.getMinutes()).padStart(2, '0');
    const alarmeEncontrado = alarms.find(a => 
      a.isOn && a.hour === h && a.min === m
    );
    return alarmeEncontrado ? alarmeEncontrado.title : ''
}

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

        <Modal 
        isVisible={isModalVisible}
        animationIn={"zoomIn"}
        >
        <View style={styles.modalOverlay}> 
          <View style={styles.esgotado}>
            <Text style={styles.alertMsg}>{alarmeAtual()}</Text>
            <TouchableOpacity style={styles.buttonModal} onPress={closeModal}>
              <Text style={styles.buttonText}>Dispensar</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
      

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
                <Text style={[styles.hour, { color: textColor }]}>{alarm.time}</Text>
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  esgotado: {
    width: '80%',
    backgroundColor: '#ACC1D3',
    padding: 30,
    borderRadius: 25,
    alignItems: 'center'
  },
  alertMsg: {
    color: '#1A3953' ,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonModal: {
    width: '35%',
    padding: 8,
    backgroundColor: '#1A3953',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10
  },
  buttonText: {
    color: '#ACC1D3',
    fontWeight: 'bold'
  }
});
