export interface SingleRenderTitleProps {
    type: string;
    color: string;
}

export interface FilterDate {
    // mutual
    id?: string;
    createdFrom?: string;
    createdTo?: string;
    // products
    category?: string;
    priceFrom?: string;
    priceTo?: string;
    rate?: string;
    // users
    email?: string;
    role?: string;
    active?: string;
    // orders
    isPaid?: string;
    isDelivered?: string;
    // products && users
    name?: string;
}

export interface PieData {
    value: number;
    color: string;
    gradientCenterColor: string;
    focused: boolean;
    type: string;
}

export interface FilterDataDashboardProps extends FilterDate {
    filterDataBearor: (filterData: FilterDate) => void;
}
