import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Dropdown from "react-native-input-select";

// colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
import { SelectInputProps } from "../../../interfaces/shared";

const SelectInput = (props: SelectInputProps) => {
    const { inialValue, items, label, error, hideErrorMessagePosition } = props;
    const { baseBgColor, baseTextColor, theme } = useContext(ThemeContext);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        if (inialValue) setSelectedValue(inialValue);
    }, [inialValue]);

    const onValueChangeHandler = (itemValue: string) => {
        props.currentValue(itemValue);
        setSelectedValue(itemValue);
    };

    return (
        <View style={label ? styles.container : {}}>
            {label ? (
                <Text
                    style={[
                        styles.label,
                        {
                            color: baseTextColor,
                        },
                    ]}
                >
                    {label}
                </Text>
            ) : (
                <></>
            )}
            <View>
                <Dropdown
                    selectedValue={selectedValue}
                    onValueChange={onValueChangeHandler}
                    options={items}
                    placeholder={`Select ${label}`}
                    dropdownContainerStyle={{ height: 10 }}
                    dropdownStyle={{
                        backgroundColor: baseBgColor,
                        paddingVertical: 5,
                        paddingHorizontal: 5,
                        minHeight: 43,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor:
                            theme === "dark"
                                ? colors.inActiveText
                                : colors.lightGray,
                    }}
                    selectedItemStyle={{
                        color: baseTextColor,
                    }}
                    placeholderStyle={{ color: colors.inActiveText }}
                    modalOptionsContainerStyle={{
                        backgroundColor: baseBgColor,
                    }}
                    dropdownIconStyle={{
                        display: "none",
                    }}
                    checkboxComponentStyles={{
                        checkboxStyle: {
                            borderColor: colors.inActiveText,
                        },
                        checkboxLabelStyle: {
                            color: baseTextColor,
                        },
                    }}
                />
            </View>
            {hideErrorMessagePosition ? (
                <></>
            ) : label ? (
                <Text style={styles.errorMessage}>{error}</Text>
            ) : (
                <></>
            )}
        </View>
    );
};

export default SelectInput;

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        flex: 1,
    },
    inputContainer: {
        borderColor: colors.inActiveText,
        borderWidth: 1,
        overflow: "hidden",
        height: 40,
        borderRadius: 5,
        justifyContent: "center",
    },
    label: {
        fontWeight: "400",
        fontSize: 16,
        marginBottom: 5,
        textTransform: "capitalize",
    },
    errorMessage: {
        fontSize: 14,
        marginTop: 10,
        marginLeft: 5,
        fontWeight: "500",
        color: colors.darkRed,

        opacity: 0.9,
        textTransform: "capitalize",
    },
});
