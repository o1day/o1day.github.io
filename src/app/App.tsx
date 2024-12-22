import {InfinityCalendar, WeekHeader} from '@ui/Calendar';
import {Layout, Header} from './views';

export const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <WeekHeader />
      <InfinityCalendar />
    </Layout>
  );
};
