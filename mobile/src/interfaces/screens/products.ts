import { UserInfo } from "./regester";
import { ReviewStateInterface } from "./reviews";
import { FilterDateInterface, PageType } from "../public";
import { CreateEditType } from "../models";

export interface ProductStateInterface {
    _id: string;
    id: string;
    name: string;
    imageUrl: string;
    category: string;
    description: string;
    price: number;
    priceDiscount: number;
    countInStock: number;
    creator: UserInfo;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    numReviews: number;
    rating: number;
    soldCount: number;
    creatorActiveStatus: boolean;
    reviews?: ReviewStateInterface[];
    type?: string | undefined;
}

export interface ProductFormData {
    name: string;
    category: string;
    description: string;
    price: number;
    priceDiscount: number;
    countInStock: number;
    imageUrl?: object;
}

export interface ProductsState {
    products: ProductStateInterface[];
    ITEMS_PER_PAGE: number;
    total_pages?: number;
    pageType?: PageType;
}

export interface TopRatedBestSaleProducts {
    topRatedProducts: ProductStateInterface[];
    bestSaleProducts: ProductStateInterface[];
}

export interface SingledataRowProps {
    title: string;
    description: string;
}

export interface SingleRowProps {
    title: string;
    value: string | number | React.JSX.Element;
}

export interface ProductsOfProductsOverViewInterface {
    _id: number;
    numProducts: number;
    rating: number;
}

export interface GraphProductsOfProductsOverViewInterface {
    _id: string;
    sum: number;
}

export interface ProductsOverview {
    products?: ProductsOfProductsOverViewInterface[];
    graphProducts: GraphProductsOfProductsOverViewInterface[];
}

export interface ProductGraphData {
    value: number;
    label: string;
}

export interface CreateEditProductModelProps {
    type: CreateEditType;
    showCreateEditModel: boolean;
    setShowCreateEditModel: React.Dispatch<React.SetStateAction<boolean>>;
    // in edit product mode
    screenType?: PageType;
    product?: ProductStateInterface;
}

export interface EditDeleteProductBtnProps {
    screenType: PageType;
    product: ProductStateInterface;
}

export interface FilterProductsProps {
    filterDataBearor: (filterData: FilterDateInterface) => void;
    name: string;
    category: string;
    priceFrom: string;
    priceTo: string;
    rate: string;
}
