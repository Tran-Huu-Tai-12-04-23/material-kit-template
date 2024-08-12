/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { useEffect } from 'react';
import { AuthRouter, PrivateRouter } from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { getAccessToken } from './helper';
import { useAuthAction } from './redux/features/auth/action';
import { useAuthState } from './redux/features/auth/authSlice';
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const { currentUser } = useAuthState();
  const { getProfile } = useAuthAction();

  useEffect(() => {
    const initUser = async () => {
      const acToken = getAccessToken();
      if (acToken) {
        await getProfile();
      }
    };
    initUser();
  }, []);

  return (
    <ThemeProvider>
      {currentUser && <PrivateRouter />}
      {!currentUser && <AuthRouter />}
    </ThemeProvider>
  );
}
