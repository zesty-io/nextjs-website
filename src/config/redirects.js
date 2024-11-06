const docsRedirects = [
  {
    source: '/docs/instances/api-reference/:path*',
    destination: 'https://docs.zesty.io/reference/instances-api-reference',
    permanent: true,
  },
  {
    source: '/docs/authentication/api-reference/:path*',
    destination: 'https://docs.zesty.io/reference/authentication-api-reference',
    permanent: true,
  },
  {
    source: '/docs/accounts/api-reference/:path*',
    destination: 'https://docs.zesty.io/reference/accounts-api-reference',
    permanent: true,
  },
  {
    source: '/docs/parsley/api-reference/:path*',
    destination: 'https://docs.zesty.io/reference',
    permanent: true,
  },
  {
    source: '/docs/media/api-reference/:path*',
    destination: 'https://docs.zesty.io/reference/media-api-reference',
    permanent: true,
  },
  {
    source: '/docs/media/api-reference/manager/:path*',
    destination: 'https://docs.zesty.io/reference/media-manager-api-reference',
    permanent: true,
  },
  {
    source: '/docs/media/api-reference/storage/:path*',
    destination: 'https://docs.zesty.io/reference/media-storage-api-reference',
    permanent: true,
  },
  {
    source: '/docs/media/api-reference/modify/:path*',
    destination: 'https://docs.zesty.io/reference/media-modify-api-reference',
    permanent: true,
  },
  {
    source: '/docs/media/api-reference/resolver/:path*',
    destination: 'https://docs.zesty.io/reference/media-resolver-api-reference',
    permanent: true,
  },
];

export { docsRedirects };
