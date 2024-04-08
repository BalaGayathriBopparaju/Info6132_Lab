import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTransactions } from '../../AppProvider'

const SummaryScreen = () => {
    const { transactions } = useTransactions();
    let totalExpense = 0;
    let highestExpense = { amount: -Infinity, name: '' };
    let lowestExpense = { amount: Infinity, name: '' };

    transactions.forEach(transaction => {
        totalExpense += transaction.amount;

        if (transaction.amount > highestExpense.amount) {
            highestExpense.amount = transaction.amount;
            highestExpense.name = transaction.name;
        }

        if (transaction.amount < lowestExpense.amount) {
            lowestExpense.amount = transaction.amount;
            lowestExpense.name = transaction.name;
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.spaceBtw}>
                <Text style={styles.font16}>Transactions</Text>
                <Text style={styles.font16}>{transactions.length}</Text>
            </View>
            <View style={styles.spaceBtw}>
                <Text style={styles.font16}>Total Expense</Text>
                <Text style={styles.font16}>${totalExpense.toFixed(2)}</Text>
            </View>
            <View style={styles.hlcontainer}>
                <Text style={styles.hlExpense}>Highest Expense</Text>
                <View style={styles.hlSpaceBtw}>
                    <Text style={styles.font16}>{highestExpense.name}</Text>
                    <Text style={styles.font16}>${highestExpense.amount.toFixed(2)}</Text>
                </View>
            </View>
            <View style={styles.hlcontainer}>
                <Text style={styles.hlExpense}>Lowest Expense</Text>
                <View style={styles.hlSpaceBtw}>
                    <Text style={styles.font16}>{lowestExpense.name}</Text>
                    <Text style={styles.font16}>${lowestExpense.amount.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f2f2f2',
    },
    totalExpense: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    spaceBtw: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'rgba(34, 92, 182, 0.86)',
        borderBottomWidth: 1,
        padding: 4,
        paddingBottom: 8,
        paddingTop: 8
    },
    font16: {
        fontSize: 16
    },
    hlcontainer: {
        flexDirection: 'column',
    },
    hlSpaceBtw: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'rgba(34, 92, 182, 0.86)',
        borderBottomWidth: 1,
        padding: 4
    },
    hlExpense: {
        fontSize: 16,
        color: 'rgba(34, 92, 182, 0.86)',
        padding: 4
    }
});

export default SummaryScreen;
