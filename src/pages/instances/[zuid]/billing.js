import React from 'react';
import { useZestyStore } from 'store';
import { useRouter } from 'next/router';
import { ComingSoon } from 'components/accounts';
import InstanceContainer from 'components/accounts/instances/InstanceContainer';

export { default as getServerSideProps } from 'lib/accounts/protectedRouteGetServerSideProps';

export default function Billing() {
  const [, setusers] = React.useState([]);
  const [, setroles] = React.useState([]);
  const { ZestyAPI } = useZestyStore((state) => state);

  const router = useRouter();

  const { zuid } = router.query;

  const getUsers = async () => {
    const res = await ZestyAPI.getInstanceUsers(zuid);
    setusers(res.data);
  };

  const getInstanceUserRoles = async () => {
    const res = await ZestyAPI.getInstanceUsersWithRoles(zuid);
    setroles(res.data);
  };
  React.useEffect(() => {
    if (router.isReady) {
      getUsers();
      getInstanceUserRoles();
    }
  }, [router.isReady]);

  return (
    <InstanceContainer>
      <ComingSoon />
    </InstanceContainer>
  );
}
