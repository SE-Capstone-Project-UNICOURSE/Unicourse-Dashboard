import { Router } from '@routes/Router';
import { Provider } from 'react-redux';
import 'src/global.css';
import { useScrollToTop } from 'src/hooks/useScrollToTop';
import { ThemeProvider } from 'src/theme/ThemeProvider';
import store from './stores';

export default function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </Provider>
  );
}
