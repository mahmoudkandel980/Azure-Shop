function imageUrlConverter(path: string, urlEnd: string): string {
    if (process.env.REACT_APP_NODE_ENV === "development") {
        return `${process.env.REACT_APP_IMAGES_URL}/${path!}/${urlEnd}`;
    } else {
        if (urlEnd === "default.jpg") {
            return `${process.env.REACT_APP_IMAGES_URL}/${path!}/${urlEnd}`;
        } else {
            return `${process.env.REACT_APP_IMAGES_CLOUDINARY_URL}/${urlEnd}`;
        }
    }
}

export default imageUrlConverter;
