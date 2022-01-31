import React, { useState, useEffect } from "react";
import { localhost } from "@env";


import {
    View,
    StyleSheet,
    Button,
    ScrollView,
    Alert,
    Picker,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight

} from "react-native";
import axios from "axios";
import { Card } from "react-native-elements";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Rating, AirbnbRating } from "react-native-ratings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { TouchableHighlight } from "react-native-gesture-handler";

const serviceProvidersList = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedgender, setSelectedGender] = useState("");
    const [ServiceProviders, setSProviders] = useState([]);
    const [Data, setData] = useState([]);

    useEffect(async () => {
        try {
            const result = await axios.get(
                `http://192.168.164.81:3000/Posts/serviceProvidersList`
            );
            setSProviders(result.data);
            setData(result.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating);
    };

    const filterData = (city, gender) => {
        let FiltredData;
        if (city !== "" && gender !== "") {
            FiltredData = ServiceProviders.filter((item) => {
                return item.city === city && item.gender === gender;
            });
            setSProviders(FiltredData);
        } else if (gender === "" && city !== "") {
            FiltredData = ServiceProviders.filter((item) => {
                return item.city === city;
            });
            setSProviders(FiltredData);
        } else if (city === "" && gender !== "") {
            FiltredData = ServiceProviders.filter((item) => {
                return item.gender === gender;
            });
            setSProviders(FiltredData);
        } else {
            setSProviders(Data);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cities}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(cityValue, cityIndex) => {
                        setSelectedValue(cityValue);
                        filterData(cityValue, selectedgender);
                    }}
                >
                    <Picker.Item label="select city" value="" />
                    <Picker.Item label="Ariana" value="Ariana" />
                    <Picker.Item label="Ben Arous" value="Ben Arous" />
                    <Picker.Item label="Tunis" value="Tunis" />
                    <Picker.Item label="Sousse" value="Sousse" />
                    <Picker.Item label="Monastir" value="Monastir" />
                    <Picker.Item label="Sfax" value="Sfax" />
                    <Picker.Item label="Beja" value="Beja" />
                    <Picker.Item label="Benzart" value="Benzart" />
                    <Picker.Item label="Mahdia" value="Mahdia" />
                    <Picker.Item label="kairouan" value="kairouan" />
                    <Picker.Item label="Sidi Bouzid" value="Sidi Bouzid" />
                    <Picker.Item label="Zaghouane" value="Zaghouane" />
                    <Picker.Item label="Mednine" value="Mednine" />
                    <Picker.Item label="Gabes" value="Gabes" />
                    <Picker.Item label="Kebili" value="Kebili" />
                    <Picker.Item label="Gasserine" value="Gasserine" />
                    <Picker.Item label="Jendouba" value="Jendouba" />
                    <Picker.Item label="Kef" value="Kef" />
                    <Picker.Item label="Siliana" value="Siliana" />
                    <Picker.Item label="Tozeur" value="Tozeur" />
                    <Picker.Item label="Tataouine" value="Tataouine" />
                    <Picker.Item label="Manouba" value="Manouba" />
                    <Picker.Item label="Gafsa" value="Gafsa" />
                    <Picker.Item label="Nabeul" value="Nabeul" />
                </Picker>
            </View>

            <View style={styles.gender}>
                <Picker
                    selectedgender={selectedgender}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(genderValue, genderIndex) => {
                        setSelectedGender(genderValue);
                        filterData(selectedValue, genderValue);
                    }}
                >
                    <Picker.Item label="select gender" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
            </View>

            <ScrollView>
                <View style={styles.container}>
                   
                        {ServiceProviders.map((u, key) => {
                            return (
                                <View key={key} style={styles.itemVue}>
                                <Image style={styles.cardImage} source={{ uri: u.picture }} />
                                    <Text style={styles.titleStyle}>{u.firstName} {u.lastName}</Text>
                                    <Text style={styles.categoryStyle}>
                                  speciality : {u.speciality}
                                </Text>
                                
                                <Text style={styles.categoryStyle}>
                                  availability : {u.availability}
                                </Text>
                               
                                    <AirbnbRating size={20} style={styles.airbnbRating}/>
                                    <TouchableOpacity style={{ height: 40,width:150, marginTop: 30,marginLeft: 90 }}>
                                    <Button
                                         onPress={() =>
                                            navigation.navigate(
                                                "ServiceSeekerSendARequest",
                                                u
                                            )
                                        }
                                        color="teal" title="Ask for service"
                                    width={50}
                                   
                                        />
                                       <Button  onPress={() => navigation.navigate("report", u)} title = "hello" /> 
                       
                                        {/* <Icon
                                            name="flag-outline" color="black" size={30} style={{ marginTop:-300, marginLeft: -60 }} title="report" /> */}
                     

                                    </TouchableOpacity>
                              

                                   
                              
                                
                              </View>
                            );
                        })}
                
                </View>
            </ScrollView>
 
        </View>
        
    );
};
const devicewidth = Math.round(Dimensions.get("window").width);
const radius = 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
    },

    sProvider: {
        flex: 1,
        paddingTop: 20,
    },
    user: {
        flexDirection: "column",
        marginBottom: 50,
    },
    buttonStyle: {
        color: 'red',
        marginTop: 20,
        padding: 20,
        backgroundColor: 'green'
    },

  
    cardImage: {
    width: 100,
        height: 100,
        borderRadius: 100,
    
    borderTopLeftRadius: radius,
    borderTopRightRadius: 25,
    borderBottomRightRadius: radius,
    borderBottomLeftRadius: radius,
    opacity: 0.9,
    alignContent: "center",
    alignSelf: "center",
  },
  itemVue: {
    paddingTop: 15,
    marginTop: 25,
    width: devicewidth - 60,
    backgroundColor: "#F5F5F5",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 30,

    height: 380,
    marginLeft: 10,
    borderRadius: radius,
  },
  titleStyle: {
    fontSize: 17,
    fontWeight: "700",
    alignContent: "center",
    alignSelf: "center",
  },
  categoryStyle: {
    fontWeight: "200",
    alignContent: "center",
    alignSelf: "center",
  },
    airbnbRating: {
        marginRight: 20,
       
    },
    name: {
        fontSize: 20,
        marginTop: 5,
        // fontWeight: "bold",

        fontStyle: "italic",
    },
});
export default serviceProvidersList;
