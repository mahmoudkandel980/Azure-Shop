import { BaseToast, ErrorToast } from "react-native-toast-message";
import colors from "../constants/Colors";

const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: "#40c057", backgroundColor: "#51cf66" }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 17,
                color: colors.white,
            }}
            text2Style={{
                fontSize: 15,
                color: colors.white,
            }}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{
                borderLeftColor: "#fa5252",
                backgroundColor: "#ff6b6b",
            }}
            text1Style={{
                fontSize: 17,
                color: colors.white,
            }}
            text2Style={{
                fontSize: 15,
                color: colors.white,
            }}
        />
    ),
};
export default toastConfig;
