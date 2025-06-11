// Styles.jsx
export const styles = {
  container: {
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0
  },
  adminContainer: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
    padding: '20px'
  },
  displayContainer: {
    background: 'linear-gradient(135deg,rgb(75, 93, 36) 0%, #4b5d24 100%)',
    minHeight: '100vh',
    padding: '20px',
    color: 'white',
    position: 'relative'
  },
  adminButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  },
  adminPanel: {
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
    textAlign: 'center'
  },
  displayTitle: {
    fontSize: '4rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  },
  subtitle: {
    fontSize: '1.5rem',
    textAlign: 'center',
    marginBottom: '40px',
    opacity: 0.8
  },
  addSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    color: 'white'
  },
  inputGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '15px',
    flexWrap: 'wrap'
  },
  input: {
    flex: 1,
    minWidth: '200px',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  inputFocus: {
    borderColor: '#667eea'
  },
  addButton: {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease'
  },
  providerList: {
    display: 'grid',
    gap: '15px'
  },
  providerCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    border: '2px solid #e9ecef',
    transition: 'all 0.3s ease'
  },
  providerCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  providerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  providerName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0
  },
  status: {
    fontSize: '14px',
    color: '#666',
    margin: '5px 0 0 0'
  },
  deleteButton: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease'
  },
  displayGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(15%, 1fr))',
    gap: '30px',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
  },
  displayCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '15px',
    padding: '30px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    minHeight: '5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayAvatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
    margin: '0 auto 20px auto'
  },
  displayName: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  displayStatus: {
    fontSize: '20px',
    opacity: 0.9
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    opacity: 0.7,
    width: '100%'
  },
  currentTime: {
    textAlign: 'center',
    marginTop: '40px',
    fontSize: '24px',
    opacity: 0.8
  },
  waitTimeToggleButton: {
  background: '#17a2b8',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s ease'
},
waitTimeToggleButtonInactive: {
  background: '#6c757d'
}
};