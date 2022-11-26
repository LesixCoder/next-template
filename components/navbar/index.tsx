import { FC, useContext, createRef } from 'react';
import { ThemeContext } from '@/stores/theme'
import { UserAgentContext } from '@/stores/userAgent'
import { Themes, Environment } from "@/constants/enum";
import { Popup, IPopupRef } from "../popup";
import styles from "./styles.module.scss";
import { popup } from '../popup/styles.module.scss';

export interface INavBarProps { }

export const Navbar: FC<INavBarProps> = () => {
    const { setTheme } = useContext(ThemeContext)
    const { userAgent } = useContext(UserAgentContext);
    const popupRef = createRef<IPopupRef>();

    return (
        <div className={styles.navBar}>
            <a href="http://localhost:3000/">
                <div className={styles.logoIcon}></div>
            </a>
            <div className={styles.themeArea}>
                <div
                    className={styles.popupText}
                    onClick={(): void => {
                        popupRef.current?.open();
                    }}
                >
                    弹窗示范
                </div>
                {userAgent === Environment.PC && (
                    <span className={styles.text}>当前是pc端样式</span>
                )}
                {userAgent === Environment.IPAD && (
                    <span className={styles.text}>当前是Ipad端样式</span>
                )}
                {userAgent === Environment.MOBILE && (
                    <span className={styles.text}>当前是移动端样式</span>
                )}
                <div
                    className={styles.themeIcon}
                    onClick={(): void => {
                        if (localStorage.getItem("theme") === Themes.LIGHT) {
                            setTheme(Themes.DARK);
                        } else {
                            setTheme(Themes.LIGHT);
                        }
                    }}
                ></div>
            </div>
            <Popup ref={popupRef}>
                <div>这是一个弹窗</div>
            </Popup>
        </div>
    );
}
