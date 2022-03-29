import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableOpacity,TextInput } from 'react-native-web';





export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      szo:'',
      akttema:1,
feladat:"",
nev: '',
komment:'',
      dataSource:[],
      dataSource2:[]

    }
	
	
  }



  


  beviteltorles=async()=>{
    this.setState( { feladat:"" })
  }

  keres=async()=>{
   /* alert(this.state.feladat)*/

    var bemenet={
      bevitel1:this.state.feladat
     
    }
fetch('http://localhost:8080/kereses', {
  method: "POST",
  body: JSON.stringify(bemenet),
  headers: {"Content-type": "application/json; charset=UTF-8"}
}
)
  .then((response) => response.json())
  .then((responseJson) => {

    this.setState({
      
      dataSource: responseJson,
    }, function(){
      /*alert(JSON.stringify(this.state.dataSource))*/
    });

  })
  .catch((error) =>{
    console.error(error);
  });


  }

 
 


  componentDidMount(){



   









    /*----------------------------------------------------------------------------*/
      

    
    return fetch('http://localhost:8080/kerdes')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });
        //alert(JSON.stringify(this.state.dataSource))


      })
      .catch((error) =>{
        console.error(error);
      });
  }

  kivalaszt=async (szam)=>{
    //alert(szam)
    this.setState({akttema:szam})

    let bemenet={
      bevitel1:szam
    }
    return fetch('http://localhost:8080/temalekerdez',{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}

      

      
    }


    
       
    )
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource2: responseJson,
      }, function(){

        //alert(JSON.stringify(this.state.dataSource2))
      });

    })
    .catch((error) =>{
      console.error(error);
    });

  }


  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }


    
   
   

    return(

      







      
      <View style={{flex: 1, paddingTop:20,backgroundColor:'#ff9966'}}>






{/*--------------------------------------------------------------------------témák */}        

{/* ----------------------------------------------------uj class meghivasa*/}
<View style={{flexDirection:"row",flex:1,marginBottom:100}}>
<TextInput
          placeholderTextColor="#ffda6b"
          style={{ height:60, minWidth:150,borderRadius:15,backgroundColor:'#367588',padding:10,borderColor:'black',color:"white",marginLeft: "auto", flex: 1}}
          placeholder="Mire szeretnél rákeresni?"
          onChangeText={(feladat) => this.setState({feladat})}
          value={this.state.feladat}
        />

<TouchableOpacity
        style={{backgroundColor:"brown",width:60,height:60,borderRadius:10, marginRight:"auto"}}
        onPress={async()=>this.beviteltorles()}
        
      >
        <Text style={{textAlign:"center", marginTop: "auto", marginBottom: "auto", fontWeight:"bold"}}>X</Text>
      </TouchableOpacity> 

      <TouchableOpacity
        style={styles.gomb}
        onPress={async()=>this.keres()}
      >
        <Text style={styles.gombSzoveg}>Kereses</Text>
      </TouchableOpacity> 


  </View>
  
{/*--------------------------------------------------------------------------a témába tartozó üzenetek */}    

{ this.state.dataSource ?
<FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View style={{borderWidth:3,margin:20,backgroundColor:"#ff7733",paddingLeft:10,paddingRight:10,borderRadius:15}}>

         
         
        <Text style={{color:"#1a0d00",fontSize:25,marginTop:15,fontWeight:"bold"}}   >
          {item.komment_nev} </Text>
          <Text style={{color:"#4d2600",fontSize:20}}   >
          {item.komment_szoveg} </Text>
          <Text style={{color:"#ffa64d",fontSize:15,marginBottom:5,fontWeight:"bold",paddingBottom:15}}   >
          {item.komment_datum} </Text>
     
   
          </View>
        
        }
    
          keyExtractor={({uzenet_id}, index) => uzenet_id}
        />



     :null}



      </View>
    );
  }
}





const styles = StyleSheet.create({
  
  gombSzoveg:{
    textAlign:'center',
    color:'white',
    marginTop:'auto',
    marginBottom:'auto',
    fontSize:25
},
gomb:{
  width:110,
  height:60,
  marginRight:"auto",
  backgroundColor:'#ff7733',
  borderRadius:15,
  padding: 10,

},


  kekgomb: {
    alignItems: "center",
    backgroundColor:'#ff7733',
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
  }
});