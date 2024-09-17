import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import { ProductsView } from '../view/ProductsView';

// ----------------------------------------------------------------------

export default function ProductPages() {
  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
