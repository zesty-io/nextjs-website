export type UserRole = {
  ID: number;
  ZUID: string;
  authSource: string | null;
  authyEnabled?: boolean;
  authyPhoneCountryCode: string | null;
  authyPhoneNumber: string | null;
  authyUserID: string | null;
  createdAt: string;
  email: string;
  firstName: string;
  lastLogin: string;
  lastName: string;
  prefs: string | null;
  role: Role;
  signupInfo: string | null;
  staff: boolean;
  unverifiedEmails: string | null;
  updatedAt: string;
  verifiedEmails: string | null;
  websiteCreator: boolean;
};

export type Role = {
  ZUID: string;
  createdAt: string;
  createdByUserZUID: string;
  entityZUID: string;
  expiry: string | null;
  granularRoleZUID: string | null;
  granularRoles: GranularRole[] | null;
  name: string;
  static: boolean;
  systemRole: SystemRole;
  systemRoleZUID: string;
  updatedAt: string;
  description?: string;
};

export type RoleWithSort = Role & { sort?: number };

export type SystemRole = {
  ZUID: string;
  create: boolean;
  createdAt: string;
  delete: boolean;
  grant: boolean;
  name: string;
  publish: boolean;
  read: boolean;
  super: boolean;
  update: boolean;
  updatedAt: string;
};

export type GranularRole = SystemRole & { resourceZUID: string };

export type ContentModel = {
  ZUID: string;
  masterZUID: string;
  parentZUID: string;
  description: string;
  label: string;
  metaTitle?: any;
  metaDescription?: any;
  metaKeywords?: any;
  type: ModelType;
  name: string;
  sort: number;
  listed: boolean;
  createdByUserZUID: string;
  updatedByUserZUID: string;
  createdAt: string;
  updatedAt: string;
  module?: number;
  plugin?: number;
};

export type ModelType = 'pageset' | 'templateset' | 'dataset';

export type ContentItem = {
  web: Web;
  meta: Meta;
  siblings: [{ [key: number]: { value: string; id: number } }] | [];
  data: Data;
  publishAt?: any;
};

export type Web = {
  version: number;
  versionZUID: string;
  metaDescription: string;
  metaTitle: string;
  metaLinkText: string;
  metaKeywords?: any;
  parentZUID?: any;
  pathPart: string;
  path: string;
  sitemapPriority: number;
  canonicalTagMode: number;
  canonicalQueryParamWhitelist?: any;
  canonicalTagCustomValue?: any;
  createdByUserZUID: string;
  createdAt: string;
  updatedAt: string;
};

export type Meta = {
  ZUID: string;
  zid: number;
  masterZUID: string;
  contentModelZUID: string;
  sort: number;
  listed: boolean;
  version: number;
  langID: number;
  createdAt: string;
  updatedAt: string;
  createdByUserZUID: string;
};

export type Data = {
  [key: string]: number | string | null | undefined;
};

export type Language = {
  ID: number;
  code: string;
  name: string;
  default: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
