// Footer

export interface FooterLinkInterface {
    href: any;
    icon?: JSX.Element;
    children?: string;
}

export interface HeaderPropsInterface {
    cartItemsNumber: number;
    usersWantToBeSellersNumber: number;
    closeModel: () => void;
}
