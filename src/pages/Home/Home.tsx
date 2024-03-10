import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  NavIdProps, Separator,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { PageLayout } from '../../shared/ui';
import {GetAge, GetFact} from "../../widgets";
export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>

      <PageLayout>
        <GetFact />
        <Separator />
        <GetAge />
      </PageLayout>
    </Panel>
  );
};
