import React from 'react';
import { Docs } from 'views/Docs';
import { useRouter } from 'next/router';
import { transFormMainData } from 'views/Docs/helper';
import { useZestyStore } from 'store';

export { default as getServerSideProps } from 'lib/accounts/protectedRouteGetServerSideProps';

const VALID_URLS = ['/accounts', '/instances', '/authentication'];

const initialTreeData = (url, data) => {
  const url1 = '/' + url.split('/').filter((e) => e)[0];
  if (VALID_URLS.includes(url1)) {
    return data.find((e) => e.url === url);
  }
};

export default function DocsPage(props) {
  const router = useRouter();
  const { setalgoliaApiKey, setalgoliaAppId, setalgoliaIndex, setmainData } =
    useZestyStore((e) => e);
  let url = router.asPath;
  url = url && url?.replace('/docs', '').replace(/\/$/, '');
  // const mainCollection = [INSTANCE_DATA, ACCOUNTS_DATA, AUTH_DATA];
  const mainCollection = props.docs.data;
  const mainData = transFormMainData(mainCollection);
  const [treeData, settreeData] = React.useState(mainData[2]);
  // const parentUrl = url && '/' + url?.split('/').filter((e) => e)[0];
  const parentUrl =
    '/' +
    url
      ?.split('/')
      .filter((e) => e)
      .slice(0, 2)
      .join('/');

  let item = [];
  const getPageData = (data, mainData = []) => {
    const currentUrl = url?.split('#')[0].replace(/\/$/, '');
    // to be  removed or change
    if (!url) {
      return (item = mainData[0]);
    }
    if (data?.url === currentUrl) {
      return (item = data);
    }
    // compares the current url vs the treedata url's
    // if match it will set the item or pagedata
    // remove hash and trailing slash
    (data?.item ?? data)?.forEach((e) => {
      if (e.url === currentUrl) {
        item = e;
      } else {
        getPageData(e?.item);
      }
    });

    return item;
  };

  const pageData = getPageData(treeData, mainData);

  const docsProps = {
    // data of pages
    // pagedata is dependent on treedata
    pageData,
    // treedata is the data of the sidebar
    treeData,
  };

  React.useEffect(() => {
    if (!url) {
      settreeData(mainData[0]);
    } else {
      settreeData(initialTreeData(parentUrl, mainData));
    }
  }, [url]);

  React.useEffect(() => {
    setalgoliaApiKey(props.algolia.apiKey);
    setalgoliaAppId(props.algolia.appId);
    setalgoliaIndex(props.algolia.index);
  }, []);

  React.useEffect(() => {
    if (mainData.length !== 0) {
      setmainData(mainData);
    }
  }, []);

  return <Docs {...docsProps} />;
}
