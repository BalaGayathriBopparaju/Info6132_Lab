import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTransactions } from '../../AppProvider'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const TransactionsListScreen = ({ navigation }) => {
    const { transactions, handleAddTransaction } = useTransactions();
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        location: '',
        date: null
    });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        setFormData({ ...formData, date });
        hideDatePicker();
    };

    const handleSubmit = () => {
        const formattedDate = formData.date ? moment(formData.date).format('HH:mm, MMMM DD, YYYY') : null;
        const intTypeAmount = formData.amount ? parseFloat(formData.amount) : null;
        const formattedFormData = { ...formData, date: formattedDate, amount: intTypeAmount };
        handleAddTransaction(formattedFormData);
        setFormData({
            name: '',
            amount: '',
            location: '',
            date: null
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.transactionItem}
            onPress={() => navigation.navigate('TransactionDetail', { name: item.name, amount: item.amount, location: item.location, date: item.date })}
        >
            <Text style={styles.transactionName}>{item.name}</Text>
            <View style={styles.transactionAmount}>
            {item.amount ? (
                                <Text style={{ color: 'rgba(34, 92, 182, 0.76)' }}>${item.amount.toFixed(2)}</Text>
                        ) : (
                                <Text style={{ color: 'rgba(34, 92, 182, 0.76)' }}>N/A</Text>
                        )}                
            <FontAwesome6 name="greater-than" size={14} color="rgba(34, 92, 182, 0.86)" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.transactionsText}>Add Transaction</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    value={formData.amount}
                    onChangeText={(text) => setFormData({ ...formData, amount: text })}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={formData.location}
                    onChangeText={(text) => setFormData({ ...formData, location: text })}
                />
                <View style={styles.dateInputContainer}>
                    <TextInput
                        style={{ width: '90%', color: 'black' }}
                        placeholder="Date"
                        value={formData.date ? moment(formData.date).format('MMMM DD YYYY, h:mm:ss a') : ''}
                        editable={false}
                    />
                    <FontAwesome6 style={styles.datePickerIcon} name="calendar-alt" size={20} color="rgba(34, 92, 182, 0.86)" onPress={showDatePicker} />
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                />
                <TouchableOpacity
                    style={styles.customButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>ADD</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.transactionsText}>Transactions</Text>
            <FlatList
                key={(item, index) => index}
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    formContainer: {
        marginBottom: 24,
    },
    customButton: {
        backgroundColor: 'rgba(34, 92, 182, 0.86)',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        letterSpacing: 1,
        textAlign: 'center',
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    dateInput: {
        flex: 1,
        borderWidth: 0
    },
    datePickerIcon: {
        marginLeft: 10,
    },
    transactionsText: {
        fontSize: 16,
        color: 'rgba(34, 92, 182, 0.86)',
        fontWeight: '600',
        marginBottom: 5,
        letterSpacing: 1
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    dateInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 10,
        paddingRight: 40,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderBottomColor: 'rgba(34, 92, 182, 0.86)',
        borderBottomWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 4,
        borderRadius: 4,
    },
    transactionName: {
        fontSize: 16,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
});

export default TransactionsListScreen;