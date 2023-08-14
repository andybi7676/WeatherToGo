import { StyleSheet } from 'react-native';
import { ExploreScreen, SettingsScreen, FavoriteScreen } from './screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import store from './redux/store';
import { Provider } from 'react-redux';
import tw from 'twrnc';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <SafeAreaProvider>
          {/* <MapScreen /> */}
          <Tab.Navigator 
            initialRouteName="Settings"
            screenOptions={{
              tabBarStyle: { paddingBottom: 8, paddingTop:4}
            }}
          >
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerShown: false, 
                tabBarLabel: "Settings",
                tabBarIcon: ({color}) => <Icon name={"settings"} color={color}></Icon>,
              }} 
            />
            <Tab.Screen 
              name="Explore"
              component={ExploreScreen}
              options={{
                headerShown: false, 
                tabBarLabel: "Explore",
                tabBarIcon: ({color}) => <Icon name={"explore"} color={color}></Icon>,
              }} 
            />
            <Tab.Screen 
              name="Favorite"
              component={FavoriteScreen}
              options={{
                headerShown: false, 
                tabBarLabel: "Favorite",
                tabBarIcon: ({color}) => <Icon name={"star"} color={color}></Icon>,
              }} 
            />
          </Tab.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
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
