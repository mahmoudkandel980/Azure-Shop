import React, { useState, useContext } from "react";
import {
    useNavigation,
    NavigationProp,
    useRoute,
} from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

// components
import Input from "../shared/inputs/Input";
import SelectInput from "../shared/inputs/SelectInput";
import DateInput from "../shared/inputs/DateInput";
import Button from "../shared/Button";

// icons
import { Ionicons } from "@expo/vector-icons";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// interfaces
import { FilterDataDashboardProps } from "../../interfaces/screens/dashboard";

// data
import categories from "../../data/productCategories";
import {
    filterBoxRate,
    filterBoxRoles,
    filterBoxIsPaid,
    filterBoxIsDelivered,
} from "../../data/public";

const FilterBox = (props: FilterDataDashboardProps) => {
    const { baseTextColor } = useContext(ThemeContext);

    const navigation = useNavigation<NavigationProp<any>>();
    const currentScreen = useRoute().name;

    const [openFilterModel, setOpenFilterModel] = useState(false);

    const { productsLoading } = useSelector(
        (state: RootState) => state.products
    );
    const { ordersLoading } = useSelector(
        (state: RootState) => state.dashbordProductsOrders
    );
    const { usersLoading } = useSelector(
        (state: RootState) => state.dashbordUsers
    );

    // mutual
    const [id, setId] = useState(props.id);
    const [createdFrom, setCreatedFrom] = useState(props.createdFrom);
    const [createdTo, setCreatedTo] = useState(props.createdTo);
    // products
    const [category, setCategory] = useState(props.category);
    const [priceFrom, setPriceFrom] = useState(props.priceFrom);
    const [priceTo, setPriceTo] = useState(props.priceTo);
    const [rate, setRate] = useState(props.rate);
    // users
    const [email, setEmail] = useState(props.email);
    const [role, setRole] = useState(props.role);
    const [active, setActive] = useState(props.active);
    // orders
    const [isPaid, setIsPaid] = useState(props.isPaid);
    const [isDelivered, setIsDelivered] = useState(props.isDelivered);
    // products && users
    const [name, setName] = useState(props.name);

    const submitFilterHandler = () => {
        props.filterDataBearor({
            id,
            createdFrom,
            createdTo,
            category,
            priceFrom,
            priceTo,
            rate,
            email,
            role,
            active,
            isPaid,
            isDelivered,
            name,
        });
        navigation.navigate(currentScreen, { page: 1 });
        toggleFilterModel();
    };

    const toggleFilterModel = () => {
        setOpenFilterModel((prevState) => !prevState);
    };

    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={[styles.header, { color: baseTextColor }]}>
                {currentScreen === "DashboardUsers"
                    ? "users"
                    : currentScreen === "DashboardProducts"
                    ? "products"
                    : "orders"}
            </Text>
            <Pressable
                style={styles.headerContainer}
                onPress={toggleFilterModel}
            >
                <Text style={[styles.headerText, { color: baseTextColor }]}>
                    filter{" "}
                    {currentScreen === "DashboardUsers"
                        ? "users"
                        : currentScreen === "DashboardProducts"
                        ? "products"
                        : "orders"}
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
                        label='id'
                        onChangeText={setId}
                        value={id}
                        placeholder='Enter id'
                        inputMode='text'
                        hideErrorMessagePosition
                    />
                    <View style={styles.inputsGroup}>
                        <DateInput
                            label='created from'
                            placeholder='created from'
                            dateValueBearor={(date: any) =>
                                setCreatedFrom(date)
                            }
                        />
                        <DateInput
                            label='created to'
                            placeholder='created to'
                            dateValueBearor={(date: any) => setCreatedTo(date)}
                        />
                    </View>
                    {["DashboardUsers", "DashboardProducts"].includes(
                        currentScreen
                    ) && (
                        <Input
                            label='name'
                            onChangeText={setName}
                            value={name}
                            placeholder='Enter name'
                            inputMode='text'
                            hideErrorMessagePosition
                        />
                    )}
                    {currentScreen === "DashboardProducts" && (
                        <>
                            <SelectInput
                                currentValue={setCategory}
                                items={["all", ...categories].map(
                                    (category) => ({
                                        label: category,
                                        value: category,
                                    })
                                )}
                                inialValue={category}
                                label='category'
                                hideErrorMessagePosition
                            />
                            <View style={styles.inputsGroup}>
                                <Input
                                    label='price From'
                                    onChangeText={setPriceFrom}
                                    value={priceFrom}
                                    placeholder='Price from'
                                    inputMode='numeric'
                                    hideErrorMessagePosition
                                />
                                <Input
                                    label='price To'
                                    onChangeText={setPriceTo}
                                    value={priceTo}
                                    placeholder='Price to'
                                    inputMode='numeric'
                                    hideErrorMessagePosition
                                />
                            </View>
                            <SelectInput
                                currentValue={setRate}
                                items={filterBoxRate.map((rate) => ({
                                    label: rate,
                                    value: rate,
                                }))}
                                inialValue={rate}
                                label='rate'
                            />
                        </>
                    )}
                    {currentScreen === "DashboardUsers" && (
                        <>
                            <Input
                                label='email'
                                onChangeText={setEmail}
                                value={email}
                                placeholder='enter email'
                                inputMode='email'
                                hideErrorMessagePosition
                            />
                            <View style={styles.inputsGroup}>
                                <SelectInput
                                    currentValue={setRole}
                                    items={filterBoxRoles.map((role) => ({
                                        label: role,
                                        value: role,
                                    }))}
                                    inialValue={role}
                                    label='role'
                                />
                                <SelectInput
                                    currentValue={setActive}
                                    items={["all", "active", "inActive"].map(
                                        (active) => ({
                                            label: active,
                                            value: active,
                                        })
                                    )}
                                    inialValue={active}
                                    label='active'
                                />
                            </View>
                        </>
                    )}
                    {currentScreen === "DashboardOrders" && (
                        <View style={styles.inputsGroup}>
                            <SelectInput
                                currentValue={setIsPaid}
                                items={filterBoxIsPaid.map((isPaid) => ({
                                    label: isPaid,
                                    value: isPaid,
                                }))}
                                inialValue={isPaid}
                                label='is Paid'
                            />
                            <SelectInput
                                currentValue={setIsDelivered}
                                items={filterBoxIsDelivered.map(
                                    (isDelivered) => ({
                                        label: isDelivered,
                                        value: isDelivered,
                                    })
                                )}
                                inialValue={isDelivered}
                                label='is delivered'
                            />
                        </View>
                    )}
                    <Button
                        onPress={submitFilterHandler}
                        loading={
                            currentScreen === "DashboardUsers"
                                ? usersLoading
                                : currentScreen === "DashboardProducts"
                                ? productsLoading
                                : ordersLoading
                        }
                    >
                        filter
                    </Button>
                </View>
            )}
        </View>
    );
};

export default FilterBox;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5,
    },
    header: {
        textTransform: "capitalize",
        fontWeight: "bold",
        marginBottom: 20,
        fontSize: 18,
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
        paddingBottom: 15,
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
