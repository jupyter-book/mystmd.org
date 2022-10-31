import { RemixBrowser } from '@remix-run/react';
import { Provider } from 'react-redux';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import type { types } from '@curvenote/runtime';
import { register } from '@curvenote/components';
import { host } from '@curvenote/connect';
import { createCurvenoteReduxStore } from '@curvenote/site';

function hydrate() {
  const store = createCurvenoteReduxStore();
  register(store as types.Store);
  host.registerMessageListener(store);
  (window as any).store = store;
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <Provider store={store}>
          <RemixBrowser />
        </Provider>
      </StrictMode>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
