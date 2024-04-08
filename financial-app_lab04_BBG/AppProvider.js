import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set, push } from 'firebase/database';
import { TransactionsList } from './data';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQNRLGOZAWGRf5YCVXjdjnPgvn2BAFxto",
    authDomain: "info-6132-314e5.firebaseapp.com",
    databaseURL: "https://info-6132-314e5-default-rtdb.firebaseio.com",
    projectId: "info-6132-314e5",
    storageBucket: "info-6132-314e5.appspot.com",
    messagingSenderId: "856707060261",
    appId: "1:856707060261:web:ff65abce8b44f2ff7625cc",
    measurementId: "G-WQE2EX6K4Q"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create a context for transactions
const TransactionsContext = createContext();

// Custom hook to use transactions context
export const useTransactions = () => useContext(TransactionsContext);

const TransactionsProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const initializeTransactions = async () => {
            const db = getDatabase();
            const transactionsRef = ref(db, 'transactions');
            const snapshot = await get(transactionsRef);
            const data = snapshot.val();
            if (!data) {
                TransactionsList.forEach(async transaction => {
                    try {
                        const newTransactionRef = push(transactionsRef);
                        await set(newTransactionRef, transaction);
                    } catch (error) {
                        console.error('Error adding transaction:', error);
                    }
                });
                setIsDataFetched(true);
            }
        };
        initializeTransactions();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase();
            const transactionsRef = ref(db, 'transactions');
            const snapshot = await get(transactionsRef);
            const data = snapshot.val();
            if (data) {
                setTransactions(Object.values(data) || []);
            }
        };

        fetchData();
    }, [isDataFetched]);

    // Add a new transaction to Firebase
    const handleAddTransaction = async (transactionData) => {
        try {
            const db = getDatabase();
            const transactionsRef = ref(db, 'transactions');
            const newTransactionRef = push(transactionsRef);
            await set(newTransactionRef, transactionData);
            const snapshot = await get(transactionsRef);
            const data = snapshot.val();

            if (data) {
                setTransactions(Object.values(data));
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <TransactionsContext.Provider value={{ transactions, setTransactions, handleAddTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export default TransactionsProvider;
