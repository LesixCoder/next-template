import { FC } from "react";
import { IFooterProps, Footer } from "../footer/index";
import { INavBarProps, Navbar } from "../navbar/index";
import styles from "./styles.module.scss";

export interface ILayoutProps {
    navbarData: INavBarProps;
    footerData: IFooterProps;
}

export const Layout: FC<ILayoutProps & { children: JSX.Element }> = ({
    navbarData,
    footerData,
    children,
}) => {
    return (
        <div className={styles.layout}>
            <Navbar {...navbarData} />
            <main className={styles.main}>{children}</main>
            <Footer {...footerData} />
        </div>
    );
};
