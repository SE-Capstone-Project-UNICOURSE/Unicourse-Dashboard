import { useScrollToTop } from '@app/hooks/useScrollToTop';
import Router from '@app/routes/Router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'src/global.css';
import { ThemeProvider } from 'src/theme/ThemeProvider';
import DialogManager from './common/components/DialogManager';
import store, { persistor } from './stores';

const App = () => {
  useScrollToTop();

  // const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider>
            <DialogManager />
            <Router />
          </ThemeProvider>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
