import { Stack } from '@mui/material';
import useIsLoggedIn from 'components/hooks/useIsLoggedIn';
import { isUserAuthenticated } from 'middleware';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getIsAuthenticated } from 'utils';

const CustomLogin = dynamic(() => import('components/console/Login'));

const HOST = 'https://www.zesty.io';
const type = 'website';
const site = 'https://www.zesty.io';

const Login = (props) => {
  const router = useRouter();
  const content =
    props.data.data
      .sort(
        (a, b) =>
          new Date(b.content.start_date_and_time) -
          new Date(a.content.start_date_and_time),
      )
      .map((item) => item.content)[0] || null;

  const loginContent = props.loginData.data[0].content;
  const ogimage = content?.feature_image?.data[0]?.url;

  const preview = ogimage.replace(
    'kfg6bckb.media.zestyio.com',
    'kfg6bckb.media.zesty.site',
  );
  const title = loginContent.seo_meta_title;
  const description = loginContent.seo_meta_description;
  const canonicalURL = site + router.asPath;

  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn || props.isAuthenticated) {
      window.location.href = '/dashboard/';
    }
  }, [isLoggedIn, props.isAuthenticated]);
  return (
    <Stack>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Twitter */}
        <meta name="twitter:card" content={'summary_large_image'} />
        {/* https://twitter.com/MUI_hq */}
        <meta name="twitter:site" content="@zestyio" />
        {/* #major-version-switch */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={preview} />
        {/* Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        {/* #major-version-switch */}
        <meta property="og:url" content={`${HOST}${router.asPath}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={preview} />
        <meta property="og:ttl" content="604800" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="canonical" href={canonicalURL} />
      </Head>
      <CustomLogin content={content} userEmail={''} />
    </Stack>
  );
};

export async function getServerSideProps({ req, res }) {
  const isProd = process.env.PRODUCTION === 'true';
  const baseUrl = isProd
    ? 'https://www.zesty.io'
    : 'https://kfg6bckb-dev.webengine.zesty.io';

  const url = `${baseUrl}/-/instant/6-90fbdcadfc-4lc0s5.json`;
  const loginUrl = `${baseUrl}/-/instant/6-ccb9ca9fc1-06fhhc.json`;

  let isAuthenticated =
    (await isUserAuthenticated(req, true, isProd)) || getIsAuthenticated(res);

  const [response, loginResponse] = await Promise.all([
    fetch(url, { cache: 'no-cache' }),
    fetch(loginUrl, { cache: 'no-cache' }),
  ]);

  const [data, loginData] = await Promise.all([
    response.json(),
    loginResponse.json(),
  ]);

  return {
    props: {
      data,
      loginData,
      isAuthenticated,
    },
  };
}

export default Login;
