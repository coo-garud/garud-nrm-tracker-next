'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

const TrackerPage = () => {
  const { isLoaded, userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }

  if (!userId) {
    return <div className="error">Not authenticated. Please sign in.</div>;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const rowData = Object.values(formData);
      const response = await fetch('/api/save-nrm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rowData)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(`Error: ${data.error}`);
      } else {
        setMessage('✓ Data saved to NRM sheet!');
        setFormData({});
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --bg: #eef1f5;
          --panel: #ffffff;
          --panel-2: #f6f8fb;
          --line: #d6dce5;
          --fg: #13203a;
          --muted: #5b6880;
          --accent: #b86b00;
          --f-body: "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
        }
        * { box-sizing: border-box; }
        html, body { margin: 0; }
        body { background: var(--bg); color: var(--fg); font-family: var(--f-body); font-size: 14px; }
        .wrap { padding: 0 max(16px, env(safe-area-inset-left, 0px)); max-width: 1500px; margin: 0 auto; }
        .mast { background: var(--panel); border-bottom: 1px solid var(--line); padding: 20px 0; }
        .mast h1 { margin: 0; font-size: 32px; font-weight: 700; }
        .mast h1 span { color: var(--accent); }
        .mast p { margin: 6px 0 0; color: var(--muted); font-size: 13px; }
        .card { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 24px; margin-top: 20px; }
        .form-group { margin-bottom: 16px; }
        label { display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
        input, select, textarea { width: 100%; padding: 8px 10px; font-size: 14px; border: 1px solid var(--line); border-radius: 6px; font-family: inherit; }
        input:focus, select:focus, textarea:focus { outline: 2px solid var(--accent); outline-offset: 2px; }
        .button { background: var(--accent); color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px; }
        .button:hover { filter: brightness(1.1); }
        .button:disabled { opacity: 0.6; cursor: not-allowed; }
        .message { padding: 12px; border-radius: 6px; margin-top: 16px; }
        .success { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
        .error { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }
        .loading { text-align: center; padding: 40px 20px; color: var(--muted); }
      `}</style>

      <header className="mast">
        <div className="wrap">
          <h1>Garud <span>NRM</span> Tracker</h1>
          <p>Add new NRM records. All data stored securely on server.</p>
        </div>
      </header>

      <main className="wrap">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Add New Record</h2>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label>Order Number</label>
                <input type="text" placeholder="SO-AroWna-2627-000001" onChange={(e) => handleInputChange('order_no', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Customer Name</label>
                <input type="text" placeholder="Customer name" onChange={(e) => handleInputChange('customer', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Chassis Number</label>
                <input type="text" placeholder="MAT..." onChange={(e) => handleInputChange('chassis', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Product (Make)</label>
                <input type="text" placeholder="NEXON" onChange={(e) => handleInputChange('product', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Deal Price (Pre-GST)</label>
                <input type="number" placeholder="0" step="0.01" onChange={(e) => handleInputChange('price', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Purchase Price (Pre-GST)</label>
                <input type="number" placeholder="0" step="0.01" onChange={(e) => handleInputChange('purchase', e.target.value)} />
              </div>

              <div className="form-group">
                <label>NRM</label>
                <input type="number" placeholder="0" step="0.01" onChange={(e) => handleInputChange('nrm', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Executive</label>
                <input type="text" placeholder="Executive name" onChange={(e) => handleInputChange('executive', e.target.value)} />
              </div>
            </div>

            <button type="submit" className="button" disabled={loading}>
              {loading ? 'Saving...' : 'Save Record'}
            </button>
          </form>

          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default TrackerPage;
