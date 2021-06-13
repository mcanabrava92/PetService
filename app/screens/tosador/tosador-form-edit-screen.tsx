// import React, { useState,useEffect } from "react"
// import { TextStyle, View, ViewStyle, Alert, Text, FlatList } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { observer } from "mobx-react-lite"
// import { Button, Header, Screen, TextField, Wallpaper } from "../../components"
// import { color, spacing } from "../../theme"
// import { useStores } from "../../models"
// //import { State } from "react-native-gesture-handler"
// import DatePicker from 'react-native-datepicker'
// import { RadioGroup } from "react-native-radio-buttons-group"
// import TosadorService from "../../services/tosador-service"
// import PetService from "../../services/pet-service"
// import TosadorModel from "../../models/tosador-model"


// const FULL: ViewStyle = {
//   flex: 1,
// }
// const LIST_TEXT: TextStyle = {
//   marginLeft: 10,
// }
// const FLAT_LIST: ViewStyle = {
//   paddingHorizontal: spacing[4],
// }
// const BUTTON_SELECT: ViewStyle = {
//   backgroundColor: "green",
//   alignSelf: "stretch",
// }
// const CONTAINER: ViewStyle = {
//   backgroundColor: color.transparent,
// }
// const HEADER: TextStyle = {
//   paddingBottom: spacing[5] - 1,
//   paddingHorizontal: spacing[4],
//   paddingTop: spacing[3],
// }
// const HEADER_TITLE: TextStyle = {
//   fontSize: 12,
//   fontWeight: "bold",
//   letterSpacing: 1.5,
//   lineHeight: 15,
//   textAlign: "center",
// }
// const LIST_CONTAINER: ViewStyle = {
//   alignItems: "center",
//   flexDirection: "row",
//   padding: 10,
// }
// const CONTAINER_ADD: ViewStyle = {
//   ...LIST_CONTAINER,
//   alignItems: "center",
//   flexDirection: "column",
//   padding: 10,
//   alignSelf: "center",
//   alignContent: "center",
// }
// const BUTTON_ADD: ViewStyle = {
//   backgroundColor: "green",
//   alignSelf: "center",
//   width: 110,
// }
// const TEXT_FIELD: ViewStyle = {
//   width: 300,
// }
// const TEXT_FIELD_CONTENT: TextStyle = {
//   fontSize: 16,
//   fontWeight: "bold",
//   color: "#5D2555",
//   padding: 8,
// }

// export const TosadorFormEditScreen = observer(function TosadorFormEditScreen() {
//   const navigation = useNavigation()
//   const goBack = () => navigation.goBack()

//   const tosadorService = new TosadorService()
//   const petService = new PetService()

//   const { tosadorStore } = useStores()
  
//   //const [radioButtonsData, setRadioButtonsData] = useState([]); 
//   const [especialidadeSelecionada, setSelecionarEspecialidade] = useState("");
//   const [nomeSelecionado, setSelecionarNome] = useState("");
//   const [status, setSelecionarStatus] = useState("");
//   const [imagemSelecionada, setImagemSelecionada] = useState("");
//   const [dataAtendimento, setDataAtendimentoSelecionada] = useState("");
//   const [petId, setPetId] = useState("");
//   const [pets, setPets] = useState([]);
//  // const [petRadioGroup, setSelecionarPetId] = useState(radioButtonsData);


//   async function loadPets() {
//     setPets(await petService.getPets())
   
//   }


//   async function loadPasseadorData() {
//     const tosador = await tosadorService.getTosadorById(tosadorStore.tosador)
//     setSelecionarEspecialidade (tosador.especialidade)
//     setSelecionarNome (tosador.nome)
//     setSelecionarStatus (tosador.status)
//     setImagemSelecionada (tosador.imagem)
//     setDataAtendimentoSelecionada(tosador.dataAtendimento)
    
//     setPetId(tosador.petId)
//   }

//   useEffect(() => {
//     loadPets()
//     loadPasseadorData()
//   }, [])

