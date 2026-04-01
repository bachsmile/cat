import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import vi from './locales/vi.json';

import { userApi } from '../api/user';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'en',
  fallbackLocale: 'en',
  messages: { en, vi },
});

export default i18n;

export const setLanguage = async (lang: 'en' | 'vi') => {
  i18n.global.locale.value = lang;
  localStorage.setItem('language', lang);
  
  // Sync with backend if user is logged in
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.id) {
       await userApi.updateUser(user.id, { language: lang });
       // Update local user object
       user.language = lang;
       localStorage.setItem('user', JSON.stringify(user));
    }
  }
};
