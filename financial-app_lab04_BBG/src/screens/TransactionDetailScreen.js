import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionDetail = ({ route }) => {
    const { name, amount, location, date } = route.params;

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.detailAmount}>${amount.toFixed(2)}</Text>
                <Text style={styles.detailName}>{name}</Text>
                <Text style={styles.detailLocation}>{location}</Text>
            </View>
            <View style={styles.container2}>
                <Text style={styles.detailText}>Transaction Date</Text>
                <Text style={styles.detailDate}>{date}</Text>
            </View>

        </>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'rgba(34, 92, 182, 0.75)',
        alignItems: 'center',
    },
    container2: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'white'
    },
    detailName: {
        fontSize: 18,
        marginBottom: 8,
        color: 'white'
    },
    detailLocation: {
        fontSize: 16,
        marginBottom: 8,
        color: 'white'
    },
    detailText: {
        fontSize: 16,
    },
    detailDate: {
        fontSize: 16,
        color: 'gray'
    },
});

export default TransactionDetail;