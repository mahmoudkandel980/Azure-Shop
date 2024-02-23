import {
    ValidateInputProps,
    ValidateImageInputProps,
    ValidateConfrimPasswordProps,
} from "../interfaces/public";

const validateInput = ({ type, inputValue }: ValidateInputProps) => {
    switch (type) {
        case "Name":
        case "Category":
        case "Description":
        case "Price":
        case "Price Discount":
        case "Count In Stock":
        case "Address":
        case "City":
        case "Country":
        case "Phone":
        case "Postal Code":
            if (!inputValue || inputValue.trim().length === 0) {
                return `Please fill ${type} field.`;
            }
            return "";
        case "Email":
            if (
                !inputValue ||
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    inputValue.trim()
                )
            ) {
                return `Please fill ${type} field. should include @ symbol.`;
            }
            return "";
        case "Password":
        case "New Password":
        case "Current Password":
            if (!inputValue || inputValue.trim().length < 8) {
                return `Please fill ${type} field. At least 8 characters.`;
            }
            return "";
        case "Review":
            if (!inputValue || inputValue.trim().length < 5) {
                return `Please fill ${type} field. At least 5 characters.`;
            }
            return "";
        default:
            return "";
    }
};

export default validateInput;

export const validateImageInput = ({
    type,
    inputValue,
}: ValidateImageInputProps) => {
    if (!inputValue) {
        return `Please fill ${type} field.`;
    } else {
        return "";
    }
};

export const ValidateConfrimPassword = ({
    password,
    ConfrimPassword,
}: ValidateConfrimPasswordProps) => {
    if (password && password !== ConfrimPassword) {
        return `Confrim password field not equal password field.`;
    } else {
        return "";
    }
};
