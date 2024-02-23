import React, { useState } from "react";
import { View, Platform, StyleSheet, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// components
import Input from "./Input";
import Button from "../Button";

// icons
import { Ionicons } from "@expo/vector-icons";

// interfaces
import { DateInputProps } from "../../../interfaces/shared";

const DateInput = (props: DateInputProps) => {
    const { dateValueBearor, label, placeholder } = props;
    const [date, setDate] = useState<Date | null>(null);
    const [show, setShow] = useState(false);

    const showDatepicker = () => {
        setShow(true);
    };

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
        dateValueBearor(selectedDate);
    };
    const clearDate = () => {
        setDate(null);
        dateValueBearor("");
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Input
                    label={label}
                    onChangeText={() => {}}
                    value={date ? date.toLocaleDateString() : ""}
                    placeholder={placeholder}
                    hideErrorMessagePosition
                />
                <Pressable
                    style={styles.selector}
                    onPress={showDatepicker}
                ></Pressable>
                <View style={styles.buttonContainer}>
                    <Button onPress={clearDate} deleteBtn imgBtn small>
                        clear
                    </Button>
                </View>
            </View>
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date || new Date()}
                    mode='date'
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default DateInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    buttonContainer: {
        zIndex: 10,
        marginLeft: 5,
        marginBottom: 3,
        position: "absolute",
        right: 0,
    },
    selectedDate: {
        marginTop: 20,
    },
    selector: {
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
    },
});
