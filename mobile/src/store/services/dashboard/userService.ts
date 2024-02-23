import baseRoute from "../../../api/baseRoute";
import TransformToFormDataFun from "../../../helpers/TransformToFormDataFun";

// interfaces
import {
    UsersParams,
    DeleteUserParams,
    EditUserParams,
    UpdateUserWantToBeSellerParams,
    UsersWantToBeSellersParams,
} from "../../../interfaces/store/dashboard/users";

const users = async (formData: UsersParams) => {
    const { filterData, page } = formData;

    const { data } = await baseRoute.get(
        `/users/dashboard/users?${
            filterData ? `filterData=${JSON.stringify(filterData)}&` : ""
        }page=${page}`
    );

    return { data };
};

const usersOverview = async () => {
    const { data } = await baseRoute.get(`/users/dashboard/overview`);

    return { data };
};

const editUser = async (formData: EditUserParams) => {
    const { userId, userFormData } = formData;
    const submittedFormData = TransformToFormDataFun(userFormData);

    const { data } = await baseRoute.patch(
        `/users/dashboard/users/${userId}`,
        submittedFormData
    );

    return { data };
};

const deleteUser = async (formData: DeleteUserParams) => {
    const { userId } = formData;

    const { data } = await baseRoute.delete(`/users/dashboard/users/${userId}`);

    return { data };
};

const usersWantToBeSellers = async (formData: UsersWantToBeSellersParams) => {
    const { page } = formData;

    const { data } = await baseRoute.get(
        `/users/dashboard/usersWantToBeSellers?page=${page}`
    );

    return { data };
};

const usersWantToBeSellersNumber = async () => {
    const { data } = await baseRoute.get(
        `/users/dashboard/usersWantToBeSellersNumbers`
    );

    return { data };
};

const updateUserWantToBeSeller = async (
    formData: UpdateUserWantToBeSellerParams
) => {
    const { role, userId } = formData;

    const { data } = await baseRoute.patch(
        `/users/dashboard/usersWantToBeSellers/${userId}`,
        { role }
    );

    return { data };
};

const dashboardUsersService = {
    users,
    usersOverview,
    editUser,
    deleteUser,
    usersWantToBeSellers,
    usersWantToBeSellersNumber,
    updateUserWantToBeSeller,
};

export default dashboardUsersService;
