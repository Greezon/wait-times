import React, { useState, useEffect } from 'react';
import { styles } from './Styles';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const WaitingRoomApp = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [providers, setProviders] = useState([]);
  const [newName, setNewName] = useState('');
  const [newWaitTime, setNewWaitTime] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // FastAPI endpoint
  const API_URL = 'http://waitingroom-display.tfhd.ad/api/providers';

  // Fetch providers from FastAPI backend
  const fetchProviders = async () => {
    try {
      const response = await axios.get(API_URL);
      setProviders(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Enhanced useEffect with smart polling
  useEffect(() => {
    // Initial fetch
    fetchProviders();
    
    // Set up time updater
    const timeTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set up smart polling for data updates
    let dataTimer = null;
    
    const startPolling = () => {
      if (!isAdmin && !dataTimer) {
        dataTimer = setInterval(() => {
          fetchProviders();
        }, 2000); // Poll every 2 seconds
      }
    };

    const stopPolling = () => {
      if (dataTimer) {
        clearInterval(dataTimer);
        dataTimer = null;
      }
    };

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling(); // Stop polling when page is hidden
      } else {
        fetchProviders(); // Fetch immediately when page becomes visible
        startPolling(); // Resume polling
      }
    };

    // Start polling initially if not in admin mode
    if (!isAdmin) {
      startPolling();
    }

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      clearInterval(timeTimer);
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAdmin]); // Dependency on isAdmin to restart polling when switching modes

  // Add new provider
  const addProvider = async () => {
    if (newName.trim() && newWaitTime.trim()) {
      try {
        const response = await axios.post(API_URL, {
          name: newName.trim(),
          wait_time: newWaitTime.trim(),
          visible: true,
          show_wait_time: true
        });
        setProviders([...providers, response.data]);
        setNewName('');
        setNewWaitTime('');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Delete provider
  const deleteProvider = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProviders(providers.filter(provider => provider.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Update provider
  const updateProvider = async (updatedProvider) => {
    try {
      await axios.put(`${API_URL}/${updatedProvider.id}`, updatedProvider);
      setProviders(providers.map(provider => 
        provider.id === updatedProvider.id ? updatedProvider : provider
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle visibility
  const toggleVisibility = async (id) => {
    const provider = providers.find(p => p.id === id);
    const updatedProvider = { ...provider, visible: !provider.visible };
    await updateProvider(updatedProvider);
  };

  // Toggle wait time visibility
  const toggleWaitTimeVisibility = async (id) => {
    const provider = providers.find(p => p.id === id);
    const updatedProvider = { ...provider, show_wait_time: !provider.show_wait_time };
    await updateProvider(updatedProvider);
  };

  // Edit wait time functions
  const startEditingWaitTime = (id) => {
    setProviders(providers.map(provider => 
      provider.id === id ? { 
        ...provider, 
        isEditingWaitTime: true,
        tempWaitTime: provider.wait_time
      } : provider
    ));
  };

  const saveWaitTime = async (id) => {
    const provider = providers.find(p => p.id === id);
    const updatedProvider = { 
      ...provider, 
      isEditingWaitTime: false,
      wait_time: provider.tempWaitTime
    };
    await updateProvider(updatedProvider);
  };

  const cancelEditingWaitTime = (id) => {
    setProviders(providers.map(provider => 
      provider.id === id ? { 
        ...provider, 
        isEditingWaitTime: false
      } : provider
    ));
  };

  const handleWaitTimeChange = (id, value) => {
    setProviders(providers.map(provider => 
      provider.id === id ? { 
        ...provider, 
        tempWaitTime: value
      } : provider
    ));
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      saveWaitTime(id);
    } else if (e.key === 'Escape') {
      cancelEditingWaitTime(id);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  if (isLoading) {
    return <div style={styles.displayContainer}>Loading providers...</div>;
  }

  if (error) {
    return <div style={styles.displayContainer}>Error: {error}</div>;
  }

  if (isAdmin) {
    return (
      <div style={styles.adminContainer}>
        <div style={styles.adminPanel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={styles.title}>Admin Panel</h1>
            <button
              onClick={() => setIsAdmin(false)}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              View Display
            </button>
          </div>

          <div style={styles.addSection}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>Add New Provider</h3>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Provider Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') addProvider(); }}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Wait Time (e.g., 15 minutes)"
                value={newWaitTime}
                onChange={(e) => setNewWaitTime(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') addProvider(); }}
                style={styles.input}
              />
              <button onClick={addProvider} style={styles.addButton}>
                Add Provider
              </button>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>
              Current Providers ({providers.length})
            </h3>
            
            {providers.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={{ fontSize: '18px', color: '#666' }}>No providers available</p>
              </div>
            ) : (
              <div style={styles.providerList}>
                {providers.map((provider) => (
                  <div key={provider.id} style={styles.providerCard}>
                    <div style={styles.providerInfo}>
                      <div style={styles.avatar}>
                        {provider.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 style={styles.providerName}>{provider.name}</h4>
                        {provider.isEditingWaitTime ? (
                          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                            <input
                              type="text"
                              value={provider.tempWaitTime}
                              onChange={(e) => handleWaitTimeChange(provider.id, e.target.value)}
                              onKeyDown={(e) => handleKeyPress(e, provider.id)}
                              style={{ 
                                ...styles.input, 
                                padding: '6px 10px',
                                fontSize: '14px',
                                width: '100px'
                              }}
                              autoFocus
                            />
                            <button
                              onClick={() => saveWaitTime(provider.id)}
                              style={{
                                background: '#28a745',
                                color: 'white',
                                border: 'none',
                                padding: '6px 10px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => cancelEditingWaitTime(provider.id)}
                              style={{
                                background: '#dc3545',
                                color: 'white',
                                border: 'none',
                                padding: '6px 10px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <p style={styles.waitTime}>
                            Estimated wait: {provider.wait_time}
                            <button
                              onClick={() => startEditingWaitTime(provider.id)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#007bff',
                                cursor: 'pointer',
                                marginLeft: '5px',
                                fontSize: '12px'
                              }}
                            >
                              (edit)
                            </button>
                          </p>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => toggleWaitTimeVisibility(provider.id)}
                        style={{
                          background: provider.show_wait_time ? '#17a2b8' : '#6c757d',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'background-color 0.3s ease'
                        }}
                      >
                        {provider.show_wait_time ? 'Hide Time' : 'Show Time'}
                      </button>
                      <button
                        onClick={() => toggleVisibility(provider.id)}
                        style={{
                          background: provider.visible ? '#ffc107' : '#6c757d',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'background-color 0.3s ease'
                        }}
                      >
                        {provider.visible ? 'Hide Provider' : 'Show Provider'}
                      </button>
                      <button
                        onClick={() => deleteProvider(provider.id)}
                        style={styles.deleteButton}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.displayContainer}>
      <button
        onClick={() => setIsAdmin(true)}
        style={styles.adminButton}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
        }}
      >
        Admin
      </button>
    
      <h1 style={styles.displayTitle}>Provider Wait Times</h1>
      <p style={styles.subtitle}>Current estimated wait times</p>
      <div style={styles.currentTime}>
        {formatTime(currentTime)}
    
      </div>

      {providers.filter(p => p.visible).length === 0 ? (
        <div style={styles.emptyState}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>No providers available</h2>
          <p style={{ fontSize: '1.5rem' }}>Please check back later</p>
        </div>
      ) : (
        <div style={styles.displayGrid}>
          {providers.filter(p => p.visible).map((provider, index) => (
            <div key={provider.id} style={styles.displayCard}>
              <h3 style={styles.displayName}>{provider.name}</h3>
              {provider.show_wait_time && (
                <p style={styles.displayWaitTime}>Estimated wait: {provider.wait_time}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WaitingRoomApp;