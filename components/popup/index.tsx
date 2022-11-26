import React, {
    forwardRef,
    useState,
    useImperativeHandle,
    useEffect,
    useContext,
    useMemo
} from "react";
import { createPortal } from "react-dom";
import cn from "classnames";
import { UserAgentContext } from "@/stores/userAgent";
import { Environment } from "@/constants/enum";
import styles from "./styles.module.scss";

export interface IPopupRef {
    open: () => void;
}

interface IProps {
    children: JSX.Element;
}

export const Popup = forwardRef<IPopupRef, IProps>(({ children }, ref) => {
    const [visible, setVisible] = useState(false);
    const [enter, setEnter] = useState(false);
    const [leave, setLeave] = useState(false);
    const { userAgent } = useContext(UserAgentContext);

    useImperativeHandle(ref, () => ({
        open: (): void => {
            setEnter(true);
            setVisible(true);
            setTimeout((): void => {
                setEnter(false);
            }, 300);
        },
    }));

    const maskClass = useMemo(() => {
        return userAgent === Environment.MOBILE ? "forbidScroll" : "pcForbidScroll";
    }, [userAgent]);

    useEffect(() => {
        document.body.className = visible ? maskClass : ""
        let timeout: any;
        if (visible) {
            setEnter(true);
            timeout = setTimeout((): void => {
                setEnter(false);
            }, 300);
        } else {
            setLeave(true);
            timeout = setTimeout((): void => {
                setLeave(false);
            }, 300);
        }
        return (): void => {
            clearTimeout(timeout);
            timeout = null
        };
    }, [visible]);

    const renderDom = visible ? (
        <div
            className={cn({
                [styles.popup]: true,
                [styles.enter]: enter,
                [styles.leave]: leave,
            })}
        >
            <div className={styles.mask} />
            <div className={styles.popupContent}>
                <div
                    className={styles.closeBtn}
                    onClick={(): void => {
                        setLeave(true);
                        setTimeout((): void => {
                            setLeave(false);
                        }, 300);
                        setVisible(false);
                    }}
                />
                {children}
            </div>
        </div>
    ) : (
        <></>
    );

    return typeof document !== "undefined"
        ? createPortal(renderDom, document.body)
        : renderDom;
});
