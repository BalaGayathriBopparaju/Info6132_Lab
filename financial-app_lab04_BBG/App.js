import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TransactionsProvider from './AppProvider';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <TransactionsProvider>
        <AppNavigator />
      </TransactionsProvider>
    </NavigationContainer>
  );
};

export default App;