//   async function editarTosador() {
//     if(petId){
//     const tosador = new TosadorModel()
//         tosador.nome = nomeSelecionado,
//         tosador.especialidade = especialidadeSelecionada,
//         tosador.status = status,
//         tosador.dataAtendimento = dataAtendimento,
//         tosador.petId = petId
      
//       await tosadorService.updateTosador(tosadorStore.tosador, tosador)

//       navigation.navigate("home")
//       navigation.navigate("tosadorList")
//     } else {
//       Alert.alert(
//         "Atenção",
//         "Olá antes de cadastrar o Tosador é necessário cadastrar o Pet para o Atendimento",
//         [
//           { text: "OK", onPress: () => navigation.navigate('home') }
//         ]
//       );
//   }
// }

//   return (
//     <View testID="TosadorListScreen" style={FULL}>
//       <Wallpaper />
//       <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
//         <Header
//           headerText="Editar Tosador"
//           leftIcon="back"
//           onLeftPress={goBack}
//           style={HEADER}
//           titleStyle={HEADER_TITLE}
//         />
//         <View style={CONTAINER_ADD}>
//           <TextField
//             value={nomeSelecionado}
//             onChangeText={setSelecionarNome}
//             inputStyle={TEXT_FIELD_CONTENT}
//             style={TEXT_FIELD}
//             placeholder="Nome"/>
        
//           <TextField
//             value={especialidadeSelecionada}
//             onChangeText={setSelecionarEspecialidade}
//             inputStyle={TEXT_FIELD_CONTENT} 
//             style={TEXT_FIELD}
//             placeholder="Especialidade"/>
          
//           <TextField
//             value={status}
//             onChangeText={setSelecionarStatus}
//             inputStyle={TEXT_FIELD_CONTENT}
//             style={TEXT_FIELD}
//             placeholder="Status"/>
            
//             <TextField
//             value={imagemSelecionada}
//             onChangeText={setImagemSelecionada}
//             inputStyle={TEXT_FIELD_CONTENT}
//             style={TEXT_FIELD}
//             placeholder="Informe a Url da imagem"/>
            
//             <TextField 
//             value="informe a data do atendimento"
//             style={TEXT_FIELD}/>
            
//             <DatePicker
//             format="DD/MM/YYYY"
//             mode="date"
//             placeholder="Informe a data do Atendimento"
//             style={{width: 200, backgroundColor: "white"}}
//             date={dataAtendimento}
//             onDateChange={setDataAtendimentoSelecionada}></DatePicker>

//     </View>
//                   <FlatList
//                     contentContainerStyle={FLAT_LIST}
//                     data={pets}
//                     keyExtractor={(item) => String(item.id)}
//                     renderItem={({ item }) => (
//                       <View style={LIST_CONTAINER}>
//                           <Text style={LIST_TEXT}>
//                           {item.nome} 
//                           </Text>
//                         <Button
//                           style={BUTTON_SELECT}
//                           disabled={petId===item.id}
//                           onPress={() => {
//                             setPetId(item.id)
                            
//                           }}
//                           text="Selecionar"
//                           >
                            
//                           </Button>
                      
//                       </View>
//                     )}
//                   />
//     <View> 


//           <Button
//             style={BUTTON_ADD}
//             text="Salvar Alterações"
//             onPress={() => { editarTosador() }}></Button>
//         </View>
//       </Screen>
//     </View>
//   )
// })

import React, { useState,useEffect } from "react"
import { TextStyle, View, ViewStyle, Alert, Text, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, TextField, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
//import { State } from "react-native-gesture-handler"
import DatePicker from 'react-native-datepicker'
import { RadioGroup } from "react-native-radio-buttons-group"
import TosadorService from "../../services/tosador-service"
import TosadorModel from "../../models/tosador-model"
import PetService from "../../services/pet-service"


const FULL: ViewStyle = {
  flex: 1,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const BUTTON_SELECT: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "stretch",
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const CONTAINER_ADD: ViewStyle = {
  ...LIST_CONTAINER,
  alignItems: "center",
  flexDirection: "column",
  padding: 10,
  alignSelf: "center",
  alignContent: "center",
}
const BUTTON_ADD: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "center",
  width: 110,
}
const TEXT_FIELD: ViewStyle = {
  width: 300,
}
const TEXT_FIELD_CONTENT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: "#5D2555",
  padding: 8,
}

