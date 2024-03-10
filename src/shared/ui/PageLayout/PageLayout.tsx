import { ReactNode } from "react";
import {
    Group,
    SplitCol,
    SplitLayout,
} from "@vkontakte/vkui";

export interface IPageLayoutProps {
    children: ReactNode
}

const PageLayout = (props: IPageLayoutProps) => {
    return (
        <SplitLayout
            style={{ justifyContent: 'center', boxSizing: "border-box" }}
        >
            <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced style={{padding: "30px 0", boxSizing: "border-box"}}>
                <Group>
                    {props.children}
                </Group>
            </SplitCol>
        </SplitLayout>
    );
};

export default PageLayout;

