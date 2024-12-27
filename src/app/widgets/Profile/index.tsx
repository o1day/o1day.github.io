import {ProfileView} from './views/Profile';
import {StatusView} from './views/Status';

export const Profile: React.FC = () => {
  return (
    <ProfileView>
      <StatusView status={undefined} />
    </ProfileView>
  );
};
