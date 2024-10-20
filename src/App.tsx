import { useScrollToTop } from '@app/hooks/useScrollToTop';
import Router from '@app/routes/Router';
import { Provider } from 'react-redux';
import 'src/global.css';
import { ThemeProvider } from 'src/theme/ThemeProvider';
import store from './stores';

const App = () => {
  useScrollToTop();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
