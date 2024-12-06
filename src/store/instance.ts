import { create } from 'zustand';
import { ContentItem, ContentModel, Language } from './types';
import { getZestyAPI } from 'store';

const ZestyAPI = getZestyAPI();

type InstanceState = {
  instanceModels: ContentModel[];
  instanceContentItems: ContentItem[];
  languages: Language[];
};
type InstanceAction = {
  getInstanceModels: () => Promise<void>;
  getInstanceContentItems: () => Promise<void>;
  getLanguages: (type: 'all' | 'active') => Promise<void>;
};

export const useInstance = create<InstanceState & InstanceAction>((set) => ({
  instanceModels: [],
  getInstanceModels: async () => {
    const response = await ZestyAPI.getModels();

    if (response.error) {
      console.error('getInstanceModels error: ', response.error);
      throw new Error(response.error);
    } else {
      set({
        instanceModels: response.data,
      });
    }
  },

  instanceContentItems: [],
  getInstanceContentItems: async () => {
    const response = await ZestyAPI.searchItems();

    if (response.error) {
      console.error('getInstanceContentItems error: ', response.error);
      throw new Error(response.error);
    } else {
      set({
        instanceContentItems: response.data,
      });
    }
  },

  languages: [],
  getLanguages: async (type) => {
    const response = await ZestyAPI.getLocales(type);

    if (response.error) {
      console.error('getLanguages error: ', response.error);
      throw new Error(response.error);
    } else {
      set({ languages: response.data });
    }
  },
}));
