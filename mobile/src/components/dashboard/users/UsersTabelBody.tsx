import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    useNavigation,
    NavigationProp,
    useRoute,
} from "@react-navigation/native";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// components
import Image from "../../shared/Image";
import DeleteUser from "./manipulation/DeleteUser";
import EditUserBtn from "./manipulation/EditUserBtn";

// icons
import { Octicons } from "@expo/vector-icons";

// colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

const UsersTabelBody = () => {
    const { baseTextColor } = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp<any>>();
    const params = useRoute<any>().params;
    const page = params ? +params?.page! : 1;

    const { usersData } = useSelector(
        (state: RootState) => state.dashbordUsers
    );
    const { ITEMS_PER_PAGE, users } = usersData!;

    const navigationToSpecificUser = (id: string) => {
        // navigation.navigate("OrdersScreens", {
        //     screen: "Order",
        //     params: { orderId: id },
        // });
    };

    return users.map((user, i) => (
        <View key={i} style={styles.headerContainer}>
            <View style={[styles.headerContent, { flex: 1 }]}>
                <Text style={{ color: baseTextColor, fontSize: 12 }}>
                    {i + 1 + ITEMS_PER_PAGE * (page - 1)}
                </Text>
            </View>
            <View style={styles.headerContent}>
                <Image
                    uri={user.imageUrl!}
                    width={28}
                    height={28}
                    borderRadius={3}
                />
            </View>
            <View style={styles.headerContent}>
                <TouchableOpacity
                    onPress={navigationToSpecificUser.bind(null, user.id!)}
                >
                    <Text style={[styles.name, { color: baseTextColor }]}>
                        {user.name!.length > 8
                            ? user.name!.slice(0, 5) + "..."
                            : user.name}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerContent}>
                <Text style={{ color: baseTextColor, fontSize: 12 }}>
                    {user.role}
                </Text>
            </View>
            <View style={styles.headerContent}>
                <Octicons
                    name={user.activeStatus ? "shield-check" : "shield-x"}
                    size={16}
                    color={user.activeStatus ? colors.success : colors.lightRed}
                />
            </View>
            <View style={styles.headerContent}>
                <EditUserBtn {...user} />
            </View>
            <View style={styles.headerContent}>
                <DeleteUser {...user} />
            </View>
        </View>
    ));
};

export default UsersTabelBody;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        height: 35,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.inActiveText,
        borderRightColor: colors.inActiveText,
        borderRightWidth: 0.5,
    },
    headerContent: {
        borderLeftWidth: 0.5,
        borderLeftColor: colors.inActiveText,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        textTransform: "capitalize",
        flex: 2,
    },
    name: {
        borderBottomColor: colors.inActiveText,
        borderBottomWidth: 1,
        fontSize: 10,
    },
});
