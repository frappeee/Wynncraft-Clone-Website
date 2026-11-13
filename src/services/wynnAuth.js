const APP_ID = import.meta.env.VITE_WYNN_APP_ID || '';
const APP_SECRET = import.meta.env.VITE_WYNN_APP_SECRET || '';

export function getWynnAuthUrl() {
  if (!APP_ID) return null;
  const redirectUri = window.location.origin;
  const state = Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem('wynn_oauth_state', state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: APP_ID,
    redirect_uri: redirectUri,
    scope: 'identify main_access character_data_access',
    state: state,
  });

  return `https://wynncraft.com/oauth/authorize?${params.toString()}`;
}

export async function handleWynnOAuthCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');

  if (!code) return null;

  const savedState = sessionStorage.getItem('wynn_oauth_state');
  if (savedState && state !== savedState) {
    throw new Error('OAuth state mismatch.');
  }

  window.history.replaceState({}, document.title, window.location.pathname);

  try {
    const res = await fetch('https://api.wynncraft.com/v3/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: APP_ID,
        client_secret: APP_SECRET,
        code: code,
        redirect_uri: window.location.origin,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem('wynn_access_token', data.access_token);
        return data;
      }
    }
  } catch (err) {
    void err;
  }

  return { code };
}

export function getStoredToken() {
  return localStorage.getItem('wynn_access_token') || import.meta.env.VITE_WYNN_AUTH_TOKEN || '';
}

export function clearStoredToken() {
  localStorage.removeItem('wynn_access_token');
}
