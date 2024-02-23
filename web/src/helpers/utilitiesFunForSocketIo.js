// find the index
export const findIndex = (array, id) => {
    if (array.length !== 0) {
        return array.findIndex((p) => p.id === id);
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

export const totalRating = (array) => {
    return array.reduce((acc, item) => acc + item.rating, 0) / array.length;
};

// REVIEWS
// when add review to product in array of products
export const modifiedProductsAfterAddReview = (array, index, review) => {
    const oldReviews = array[index].reviews ? array[index].reviews : [];
    const newReviews = [...oldReviews, review];
    array[index].reviews = newReviews;
    const rating = totalRating(array[index].reviews);
    array[index].rating = rating;
    array[index].numReviews = array[index].reviews.length;
    return array;
};

// when edit review to product in array of products
export const modifiedProductsAfterEditReview = (array, index, review) => {
    const reviewIndex = findIndex(array[index].reviews, review.id);
    array[index].reviews.splice(reviewIndex, 1, review);
    const rating = totalRating(array[index].reviews);
    array[index].rating = rating;
    array[index].numReviews = array[index].reviews.length;
    return array;
};

// when edit review to product in array of products
export const modifiedProductsAfterDeleteReview = (array, index, review) => {
    const reviewIndex = findIndex(array[index].reviews, review.id);
    array[index].reviews.splice(reviewIndex, 1);
    const rating = totalRating(array[index].reviews);
    array[index].rating = rating;
    array[index].numReviews = array[index].reviews.length;
    return array;
};

// PRODUCTS

// find products that contains the target user
export const findIndexOfUser = (array, id) => {
    if (array.length !== 0) {
        let indexes = [];
        array.map((p, i) => (p.creator.id === id ? indexes.push(i) : null));
        return indexes;
    } else {
        return -1;
    }
};

// Cart

// find products that contains the target user
export const findIndexOfProduct = (array, id) => {
    if (array.length !== 0) {
        let indexes = [];
        array.map((cart, i) =>
            cart.product.creator === id ? indexes.push(i) : null
        );
        return indexes;
    } else {
        return -1;
    }
};

// USERS

export const updateLocalStorage = (user, type, dispatch, logout, navigate) => {
    const localStorageUserInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

    if (localStorageUserInfo) {
        if (localStorageUserInfo.id === user.id) {
            if (type === "edit") {
                const token = localStorageUserInfo.token;
                let newLocalStorage = user;
                newLocalStorage.token = token;
                if (user.products) {
                    delete user.products;
                }
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(newLocalStorage)
                );
            } else {
                navigate("/");
                setTimeout(() => {
                    dispatch(logout());
                    navigate("register/login");
                }, 300);
            }
        }
    }
};
