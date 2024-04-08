// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionsListScreen from '../screens/TransactionsListScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import SummaryScreen from '../screens/SummaryScreen';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TransactionsStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="TransactionsList"
            component={TransactionsListScreen}
            options={{
                headerStyle: {
                    backgroundColor: 'rgba(34, 92, 182, 0.86)',
                },
                title: 'Transactions List',
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                tabBarLabelStyle: {
                    color: 'rgba(34, 92, 182, 0.86)',
                    paddingBottom: 5
                },
            }}
        />
        <Stack.Screen
            name="TransactionDetail"
            component={TransactionDetailScreen}
            options={{
                headerStyle: {
                    backgroundColor: 'rgba(34, 92, 182, 0.86)',
                },
                title: 'Transaction Details',
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        />
    </Stack.Navigator>
);


const AppNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="Transactions List"
            component={TransactionsStack}
            options={{
                headerShown: false,
                tabBarLabelStyle: ({ focused }) => ({
                    color: focused ? 'rgba(34, 92, 182, 0.86)' : 'gray',
                }),
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="document-sharp" size={18} color={color !== '#8E8E8F' ? 'rgba(34, 92, 182, 0.86)' : 'gray'} />
                ),
            }}
        />
        <Tab.Screen
            name="Summary"
            component={SummaryScreen}
            options={{
                headerStyle: {
                    backgroundColor: 'rgba(34, 92, 182, 0.86)',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                tabBarLabelStyle: ({ focused }) => ({
                    color: focused ? 'rgba(34, 92, 182, 0.86)' : 'gray',
                }),
                tabBarIcon: ({ color, size }) => {
                    return (
                        <FontAwesome name="info" size={18} color={color !== '#8E8E8F' ? 'rgba(34, 92, 182, 0.86)' : 'gray'} />
                    )
                },
            }}
        />
    </Tab.Navigator>
);


export default AppNavigator;
