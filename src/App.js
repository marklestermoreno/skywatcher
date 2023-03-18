import { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useQuery } from './util/util';

import misc from './lib/misc';

const Dashboard = lazy(() => import("./pages/Dashboard"))
const Login = lazy(() => import('./pages/Login'));
const Loading = lazy(() => import('./component/unauth/Loading'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const BrowserOutdated = lazy(() => import('./component/unauth/Loading'));

function App() {

  const query = useQuery();
  const navigate = useNavigate();
  let oobCode = query.get('oobCode')

  useEffect(() => {
    const User = sessionStorage.getItem('user') !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')) : sessionStorage.clear();
    if (!User) {

      if (oobCode) {
        navigate(`/reset-password?oobCode=${oobCode}`);
      }
      else {
        navigate("/login")
      }
    };
    // eslint-disable-next-line
  }, [navigate]);

  if (
    (misc.isChrome && (misc.browserVersion >= 72)) ||
    (misc.isSafari && (misc.browserVersion >= 14)) ||
    (misc.isOpera && (misc.browserVersion >= 60)) ||
    (misc.isEdge && (misc.browserVersion >= 80)) ||
    (misc.isFirefox && (misc.browserVersion >= 75)) ||
    (misc.isYandex && (misc.browserVersion >= 15))
  ) {
    return (
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </Suspense>
    );
  }
  else {
    return (
      <BrowserOutdated />
    )
  }
}

export default App;
