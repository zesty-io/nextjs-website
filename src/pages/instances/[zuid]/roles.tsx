import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { useZestyStore } from 'store';
import { useRoles } from 'store/roles';
import { useInstance } from 'store/instance';
import InstanceContainer from 'components/accounts/instances/InstanceContainer';
import { Roles } from 'views/accounts';
import { ErrorMsg } from 'components/accounts';

export { default as getServerSideProps } from 'lib/accounts/protectedRouteGetServerSideProps';

export default function RolesPage() {
  const router = useRouter();
  const { userInfo, loading } = useZestyStore((state) => state);
  const { usersWithRoles, getRoles, getUsersWithRoles } = useRoles(
    (state) => state,
  );
  const { getInstanceModels, getInstanceContentItems, getLanguages } =
    useInstance((state) => state);
  const [isInitializingData, setIsInitializingData] = useState(true);

  const { zuid } = router.query;

  const hasPermission = useMemo(() => {
    if (!userInfo?.ZUID || !usersWithRoles?.length) return false;

    return ['admin', 'owner'].includes(
      usersWithRoles
        ?.find((user) => user.ZUID === userInfo?.ZUID)
        ?.role?.name?.toLowerCase(),
    );
  }, [userInfo, usersWithRoles]);

  useEffect(() => {
    if (router.isReady) {
      const instanceZUID = String(zuid);

      Promise.all([
        getUsersWithRoles(instanceZUID),
        getRoles(instanceZUID),
        getInstanceModels(),
        getInstanceContentItems(),
        getLanguages('all'),
      ])
        .catch(() => ErrorMsg({ title: 'Failed to fetch page data' }))
        .finally(() => setIsInitializingData(false));
    }
  }, [router.isReady]);

  return (
    <InstanceContainer>
      <Roles
        isLoading={isInitializingData || loading}
        hasPermission={hasPermission}
      />
    </InstanceContainer>
  );
}
