import {ProfileView} from './ui/Profile.tsx';
import {StatusView} from './ui/Status.tsx';

export const Profile: React.FC = () => {
  return (
    <ProfileView>
      <StatusView status={undefined} />
    </ProfileView>
  );
};
