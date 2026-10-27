'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

interface NRMData {
  data: string[][];
  rows: number;
  columns: number;
}

const TrackerPage = () => {
  const { isLoaded, userId } = useAuth();
  const [nrmData, setNrmData] = useState<NRMData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!userId) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/nrm-data');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setNrmData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoaded, userId]);

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
          --f-num: "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace;
        }
        * { box-sizing: border-box; }
        html, body { margin: 0; }
        body { background: var(--bg); color: var(--fg); font-family: var(--f-body); font-size: 14px; line-height: 1.45; }
        .wrap { padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); max-width: 1500px; margin: 0 auto; }
        .mast { background: var(--panel); border-bottom: 1px solid var(--line); }
        .mast .wrap { padding-block: 18px 14px; display: flex; flex-wrap: wrap; gap: 12px 24px; align-items: flex-end; justify-content: space-between; }
        .brand h1 { font-weight: 700; font-size: 32px; margin: 0; line-height: 1; }
        .brand h1 span { color: var(--accent); }
        .brand p { margin: 6px 0 0; color: var(--muted); font-size: 13px; }
        .card { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 20px; margin-top: 20px; }
        .scroll { overflow-x: auto; }
        table { border-collapse: collapse; width: 100%; font-size: 13px; }
        th, td { padding: 7px 10px; text-align: left; white-space: nowrap; border-bottom: 1px solid var(--line); }
        th { font-size: 10.5px; text-transform: uppercase; letter-spacing: .07em; color: var(--muted); font-weight: 600; background: var(--panel-2); }
        .error { background: #fee; color: #c00; border: 1px solid #fcc; border-radius: 6px; padding: 12px; margin-top: 20px; }
        .loading { text-align: center; padding: 40px 20px; color: var(--muted); }
      `}</style>

      <header className="mast">
        <div className="wrap">
          <div className="brand">
            <h1>Garud <span>NRM</span> Tracker</h1>
            <p>Secure vehicle NRM data. Authenticated users only.</p>
          </div>
        </div>
      </header>

      <main className="wrap">
        {loading && (
          <div className="loading">
            <h2>Loading NRM data...</h2>
            <p>Fetching from Google Sheets</p>
          </div>
        )}

        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {nrmData && (
          <div className="card scroll">
            <table>
              <thead>
                <tr>
                  {nrmData.data[0]?.map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nrmData.data.slice(1).map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx}>{String(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--muted)' }}>
              Total: {nrmData.rows} rows, {nrmData.columns} columns
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default TrackerPage;
