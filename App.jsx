import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import Members from './components/Members';
import Result from './components/Result';
import Bills from './components/Bills';
import { SpentProvider } from './components/context/spentContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SpentProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Bills' component={Bills} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Members" component={Members} options={{ headerShown: false }} />
          <Stack.Screen name="Result" component={Result} options={{ headerShown: false }} />
        </Stack.Navigator>
      </ NavigationContainer>
    </SpentProvider>
  );
}
