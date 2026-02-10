import { useState } from "react";
import { ScrollView, SafeAreaView, TouchableOpacity, Text, View, StyleSheet, TextInput} from "react-native";

export default function Home(){

    const [hora, setHora] = useState(null);
    const [minuto, setMinuto] = useState(null);
    const [dias, setDias] = useState([
        {id:1, letra:'D',abreviacao:'Dom', selecionado: false},
        {id:2, letra:'S',abreviacao:'Seg', selecionado: false},
        {id:3, letra:'T',abreviacao:'Ter', selecionado: false},
        {id:4, letra:'Q',abreviacao:'Qua', selecionado: false},
        {id:5, letra:'Q',abreviacao:'Qui', selecionado: false},
        {id:6, letra:'S',abreviacao:'Sex', selecionado: false},
        {id:7, letra:'S',abreviacao:'Sab', selecionado: false}
    ])

    const toggleDia = (id) => {
        setDias(dias.map(dia => 
            dia.id === id ? { ...dia, selecionado: !dia.selecionado } : dia
        ));
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Adicione um alarme</Text>
                <View style={styles.time}>
                    <TextInput style={[styles.display,styles.hour]}
                               value ={hora}
                               placeholder="00"
                               onChangeText={(texto)=> setHora(texto)}
                               keyboardType="numeric"
                               maxLength={2}
                    />
                    <Text style={styles.display}>:</Text>
                    <TextInput style={[styles.display,styles.min]}
                               value ={minuto}
                               placeholder="00"
                               onChangeText={(texto)=> setMinuto(texto)}
                               keyboardType="numeric"
                               maxLength={2}
                    />
                </View>

                <View style={styles.container2}>
                    <View style={styles.days}>
                        {dias.map((dia)=>{
                                <TouchableOpacity key={dia.id} onPress={()=>toggleDia(dia.id)}>
                                    <View style={[styles.day,{backgroundColor: dia.selecionado ? '#ACC1D3' : '#2E5077'}]}>
                                        <Text style={styles.textDay}>{dia.letra}</Text>
                                    </View>
                                </TouchableOpacity>
                            
                        })}
                    </View>
                </View>
                
                
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#1A3953',
  },
  header:{

  },
  title:{
    color:'white',
    alignSelf:'center',
    marginTop:'40%',
    marginBottom:'10%'
  },
  time:{
    flexDirection:'row',
    justifyContent:'center',
    marginBottom:'5%'
  },
  display: {
    color: '#ACC1D3',
    fontSize: 50,
    fontWeight: '500',
    letterSpacing: 2,
    letterSpacing: 3,
    
  },
  hour:{
    textAlign:'right',
    width:65,
  },
  min:{
    textAlign:'left',
        width:65,
  },
  container2:{
    backgroundColor:'#3D5F7E',
    marginTop:'40%',
    alignSelf:'center',
    height:'60%',
    width:'90%',
    borderRadius:45
  },
  days:{
    flexDirection:'row'
  },
  day:{
    height:50,
    width:50
  },
  textDay:{
    color:'green'
  }
})