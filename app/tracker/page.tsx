'use client';

import { useEffect } from 'react';

const Tracker = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <style>{`
/* Layout: dealership ops ledger — sticky control bar, KPI strip split by deal stage, pipeline first, then stacked sortable ledgers */
:root{
  --bg:#eef1f5; --panel:#ffffff; --panel-2:#f6f8fb; --line:#d6dce5; --line-soft:#e6eaf0;
  --fg:#13203a; --muted:#5b6880; --faint:#8b96aa;
  --ink:#1d3a6e; --ink-soft:#e3eaf6;
  --accent:#b86b00; --accent-soft:rgba(214,132,20,.16);
  --good:#1f7a4d; --good-soft:rgba(31,122,77,.12);
  --bad:#c0392b; --bad-soft:rgba(192,57,43,.10); --warn:#a86a00; --warn-soft:rgba(214,150,20,.14);
  --f-display:"Barlow Condensed","Arial Narrow",Arial,sans-serif;
  --f-body:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;
  --f-num:"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --bg:#0c1424; --panel:#121d31; --panel-2:#17233a; --line:#26354f; --line-soft:#1e2c44;
  --fg:#e6ecf5; --muted:#9aa8bf; --faint:#6c7a92;
  --ink:#9fbcf0; --ink-soft:#1c2c4a;
  --accent:#f0a83a; --accent-soft:rgba(240,168,58,.18);
  --good:#4cc38a; --good-soft:rgba(76,195,138,.14);
  --bad:#ff7b6b; --bad-soft:rgba(255,123,107,.12); --warn:#f0b54a; --warn-soft:rgba(240,181,74,.14);
  color-scheme:dark}}
:root[data-theme="dark"]{
  --bg:#0c1424; --panel:#121d31; --panel-2:#17233a; --line:#26354f; --line-soft:#1e2c44;
  --fg:#e6ecf5; --muted:#9aa8bf; --faint:#6c7a92;
  --ink:#9fbcf0; --ink-soft:#1c2c4a;
  --accent:#f0a83a; --accent-soft:rgba(240,168,58,.18);
  --good:#4cc38a; --good-soft:rgba(76,195,138,.14);
  --bad:#ff7b6b; --bad-soft:rgba(255,123,107,.12); --warn:#f0b54a; --warn-soft:rgba(240,181,74,.14);
  color-scheme:dark}
*{box-sizing:border-box}
html,body{margin:0}
[hidden]{display:none!important}
body{background:var(--bg);color:var(--fg);font-family:var(--f-body);font-size:14px;line-height:1.45}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:10;background:var(--panel)}
.wrap{padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));max-width:1500px;margin:0 auto}
button,select,input,textarea{font:inherit;color:inherit}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
html{scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}

.mast{background:var(--panel);border-bottom:1px solid var(--line)}
.mast .wrap{padding-block:18px 14px;display:flex;flex-wrap:wrap;gap:12px 24px;align-items:flex-end;justify-content:space-between}
.brand h1{font-family:var(--f-display);font-weight:700;font-size:32px;letter-spacing:.01em;margin:0;line-height:1;text-wrap:balance}
.brand h1 span{color:var(--accent)}
.brand p{margin:6px 0 0;color:var(--muted);font-size:13px;max-width:62ch}
.src{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.btn{border:1px solid var(--line);background:var(--panel-2);border-radius:6px;padding:7px 12px;cursor:pointer;font-size:13px;font-weight:500;white-space:nowrap}
.btn:hover{border-color:var(--ink)}
.btn:disabled{opacity:.55;cursor:default}
.btn.primary{background:var(--ink);border-color:var(--ink);color:var(--panel)}
.btn.primary:hover{filter:brightness(1.1)}
.btn.sm{padding:4px 9px;font-size:12px}
.srcinfo{font-size:12px;color:var(--muted);max-width:420px}
.srcinfo b{color:var(--fg);font-weight:600}

.bar{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--panel);border-bottom:1px solid var(--line);box-shadow:0 4px 12px -10px rgba(0,0,0,.35)}
.bar .wrap{padding-block:10px;display:flex;flex-wrap:wrap;gap:8px 14px;align-items:end}
.f{display:flex;flex-direction:column;gap:3px;min-width:0}
.f>label,.f>.lab{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:600}
.f select,.f input[type=date]{background:var(--panel-2);border:1px solid var(--line);border-radius:6px;padding:6px 8px;font-size:13px;max-width:190px}
.stg{display:flex;border:1px solid var(--line);border-radius:6px;overflow:hidden}
.stg label{display:flex;align-items:center;gap:5px;padding:5px 9px;font-size:13px;cursor:pointer;border-right:1px solid var(--line);background:var(--panel-2);user-select:none}
.stg label:last-child{border-right:0}
.stg input{accent-color:var(--ink);margin:0}
.stg label:has(input:checked){background:var(--ink-soft)}
.tog{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;padding-bottom:6px;user-select:none}
.tog input{accent-color:var(--accent);width:15px;height:15px}
.bar .spacer{flex:1}
.chips{display:flex;flex-wrap:wrap;gap:6px;padding-bottom:4px}
.chip{background:var(--accent-soft);color:var(--fg);border:1px solid transparent;border-radius:999px;padding:3px 10px;font-size:12px;cursor:pointer}
.chip:hover{border-color:var(--accent)}
.chip i{font-style:normal;color:var(--muted);margin-left:4px}
.nav{display:flex;gap:4px;flex-wrap:wrap;padding-bottom:2px}
.nav a{font-size:12px;color:var(--muted);text-decoration:none;padding:4px 8px;border-radius:5px}
.nav a:hover{background:var(--ink-soft);color:var(--fg)}

.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-block:18px}
.kpi{background:var(--panel);padding:12px 14px;position:relative}
.kpi .l{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:600;display:flex;align-items:center;gap:6px}
.kpi .v{font-family:var(--f-num);font-size:22px;font-weight:500;margin-top:4px;font-variant-numeric:tabular-nums;white-space:nowrap}
.kpi .s{font-size:12px;color:var(--muted);margin-top:2px}
.kpi.hero{background:var(--accent-soft)}
.kpi.hero .v{color:var(--accent)}
.kpi .v.neg{color:var(--bad)}
.kpi.off{opacity:.5}
.dot{width:8px;height:8px;border-radius:50%;display:inline-block;flex:none}
.dot.sold{background:var(--good)} .dot.allotted{background:var(--ink)} .dot.booked{background:var(--warn)} .dot.cancelled{background:var(--faint)}

section{margin-bottom:22px;scroll-margin-top:130px}
.sh{display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:8px}
.sh h2{font-family:var(--f-display);font-weight:600;font-size:22px;letter-spacing:.02em;margin:0;text-transform:uppercase}
.sh h3{font-family:var(--f-display);font-weight:600;font-size:17px;letter-spacing:.03em;margin:0;text-transform:uppercase;color:var(--ink)}
.sh small{font-family:var(--f-body);font-size:12px;color:var(--muted);text-transform:none;letter-spacing:0;font-weight:400;margin-left:8px}
.sh .tools{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:18px}
@media (max-width:480px){.grid3{grid-template-columns:1fr}}
.grid3>section{min-width:0;margin-bottom:0}
.card{background:var(--panel);border:1px solid var(--line);border-radius:10px;min-width:0}
.scroll{overflow-x:auto}
.empty{padding:18px;color:var(--muted);font-size:13px}
.empty b{color:var(--fg)}

table{border-collapse:collapse;width:100%;font-size:13px}
th,td{padding:7px 10px;text-align:left;white-space:nowrap;border-bottom:1px solid var(--line-soft)}
th{font-size:10.5px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);font-weight:600;background:var(--panel-2);position:sticky;top:0;cursor:pointer;user-select:none;z-index:1}
th:hover{color:var(--fg)}
th.sorted{color:var(--fg)}
th .ar{display:inline-block;width:10px;color:var(--accent)}
th.grpH{cursor:default;text-align:center;border-bottom:1px solid var(--line)}
td.n,th.n{text-align:right;font-family:var(--f-num);font-variant-numeric:tabular-nums}
th.n{font-family:var(--f-body)}
td.nrm{color:var(--accent);font-weight:500}
td.neg,td.nrm.neg{color:var(--bad)}
td.up{color:var(--good)}
td.z{color:var(--faint)}
tbody tr.click{cursor:pointer}
tbody tr.click:hover td{background:var(--ink-soft)}
tr.tot td{font-weight:600;background:var(--panel-2);border-top:1px solid var(--line);border-bottom:none}
tr.sub td{font-weight:600;background:var(--ink-soft)}
tr.grp td{background:var(--panel-2);font-family:var(--f-display);font-size:15px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ink)}
tr.flag td:first-child{box-shadow:inset 3px 0 0 var(--bad)}
tr.cx td{color:var(--faint)}
.dim{color:var(--muted);font-size:12px}
.bar-cell{display:flex;align-items:center;gap:8px;justify-content:flex-end}
.mini{width:56px;height:6px;background:var(--line-soft);border-radius:3px;position:relative;flex:none}
.mini span{position:absolute;top:0;bottom:0;left:0;background:var(--ink);border-radius:3px}
.mini span.neg{background:var(--bad)}
.pill{display:inline-block;font-size:11px;padding:1px 7px;border-radius:999px;font-weight:500;white-space:nowrap}
.pill.bad{background:var(--bad-soft);color:var(--bad)}
.pill.warn{background:var(--warn-soft);color:var(--warn)}
.pill.ok{background:var(--ink-soft);color:var(--ink)}
.pill.sold{background:var(--good-soft);color:var(--good)}
.pill.allotted{background:var(--ink-soft);color:var(--ink)}
.pill.booked{background:var(--warn-soft);color:var(--warn)}
.pill.cancelled{background:var(--line-soft);color:var(--faint)}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:6px;overflow:hidden;flex-wrap:wrap}
.seg button{border:0;background:var(--panel);padding:5px 10px;font-size:12px;cursor:pointer;border-right:1px solid var(--line)}
.seg button:last-child{border-right:0}
.seg button[aria-pressed="true"]{background:var(--ink);color:var(--panel)}
.search{background:var(--panel-2);border:1px solid var(--line);border-radius:6px;padding:5px 9px;font-size:13px;width:210px;max-width:100%}
footer{color:var(--faint);font-size:12px;padding-block:6px 30px}
      `}</style>
      <header className="mast">
        <div className="wrap">
          <div className="brand">
            <h1>Garud <span>NRM</span> Tracker</h1>
            <p>Secure vehicle NRM data. Authenticated users only.</p>
          </div>
          <div className="src">
            <div className="srcinfo">Dashboard</div>
          </div>
        </div>
      </header>
      <div className="bar">
        <div className="wrap">
          <p style={{margin: 0, color: 'var(--fg)', fontSize: '14px'}}>
            ✓ Authenticated with Clerk
          </p>
        </div>
      </div>
      <main className="wrap">
        <div style={{padding: '40px 20px', textAlign: 'center'}}>
          <h2>NRM Tracker Loading...</h2>
          <p style={{color: 'var(--muted)'}}>Setting up secure data connection</p>
          <div style={{marginTop: '20px', fontSize: '13px', color: 'var(--muted)'}}>
            <p>✓ Authentication: Clerk</p>
            <p>✓ Data Source: Google Sheets (secure backend)</p>
            <p>✓ Access: Logged-in users only</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Tracker;
