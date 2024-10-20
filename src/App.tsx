import { Router } from '@app/routes/Router';
import { Provider } from 'react-redux';
import 'src/global.css';
import { useScrollToTop } from '@app/hooks/useScrollToTop';
import { ThemeProvider } from 'src/theme/ThemeProvider';
import store from './stores';

export default function App() {
  useScrollToTop();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </Provider>
  );
}
