import AsyncStorage from "@react-native-async-storage/async-storage";

// find the index
export const findIndex = async (array, id) => {
    if (array && array.length !== 0) {
        return await array.findIndex((p) => p.id === id);
    } else {
        return -1;
    }
};

// check if the item exist in object or not
export const isExist = (obj, id) => {
    if (obj && obj.id) {
        return obj.id === id ? true : false;
    } else {
        return false;
    }
};


export const totalRating = async (array) => {
    return await array.reduce((acc, item) => acc + item.rating, 0) / array.length;
};

// REVIEWS
// when add review to product in array of products
export const modifiedProductsAfterAddReview = async (array, index, review) => {
    const oldReviews = array[index].reviews ? array[index].reviews : [];
    const newReviews = [...oldReviews, review];
    array.splice(index, 1, { ...array[index], reviews: newReviews });
    const rating = await totalRating(array[index].reviews);
    array[index].rating = rating;
    array[index].numReviews = array[index].reviews.length;
    return array;
};

// when edit review to product in array of products
export const modifiedProductsAfterEditReview = async (array, index, review) => {
    const reviewIndex = await findIndex(array[index].reviews, review.id);
    array[index].reviews.splice(reviewIndex, 1, review);
    const rating = await totalRating(array[index].reviews);
    array[index].rating = rating;
    array[index].numReviews = array[index].reviews.length;
    return array;
};

// when delete review to product in array of products
export const modifiedProductsAfterDeleteReview = async (array, index, review) => {
    const reviewIndex = await findIndex(array[index].reviews, review.id);
    array[index].reviews.splice(reviewIndex, 1);
    const rating = await totalRating(array[index].reviews);
    array[index].rating = rating;
    array[index].numReviews = array[index].reviews.length;
    return array;
};

// PRODUCTS
// find products that contains the target user
export const findIndexOfUser = async (array, id) => {
    if (array && array.length !== 0) {
        let indexes = [];
        await array.map((p, i) => (p.creator.id === id ? indexes.push(i) : null));
        return indexes;
    } else {
        return -1;
    }
};

// Cart

// find products that contains the target user
export const findIndexOfProduct = async (array, id) => {
    if (array && array.length !== 0) {
        let indexes = [];
        await array.map((cart, i) =>
            cart.product.creator === id ? indexes.push(i) : null
        );
        return indexes;
    } else {
        return -1;
    }
};


// USERS
export const updateLocalStorage = async (
    user,
    type,
    dispatch,
    logout,
    navigation
) => {
    const isUserInfoExist = await AsyncStorage.getItem("userInfo");
    const localStorageUserInfo = isUserInfoExist
        ? JSON.parse(isUserInfoExist)
        : null;

    if (localStorageUserInfo) {
        if (localStorageUserInfo.id === user.id) {
            if (type === "edit") {
                const token =
                    localStorageUserInfo.token ||
                    (await AsyncStorage.getItem("token"));
                let newLocalStorage = user;
                newLocalStorage.token = token;
                if (user.products) {
                    delete user.products;
                }
                await AsyncStorage.setItem(
                    "userInfo",
                    JSON.stringify(newLocalStorage)
                );
            } else {
                navigation.navigate("ProductsScreens", {
                    screen: "Products",
                });
                dispatch(logout());
                setTimeout(() => {
                    navigation.navigate("Register", {
                        screen: "Login",
                    });
                }, 3000);
            }
        }
    }
};
