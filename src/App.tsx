import { Router } from '@routes/Router';
import 'src/global.css';
import { useScrollToTop } from 'src/hooks/useScrollToTop';
import { ThemeProvider } from 'src/theme/theme-provider';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
