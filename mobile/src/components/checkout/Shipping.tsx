import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

// components
import ScrollViewLayout from "../layout/ScrollViewLayout";
import Input from "../shared/inputs/Input";
import Button from "../shared/Button";

// validation
import validateInput from "../../validation/validateInput";

const Shipping = () => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [postalCode, setpostalCode] = useState("");

    const [formError, setFormError] = useState({
        addressError: "",
        cityError: "",
        countryError: "",
        phoneError: "",
        postalCodeError: "",
    });
    const {
        addressError,
        cityError,
        countryError,
        phoneError,
        postalCodeError,
    } = formError;

    const navigation = useNavigation<NavigationProp<any>>();
    const { cartData } = useSelector((state: RootState) => state.cart);

    // render inital shippingData if it exist on storage
    useEffect(() => {
        if (cartData && cartData.length === 0) {
            navigation.navigate("Cart", { screen: "CartScreen" });
        }

        (async () => {
            const shippingData = await AsyncStorage.getItem("shippingData");
            if (shippingData) {
                const convertedShippingData = JSON.parse(shippingData);
                setAddress(convertedShippingData.address);
                setCity(convertedShippingData.city);
                setCountry(convertedShippingData.country);
                setPhone(convertedShippingData.phone);
                setpostalCode(convertedShippingData.postalCode);
            }
        })();
    }, [cartData]);

    const navToCheckoutHandler = async () => {
        // validate inputs
        const addressErr = validateInput({
            inputValue: address,
            type: "Address",
        });
        const cityErr = validateInput({ inputValue: city, type: "City" });
        const countryErr = validateInput({
            inputValue: country,
            type: "Country",
        });
        const phoneErr = validateInput({
            inputValue: phone,
            type: "Phone",
        });
        const postalCodeErr = validateInput({
            inputValue: postalCode,
            type: "Postal Code",
        });

        // reset error State
        setFormError({
            addressError: addressErr,
            cityError: cityErr,
            countryError: countryErr,
            phoneError: phoneErr,
            postalCodeError: postalCodeErr,
        });

        if (addressErr || cityErr || countryErr || phoneErr) return;

        const shippingData = { address, city, country, phone, postalCode };
        await AsyncStorage.setItem(
            "shippingData",
            JSON.stringify(shippingData)
        );

        // navigation to to make an order after fill shipping data
        navigation.navigate("Cart", { screen: "Order" });
    };

    return (
        <ScrollViewLayout>
            <View style={{ marginHorizontal: 20 }}>
                <Input
                    label='Address'
                    onChangeText={setAddress}
                    value={address}
                    placeholder='Enter You address'
                    error={addressError}
                />
                <Input
                    label='City'
                    onChangeText={setCity}
                    value={city}
                    placeholder='Enter You city'
                    error={cityError}
                />
                <Input
                    label='Country'
                    onChangeText={setCountry}
                    value={country}
                    placeholder='Enter You country'
                    error={countryError}
                />
                <Input
                    label='Phone'
                    onChangeText={setPhone}
                    value={phone}
                    placeholder='Enter You phone'
                    inputMode='numeric'
                    error={phoneError}
                />
                <Input
                    label='Postal Code'
                    onChangeText={setpostalCode}
                    value={postalCode}
                    placeholder='Enter You postal code'
                    inputMode='numeric'
                    error={postalCodeError}
                />
                <View style={styles.btnContainer}>
                    <Button onPress={navToCheckoutHandler}>next</Button>
                </View>
            </View>
        </ScrollViewLayout>
    );
};

export default Shipping;

const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 20,
    },
});
