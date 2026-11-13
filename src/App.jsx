import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PortalHome } from './components/PortalHome';
import { PlayerProfile } from './components/PlayerProfile';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Footer } from './components/Footer';
import { fetchWynnPlayer } from './services/wynnApi';
import { handleWynnOAuthCallback } from './services/wynnAuth';

function App() {
  const [currentView, setCurrentView] = useState('portal');
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleWynnOAuthCallback().catch(() => {});
  }, []);

  const handleSearch = async (username) => {
    if (!username || !username.trim()) return;

    const trimmed = username.trim();
    setActiveQuery(trimmed);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWynnPlayer(trimmed);
      setPlayerData(data);
      setCurrentView('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || `Failed to retrieve data for player "${trimmed}".`);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnHome = () => {
    setCurrentView('portal');
    setPlayerData(null);
    setError(null);
    setSearchInput('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    if (activeQuery) {
      handleSearch(activeQuery);
    }
  };

  const handleCancelLoading = () => {
    setLoading(false);
    if (!playerData) {
      setCurrentView('portal');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080d0c] text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-300">
      <Header
        currentView={currentView}
        onSearch={handleSearch}
        onReturnHome={handleReturnHome}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <main className="flex-1 flex flex-col w-full">
        {loading ? (
          <LoadingSpinner username={activeQuery} onCancel={handleCancelLoading} />
        ) : error ? (
          <ErrorDisplay
            error={error}
            onRetry={handleRetry}
            onSelectMock={handleSearch}
            onReturnHome={handleReturnHome}
          />
        ) : currentView === 'profile' && playerData ? (
          <PlayerProfile player={playerData} onReturnHome={handleReturnHome} />
        ) : (
          <PortalHome
            onSearch={handleSearch}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
