import React from "react";
import { Link, useLocation } from "react-router-dom";

const CheckoutNav = (): JSX.Element => {
    const checkoutLinks = localStorage.getItem("shippingData")
        ? [
              {
                  href: "/checkout/shipping",
                  children: "shipping",
              },
              {
                  href: "/checkout/order",
                  children: "order",
              },
          ]
        : [
              {
                  href: "/checkout/shipping",
                  children: "shipping",
              },
          ];

    const { pathname } = useLocation();
    return (
        <nav className='flex justify-start items-center gap-6 list-none'>
            {checkoutLinks.map((link, i) => (
                <li key={i} className='flex justify-center items-center gap-6'>
                    <Link
                        to={link.href}
                        className={`${
                            pathname === link.href
                                ? "dark:border-whiteMilk border-darkGray"
                                : "opacity-60"
                        }  tracking-wider border-b-[1px] border-transparent  hover:border-darkGray/50 hover:dark:border-whiteMilk`}
                    >
                        {link.children}
                    </Link>
                    <>
                        {i < checkoutLinks.length - 1 && (
                            <span className='opacity-60'>&gt;</span>
                        )}
                    </>
                </li>
            ))}
        </nav>
    );
};

export default CheckoutNav;
