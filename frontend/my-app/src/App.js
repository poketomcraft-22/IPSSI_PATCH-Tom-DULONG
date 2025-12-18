import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/users';

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Le serveur ne répond pas.");
    }
  };

  const handleSelectUser = async (id) => {
    if (!id) {
      setSelectedUser(null);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();
      setSelectedUser(data);
    } catch (err) {
      setSelectedUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    await fetch(`${API_URL}/populate`, { method: 'POST' });
    fetchUsers();
  };

  // NOUVELLE FONCTION RESET
  const handleReset = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer TOUS les utilisateurs ?")) {
      try {
        await fetch(`${API_URL}/reset`, { method: 'DELETE' });
        setSelectedUser(null);
        fetchUsers();
      } catch (err) {
        setError("Erreur lors du reset.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>IPSSI PATCH Manager</h1>
        <h1>De Tom DULONG</h1>
      </header>

      <main style={styles.main}>
        {/* BOUTONS D'ACTION */}
        <div style={styles.card}>
          <div style={styles.buttonGroup}>
            <button onClick={handleAddUser} style={styles.btnPrimary}>
              ➕ Générer
            </button>
            <button onClick={handleReset} style={styles.btnDanger}>
              🗑️ Reset Database
            </button>
          </div>
        </div>

        {/* SELECTEUR */}
        <div style={styles.card}>
          <label style={styles.label}>Rechercher par ID :</label>
          <select onChange={(e) => handleSelectUser(e.target.value)} style={styles.select}>
            <option value="">-- Choisir un ID --</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>ID: {u.id} - {u.name}</option>
            ))}
          </select>

          {selectedUser && (
            <div style={styles.focusBox}>
              <h2 style={styles.focusTitle}>Focus Utilisateur</h2>
              <p><strong>Nom :</strong> {selectedUser.name}</p>
              <p><strong>Email :</strong> {selectedUser.email}</p>
            </div>
          )}
        </div>

        {/* LISTE */}
        <div style={styles.card}>
          <h3>Répertoire ({users.length})</h3>
          <div style={styles.listContainer}>
            {users.map(u => (
              <div key={u.id} style={styles.userRow}>
                <span>ID: {u.id}</span>
                <strong>{u.name}</strong>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  app: { backgroundColor: '#f4f7f6', minHeight: '100vh', padding: '20px', fontFamily: 'Segoe UI, sans-serif' },
  header: { textAlign: 'center', marginBottom: '30px', color: '#2c3e50' },
  main: { maxWidth: '600px', margin: '0 auto' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px' },
  buttonGroup: { display: 'flex', gap: '10px' }, // Pour mettre les boutons côte à côte
  btnPrimary: { flex: 2, padding: '12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  btnDanger: { flex: 1, padding: '12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  label: { display: 'block', marginBottom: '10px', fontWeight: '600' },
  select: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' },
  focusBox: { marginTop: '20px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '8px', borderLeft: '5px solid #3498db' },
  focusTitle: { margin: '0 0 10px 0', fontSize: '18px', color: '#2980b9' },
  listContainer: { maxHeight: '200px', overflowY: 'auto' },
  userRow: { display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #eee' }
};

export default App;