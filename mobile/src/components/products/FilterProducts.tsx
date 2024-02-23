import React, { useState, useEffect, useContext, useRef } from "react";

import { useNavigation, NavigationProp } from "@react-navigation/native";

import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from "react-native";

// components
import Input from "../shared/inputs/Input";
import SelectInput from "../shared/inputs/SelectInput";
import Rating from "../shared/Rating";
import Button from "../shared/Button";

// icons
import { Ionicons } from "@expo/vector-icons";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// interfaces
import { FilterProductsProps } from "../../interfaces/screens/products";

// data
import categories from "../../data/productCategories";

const FilterProducts = (props: FilterProductsProps) => {
    const ratings = ["all", 1, 2, 3, 4, 5];
    const { baseTextColor } = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp<any>>();

    const [openFilterModel, setOpenFilterModel] = useState(false);

    // form
    const [name, setName] = useState(props.name);
    const [category, setCategory] = useState(props.category);
    const [priceFrom, setPriceFrom] = useState(props.priceFrom);
    const [priceTo, setPriceTo] = useState(props.priceTo);
    const [rate, setRate] = useState(props.rate);

    const firtRendre = useRef(true);

    const submitFilterHandler = () => {
        props.filterDataBearor({ name, category, priceFrom, priceTo, rate });
        navigation.navigate("ProductsScreens", { screen: "Products", page: 1 });
    };

    useEffect(() => {
        if (!firtRendre.current) submitFilterHandler();
        firtRendre.current = false;
    }, [rate, category]);

    const toggleFilterModel = () => {
        setOpenFilterModel((prevState) => !prevState);
    };

    const currentValueHandler = (currentValue: string) => {
        setCategory(currentValue);
    };

    return (
        <View style={{ marginBottom: 20 }}>
            <Pressable
                style={styles.headerContainer}
                onPress={toggleFilterModel}
            >
                <Text style={[styles.headerText, { color: baseTextColor }]}>
                    filter products
                </Text>
                <Ionicons
                    name={openFilterModel ? "chevron-up" : "chevron-down"}
                    size={16}
                    color={baseTextColor}
                />
            </Pressable>
            {openFilterModel && (
                <View
                    style={[
                        styles.formContainer,
                        { borderColor: colors.inActiveText },
                    ]}
                >
                    <Input
                        label='product name'
                        onChangeText={setName}
                        value={name}
                        placeholder='Enter product name'
                        inputMode='text'
                        icon={
                            <TouchableOpacity onPress={submitFilterHandler}>
                                <Ionicons
                                    name='search'
                                    size={16}
                                    color={baseTextColor}
                                />
                            </TouchableOpacity>
                        }
                        hideErrorMessagePosition
                    />
                    <SelectInput
                        currentValue={currentValueHandler}
                        items={["all", ...categories].map((category) => ({
                            label: category,
                            value: category,
                        }))}
                        inialValue={category}
                        label='category'
                    />
                    <View>
                        <Text style={[styles.label, { color: baseTextColor }]}>
                            Rate
                        </Text>
                        <View style={styles.RatingContainer}>
                            {ratings.map((r, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={[styles.singleRatingContainer]}
                                    onPress={() => {
                                        setRate(
                                            r === "all"
                                                ? "all"
                                                : +r < 5
                                                ? `greater than and equal ${r}`
                                                : "equal 5"
                                        );
                                    }}
                                >
                                    {r === "all" ? (
                                        <Text
                                            style={{
                                                color: rate.includes(
                                                    r.toString()
                                                )
                                                    ? colors.stars
                                                    : baseTextColor,
                                            }}
                                        >
                                            All
                                        </Text>
                                    ) : (
                                        <View
                                            style={styles.singleRatingContainer}
                                        >
                                            <Rating rating={+r} />
                                            {+r < 5 && (
                                                <Text
                                                    style={{
                                                        color: rate.includes(
                                                            r.toString()
                                                        )
                                                            ? colors.stars
                                                            : baseTextColor,
                                                    }}
                                                >
                                                    & up
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={styles.inputsGroup}>
                        <Input
                            label='price From'
                            onChangeText={setPriceFrom}
                            value={priceFrom}
                            placeholder='Price from'
                            inputMode='numeric'
                        />
                        <Input
                            label='price To'
                            onChangeText={setPriceTo}
                            value={priceTo}
                            placeholder='Price to'
                            inputMode='numeric'
                        />
                        <View style={{ marginTop: 30 }}>
                            <Button onPress={submitFilterHandler}>go</Button>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default FilterProducts;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5,
    },
    headerText: {
        textTransform: "capitalize",
        fontWeight: "500",
    },
    formContainer: {
        marginTop: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 8,
    },
    label: {
        fontWeight: "400",
        fontSize: 16,
        marginBottom: 5,
        textTransform: "capitalize",
    },
    RatingContainer: {
        rowGap: 3,
        borderWidth: 0.5,
        borderColor: colors.inActiveText,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    singleRatingContainer: {
        flexDirection: "row",
        columnGap: 5,
    },
    inputsGroup: {
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
    },
});
