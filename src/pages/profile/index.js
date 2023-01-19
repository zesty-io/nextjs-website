import React from 'react';
import { useZestyStore } from 'store';
import { YourProfile } from 'views/accounts/profile/YourProfile';
import { ProfileContainer } from 'components/accounts';

export { default as getServerSideProps } from 'lib/accounts/protectedRouteGetServerSideProps';

export default function ProfilePage() {
  const { setuserInfo } = useZestyStore((state) => state);
  const { ZestyAPI } = useZestyStore((state) => state);
  const [loading, setloading] = React.useState(false);
  const [userZUID, setuserZUID] = React.useState('');

  const handleVerifySuccess = (res) => {
    setuserZUID(res.meta.userZuid);
  };

  const handleGetUserSuccess = (res) => {
    setuserInfo(res?.data);
  };

  const verify = async () => {
    const res = await ZestyAPI.verify();
    !res.error && handleVerifySuccess(res);
  };

  const getUser = async (userZUID) => {
    setloading(true);
    const res = await ZestyAPI.getUser(userZUID);
    !res.error && handleGetUserSuccess(res);
    setloading(false);
  };

  React.useEffect(() => {
    verify();
  }, []);

  React.useEffect(() => {
    userZUID && getUser(userZUID);
  }, [userZUID]);

  return (
    <ProfileContainer>
      <YourProfile
        getUser={() => getUser(userZUID)}
        loading={loading}
        setloading={setloading}
      />
    </ProfileContainer>
  );
}