export const TosadorFormEditScreen = observer(function TosadorFormEditScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const tosadorService = new TosadorService()
  const petService = new PetService()

  const { tosadorStore } = useStores()

  //const [radioButtonsData, setRadioButtonsData] = useState([]);  
  const [especialidadeSelecionada, setSelecionarEspecialidade] = useState("");
  const [nomeSelecionado, setSelecionarNome] = useState("");
  const [status, setSelecionarStatus] = useState("");
  const [imagemSelecionada, setImagemSelecionada] = useState("");
  const [dataAtendimento, setDataAtendimentoSelecionada] = useState("");
  const [petId, setPetId] = useState("");
  const [pets, setPets] = useState([]);
 // const [petRadioGroup, setSelecionarPetId] = useState(radioButtonsData);


  async function loadPets() {
    setPets(await petService.getPets())
   
  }

  async function loadTosadorData() {
    let tosador = await tosadorService.getTosadorById(tosadorStore.tosador)
    setSelecionarEspecialidade(tosador.especialidade)
    setSelecionarNome(tosador.nome)
    setSelecionarStatus(tosador.status)
    setImagemSelecionada(tosador.imagem)
    setDataAtendimentoSelecionada(tosador.dataAtendimento)
    
    setPetId(tosador.petId)
  }

  useEffect(() => {
    loadPets()
    loadTosadorData() 
  }, [])

  async function editarTosador() {
    
    if (petId) {
      
      try {
        const tosador = new TosadorModel();
        tosador.nome = nomeSelecionado,
        tosador.especialidade = especialidadeSelecionada,
        tosador.status = status,
        tosador.dataAtendimento = dataAtendimento,
        tosador.imagem = imagemSelecionada,
        tosador.petId = petId
        
        await tosadorService.updateTosador(tosadorStore.tosador, tosador)
        
        navigation.navigate("home")
        navigation.navigate("tosadorList")
      } catch(e) {
        console.log(e)
        Alert.alert(
          "Atenção",
          "Ocorreu um erro ao tentar cadastrar o tosador!"
        )
      }

    }else{
      Alert.alert(
        "Atenção",
        "Olá antes de cadastrar o tosador é necessário cadastrar o Pet para o Atendimento",
        [
          { text: "OK", onPress: () => navigation.navigate('home') }
        ]
      );
  }
}

  return (
    <View testID="TosadorListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Editar tosador"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_ADD}>
          <TextField
            value={nomeSelecionado}
            onChangeText={setSelecionarNome}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Nome"/>
        
          <TextField
            value={especialidadeSelecionada}
            onChangeText={setSelecionarEspecialidade}
            inputStyle={TEXT_FIELD_CONTENT} 
            style={TEXT_FIELD}
            placeholder="Especialidade"/>
          
          <TextField
            value={status}
            onChangeText={setSelecionarStatus}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Status"/>
            
            <TextField
            value={imagemSelecionada}
            onChangeText={setImagemSelecionada}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Informe a Url da imagem"/>
                        
            <DatePicker
            format="DD/MM/YYYY"
            mode="date"
            placeholder="Informe a data do Atendimento"
            style={{width: 200, backgroundColor: "white"}}
            date={dataAtendimento}
            onDateChange={setDataAtendimentoSelecionada}></DatePicker>

            </View>
                  <FlatList
                    contentContainerStyle={FLAT_LIST}
                    data={pets}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <View style={LIST_CONTAINER}>
                          <Text style={LIST_TEXT}>
                          {item.nome} 
                          </Text>
                        <Button
                          style={BUTTON_SELECT}
                          disabled={petId===item.id}
                          onPress={() => {
                            setPetId(item.id)
                            
                          }}
                          text="Selecionar"
                          >
                            
                          </Button>
                      
                      </View>
                    )}
                  />
                  <View>  


          <Button
            style={BUTTON_ADD}
            text="Salvar Alterações"
            onPress={() => { editarTosador() }}></Button>
        </View>
      </Screen>
    </View>
  )
})
