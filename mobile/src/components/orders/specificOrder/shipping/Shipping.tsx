import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// components
import SingleTextLine from "./SingleTextLine";
import Image from "../../../shared/Image";

// colors
import colors from "../../../../constants/Colors";

// context
import ThemeContext from "../../../../context/darkModeTheme";

// interfce
import { Order } from "../../../../interfaces/screens/order";

const Shipping = (props: Order) => {
    const {
        creator: { email, name, imageUrl, role },
        createdAt,
        isDelivered,
        isPaid,
        paidAt,
        shipping: { address, city, country, phone, postalCode },
        updatedAt,
    } = props;

    const { baseTextColor } = useContext(ThemeContext);

    return (
        <View>
            <Text style={[styles.header, { color: baseTextColor }]}>
                shipping
            </Text>
            <View style={styles.userContainer}>
                <Image
                    width={70}
                    height={70}
                    borderRadius={70}
                    uri={imageUrl!}
                />
                <View style={styles.contentContainer}>
                    <SingleTextLine small title='name' content={name!} />
                    <SingleTextLine
                        notCapitalize
                        small
                        title='email'
                        content={email!}
                    />
                    <SingleTextLine small title='role' content={role!} />
                </View>
            </View>
            <View style={styles.resetContentContainer}>
                <View style={{ rowGap: 3 }}>
                    <SingleTextLine
                        title='address'
                        content={`${address}, ${city}, ${postalCode}, ${country}`}
                    />
                    <SingleTextLine title='phone' content={phone} />
                </View>
                <View style={{ rowGap: 3 }}>
                    <SingleTextLine
                        title='created at'
                        content={new Date(createdAt).toLocaleString()}
                    />
                    <SingleTextLine
                        title='updated at'
                        content={new Date(updatedAt).toLocaleString()}
                    />
                </View>
                <View style={{ rowGap: 3 }}>
                    <SingleTextLine
                        title='paid'
                        color={isPaid ? colors.success : colors.darkRed}
                        content={isPaid ? "is paid" : "not paid yet"}
                    />
                    {isPaid ? (
                        <SingleTextLine
                            title='paid at'
                            content={new Date(paidAt).toLocaleString()}
                        />
                    ) : (
                        <></>
                    )}
                </View>
                <View style={{ rowGap: 3 }}>
                    <SingleTextLine
                        title='delivered'
                        color={isDelivered ? colors.success : colors.darkRed}
                        content={
                            isDelivered ? "is delivered" : "not delivered yet"
                        }
                    />
                    {isDelivered ? (
                        <SingleTextLine
                            title='delivered at'
                            content={new Date(paidAt).toLocaleString()}
                        />
                    ) : (
                        <></>
                    )}
                </View>
            </View>
        </View>
    );
};

export default Shipping;

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
    },
    header: {
        fontWeight: "bold",
        marginBottom: 10,
        textTransform: "capitalize",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 70,
    },
    contentContainer: {
        rowGap: 2,
    },
    resetContentContainer: {
        borderBottomColor: colors.inActiveText,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        paddingLeft: 10,
        rowGap: 20,
    },
});
