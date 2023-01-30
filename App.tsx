import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet,Text,View,Image} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {HomeScreen} from './src/screens/HomeScreen';
import {LandingScreen} from './src/screens/LandingScreen';

const Tab=createBottomTabNavigator();
const AppNavigation=() => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused,color,size}) => {
          let tabBarIcon;

          if(route.name==='Home') {
            tabBarIcon=focused
              ? require('./src/images/home_icon.png')
              :require('./src/images/home_n_icon.png');
          } else if(route.name==='Offer') {
            tabBarIcon=focused? require('./src/images/offer_icon.png'):require('./src/images/offer_n_icon.png');
          }

          // You can return any component that you like here!
          return <Image source={tabBarIcon} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarBadge: 3}} />
      <Tab.Screen name="Offer" component={HomeScreen} options={{tabBarBadge: 3}} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigation />
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
