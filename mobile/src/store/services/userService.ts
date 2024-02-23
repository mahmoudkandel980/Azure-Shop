import baseRoute from "../../api/baseRoute";
import TransformToFormDataFun from "../../helpers/TransformToFormDataFun";

// interfaces
import { UserDetailsParams, UpdateMeParams } from "../../interfaces/store/user";

const userDetails = async (formData: UserDetailsParams) => {
    const { id, page } = formData;

    const { data } = await baseRoute.get(`/users/${id}?page=${page}`);

    return { data };
};

const updateMe = async (formData: UpdateMeParams) => {
    const submittedFormData = TransformToFormDataFun(formData);
    console.log("submittedFormData", submittedFormData);

    const { data } = await baseRoute.patch(
        `/users/updateMe`,
        submittedFormData
    );

    return { data };
};

const deleteMe = async () => {
    const { data } = await baseRoute.patch(`/users/deletetMe`);
    return { data };
};

const usersService = {
    userDetails,
    updateMe,
    deleteMe,
};

export default usersService;
