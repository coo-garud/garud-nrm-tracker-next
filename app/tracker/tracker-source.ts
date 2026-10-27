// The complete NRM Tracker HTML application with full JavaScript rendering
// Exported as a JSON-stringified string to guarantee fidelity

export const TRACKER_HTML = JSON.stringify(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Garud NRM Tracker</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"><\/script>
<style>
:root{--bg:#eef1f5;--panel:#ffffff;--panel-2:#f6f8fb;--line:#d6dce5;--line-soft:#e6eaf0;--fg:#13203a;--muted:#5b6880;--faint:#8b96aa;--ink:#1d3a6e;--ink-soft:#e3eaf6;--accent:#b86b00;--accent-soft:rgba(214,132,20,.16);--good:#1f7a4d;--good-soft:rgba(31,122,77,.12);--bad:#c0392b;--bad-soft:rgba(192,57,43,.10);--warn:#a86a00;--warn-soft:rgba(214,150,20,.14);--f-display:"Barlow Condensed","Arial Narrow",Arial,sans-serif;--f-body:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;--f-num:"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace}@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0c1424;--panel:#121d31;--panel-2:#17233a;--line:#26354f;--line-soft:#1e2c44;--fg:#e6ecf5;--muted:#9aa8bf;--faint:#6c7a92;--ink:#9fbcf0;--ink-soft:#1c2c4a;--accent:#f0a83a;--accent-soft:rgba(240,168,58,.18);--good:#4cc38a;--good-soft:rgba(76,195,138,.14);--bad:#ff7b6b;--bad-soft:rgba(255,123,107,.12);--warn:#f0b54a;--warn-soft:rgba(240,181,74,.14);color-scheme:dark}}:root[data-theme="dark"]{--bg:#0c1424;--panel:#121d31;--panel-2:#17233a;--line:#26354f;--line-soft:#1e2c44;--fg:#e6ecf5;--muted:#9aa8bf;--faint:#6c7a92;--ink:#9fbcf0;--ink-soft:#1c2c4a;--accent:#f0a83a;--accent-soft:rgba(240,168,58,.18);--good:#4cc38a;--good-soft:rgba(76,195,138,.14);--bad:#ff7b6b;--bad-soft:rgba(255,123,107,.12);--warn:#f0b54a;--warn-soft:rgba(240,181,74,.14);color-scheme:dark}*{box-sizing:border-box}html,body{margin:0}[hidden]{display:none!important}body{background:var(--bg);color:var(--fg);font-family:var(--f-body);font-size:14px;line-height:1.45}body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:10;background:var(--panel)}.wrap{padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));max-width:1500px;margin:0 auto}button,select,input,textarea{font:inherit;color:inherit}:focus-visible{outline:2px solid var(--accent);outline-offset:2px}html{scroll-behavior:smooth}@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}.mast{background:var(--panel);border-bottom:1px solid var(--line)}.mast .wrap{padding-block:18px 14px;display:flex;flex-wrap:wrap;gap:12px 24px;align-items:flex-end;justify-content:space-between}.brand h1{font-family:var(--f-display);font-weight:700;font-size:32px;letter-spacing:.01em;margin:0;line-height:1;text-wrap:balance}.brand h1 span{color:var(--accent)}.brand p{margin:6px 0 0;color:var(--muted);font-size:13px;max-width:62ch}.src{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.btn{border:1px solid var(--line);background:var(--panel-2);border-radius:6px;padding:7px 12px;cursor:pointer;font-size:13px;font-weight:500;white-space:nowrap}.btn:hover{border-color:var(--ink)}.btn:disabled{opacity:.55;cursor:default}.btn.primary{background:var(--ink);border-color:var(--ink);color:var(--panel)}.btn.primary:hover{filter:brightness(1.1)}.btn.sm{padding:4px 9px;font-size:12px}.srcinfo{font-size:12px;color:var(--muted);max-width:420px}.srcinfo b{color:var(--fg);font-weight:600}.bar{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--panel);border-bottom:1px solid var(--line);box-shadow:0 4px 12px -10px rgba(0,0,0,.35)}.bar .wrap{padding-block:10px;display:flex;flex-wrap:wrap;gap:8px 14px;align-items:end}.f{display:flex;flex-direction:column;gap:3px;min-width:0}.f>label,.f>.lab{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:600}.f select,.f input[type=date]{background:var(--panel-2);border:1px solid var(--line);border-radius:6px;padding:6px 8px;font-size:13px;max-width:190px}.stg{display:flex;border:1px solid var(--line);border-radius:6px;overflow:hidden}.stg label{display:flex;align-items:center;gap:5px;padding:5px 9px;font-size:13px;cursor:pointer;border-right:1px solid var(--line);background:var(--panel-2);user-select:none}.stg label:last-child{border-right:0}.stg input{accent-color:var(--ink);margin:0}.stg label:has(input:checked){background:var(--ink-soft)}.tog{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;padding-bottom:6px;user-select:none}.tog input{accent-color:var(--accent);width:15px;height:15px}.bar .spacer{flex:1}.chips{display:flex;flex-wrap:wrap;gap:6px;padding-bottom:4px}.chip{background:var(--accent-soft);color:var(--fg);border:1px solid transparent;border-radius:999px;padding:3px 10px;font-size:12px;cursor:pointer}.chip:hover{border-color:var(--accent)}.chip i{font-style:normal;color:var(--muted);margin-left:4px}.nav{display:flex;gap:4px;flex-wrap:wrap;padding-bottom:2px}.nav a{font-size:12px;color:var(--muted);text-decoration:none;padding:4px 8px;border-radius:5px}.nav a:hover{background:var(--ink-soft);color:var(--fg)}.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-block:18px}.kpi{background:var(--panel);padding:12px 14px;position:relative}.kpi .l{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:600;display:flex;align-items:center;gap:6px}.kpi .v{font-family:var(--f-num);font-size:22px;font-weight:500;margin-top:4px;font-variant-numeric:tabular-nums;white-space:nowrap}.kpi .s{font-size:12px;color:var(--muted);margin-top:2px}.kpi.hero{background:var(--accent-soft)}.kpi.hero .v{color:var(--accent)}.kpi .v.neg{color:var(--bad)}.kpi.off{opacity:.5}.dot{width:8px;height:8px;border-radius:50%;display:inline-block;flex:none}.dot.sold{background:var(--good)}.dot.allotted{background:var(--ink)}.dot.booked{background:var(--warn)}.dot.cancelled{background:var(--faint)}section{margin-bottom:22px;scroll-margin-top:130px}.sh{display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:8px}.sh h2{font-family:var(--f-display);font-weight:600;font-size:22px;letter-spacing:.02em;margin:0;text-transform:uppercase}.sh h3{font-family:var(--f-display);font-weight:600;font-size:17px;letter-spacing:.03em;margin:0;text-transform:uppercase;color:var(--ink)}.sh small{font-family:var(--f-body);font-size:12px;color:var(--muted);text-transform:none;letter-spacing:0;font-weight:400;margin-left:8px}.sh .tools{display:flex;gap:6px;align-items:center;flex-wrap:wrap}.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:18px}@media (max-width:480px){.grid3{grid-template-columns:1fr}}.grid3>section{min-width:0;margin-bottom:0}.card{background:var(--panel);border:1px solid var(--line);border-radius:10px;min-width:0}.scroll{overflow-x:auto}.empty{padding:18px;color:var(--muted);font-size:13px}.empty b{color:var(--fg)}table{border-collapse:collapse;width:100%;font-size:13px}th,td{padding:7px 10px;text-align:left;white-space:nowrap;border-bottom:1px solid var(--line-soft)}th{font-size:10.5px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);font-weight:600;background:var(--panel-2);position:sticky;top:0;cursor:pointer;user-select:none;z-index:1}th:hover{color:var(--fg)}th.sorted{color:var(--fg)}th .ar{display:inline-block;width:10px;color:var(--accent)}th.grpH{cursor:default;text-align:center;border-bottom:1px solid var(--line)}td.n,th.n{text-align:right;font-family:var(--f-num);font-variant-numeric:tabular-nums}th.n{font-family:var(--f-body)}td.nrm{color:var(--accent);font-weight:500}td.neg,td.nrm.neg{color:var(--bad)}td.up{color:var(--good)}td.z{color:var(--faint)}tbody tr.click{cursor:pointer}tbody tr.click:hover td{background:var(--ink-soft)}tr.tot td{font-weight:600;background:var(--panel-2);border-top:1px solid var(--line);border-bottom:none}tr.sub td{font-weight:600;background:var(--ink-soft)}tr.grp td{background:var(--panel-2);font-family:var(--f-display);font-size:15px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ink)}tr.flag td:first-child{box-shadow:inset 3px 0 0 var(--bad)}tr.cx td{color:var(--faint)}.dim{color:var(--muted);font-size:12px}.bar-cell{display:flex;align-items:center;gap:8px;justify-content:flex-end}.mini{width:56px;height:6px;background:var(--line-soft);border-radius:3px;position:relative;flex:none}.mini span{position:absolute;top:0;bottom:0;left:0;background:var(--ink);border-radius:3px}.mini span.neg{background:var(--bad)}.pill{display:inline-block;font-size:11px;padding:1px 7px;border-radius:999px;font-weight:500;white-space:nowrap}.pill.bad{background:var(--bad-soft);color:var(--bad)}.pill.warn{background:var(--warn-soft);color:var(--warn)}.pill.ok{background:var(--ink-soft);color:var(--ink)}.pill.sold{background:var(--good-soft);color:var(--good)}.pill.allotted{background:var(--ink-soft);color:var(--ink)}.pill.booked{background:var(--warn-soft);color:var(--warn)}.pill.cancelled{background:var(--line-soft);color:var(--faint)}.seg{display:inline-flex;border:1px solid var(--line);border-radius:6px;overflow:hidden;flex-wrap:wrap}.seg button{border:0;background:var(--panel);padding:5px 10px;font-size:12px;cursor:pointer;border-right:1px solid var(--line)}.seg button:last-child{border-right:0}.seg button[aria-pressed="true"]{background:var(--ink);color:var(--panel)}.search{background:var(--panel-2);border:1px solid var(--line);border-radius:6px;padding:5px 9px;font-size:13px;width:210px;max-width:100%}.act{display:flex;gap:4px;align-items:center}.act button{border:1px solid var(--line);background:var(--panel);border-radius:5px;padding:2px 8px;font-size:12px;cursor:pointer;white-space:nowrap}.act button:hover{border-color:var(--ink)}.act button.go{border-color:var(--ink);color:var(--ink);font-weight:500}.act button.del:hover,.act button.confirm{border-color:var(--bad);color:var(--bad)}.ck{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;padding:10px 14px;border-bottom:1px solid var(--line-soft)}.ck:last-child{border-bottom:0}.ck .t{font-weight:600}.ck .d{grid-column:2;color:var(--muted);font-size:12.5px;white-space:normal}.ck .d .btn{margin-top:6px}.settings{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;padding:14px}.settings label{font-size:12px;font-weight:600;display:block;margin-bottom:4px}.settings p{margin:0 0 6px;color:var(--muted);font-size:12px}.settings textarea{width:100%;min-height:180px;font-family:var(--f-num);font-size:12px;background:var(--panel-2);border:1px solid var(--line);border-radius:6px;padding:8px;resize:vertical}.modal{position:fixed;inset:0;z-index:40;background:rgba(8,16,32,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:calc(24px + env(safe-area-inset-top,0px)) max(12px,env(safe-area-inset-right,0px)) calc(24px + env(safe-area-inset-bottom,0px)) max(12px,env(safe-area-inset-left,0px))}.sheet{background:var(--panel);border:1px solid var(--line);border-radius:12px;width:100%;max-width:880px;box-shadow:0 20px 50px -20px rgba(0,0,0,.5)}.sheet-h{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 18px;border-bottom:1px solid var(--line);flex-wrap:wrap}.sheet-h h2{font-family:var(--f-display);font-size:24px;font-weight:600;margin:0;text-transform:uppercase;letter-spacing:.02em}.x{border:0;background:none;font-size:22px;line-height:1;cursor:pointer;color:var(--muted);padding:4px 8px;border-radius:6px}.x:hover{background:var(--ink-soft);color:var(--fg)}.stagebar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 18px;background:var(--panel-2);border-bottom:1px solid var(--line-soft)}.stagebar .lab{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:600}.hint{padding:10px 18px;background:var(--accent-soft);font-size:13px;border-bottom:1px solid var(--line-soft)}.fs{padding:14px 18px;border-bottom:1px solid var(--line-soft)}.fs h3{margin:0 0 10px;font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:600}.fg{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px 14px}.fi{display:flex;flex-direction:column;gap:4px;min-width:0}.fi label{font-size:12.5px;font-weight:500}.req{color:var(--accent)}.fi input,.fi select{background:var(--panel-2);border:1px solid var(--line);border-radius:6px;padding:7px 9px;font-size:14px;width:100%;min-width:0}.fi input.money{font-family:var(--f-num);text-align:right}.fi input.bad{border-color:var(--bad)}.fi small{color:var(--faint);font-size:11.5px}.fi.wide{grid-column:1/-1}.sugg{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px;font-size:12.5px;color:var(--muted)}.prev{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1px;background:var(--line);border-radius:8px;overflow:hidden;border:1px solid var(--line)}.prev div{background:var(--panel-2);padding:9px 12px}.prev .l{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:600}.prev .v{font-family:var(--f-num);font-size:17px;margin-top:2px;font-variant-numeric:tabular-nums;white-space:nowrap}.prev .v.nrm{color:var(--accent)}.prev .v.neg{color:var(--bad)}.prev .v.up{color:var(--good)}.hist{list-style:none;margin:0;padding:0;display:grid;gap:8px}.hist li{display:grid;grid-template-columns:auto 1fr auto;gap:2px 12px;align-items:baseline;font-size:12.5px;padding-bottom:8px;border-bottom:1px dashed var(--line-soft)}.hist li:last-child{border-bottom:0;padding-bottom:0}.hist .when{color:var(--muted);font-family:var(--f-num);font-size:12px}.hist .what{min-width:0}.hist .what div{color:var(--muted)}.hist .amt{font-family:var(--f-num);text-align:right}.sheet-f{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:flex-end;padding:14px 18px}.sheet-f .msg{flex:1;min-width:200px;font-size:13px;color:var(--bad)}@media (max-width:520px){.modal{padding-inline:0;padding-top:env(safe-area-inset-top,0px)}.sheet{border-radius:0;border-inline:0}}.drop{position:fixed;inset:0;background:rgba(10,20,40,.55);display:flex;align-items:center;justify-content:center;z-index:50}.drop div{background:var(--panel);border:2px dashed var(--accent);border-radius:14px;padding:40px 48px;font-family:var(--f-display);font-size:26px;font-weight:600}.toast{position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--fg);color:var(--bg);padding:9px 16px;border-radius:8px;font-size:13px;z-index:60;max-width:calc(100% - 32px)}.err{background:var(--bad-soft);color:var(--bad);border:1px solid var(--bad);border-radius:8px;padding:10px 14px;margin-top:14px;font-size:13px}footer{color:var(--faint);font-size:12px;padding-block:6px 30px}
<\/style>
<\/head>
<body>
<header class="mast">
  <div class="wrap">
    <div class="brand">
      <h1>Garud <span>NRM<\/span> Tracker<\/h1>
      <p>Net retained margin = (pre-GST deal price − purchase − POD) − Garud share of discount. Sold cars use actual figures; booked cars use the expected purchase price until allotment.<\/p>
    <\/div>
    <div class="src">
      <div class="srcinfo" id="srcinfo">—<\/div>
      <input type="file" id="file" accept=".xlsx,.xlsm,.xls,.csv" hidden>
      <button class="btn primary" id="addBtn">+ New booking<\/button>
      <button class="btn" id="upBtn">Upload NRM file<\/button>
      <a href="/NRM-Sample-Template.xlsx" download class="btn" style="text-decoration:none">📥 Sample Excel<\/a>
      <button class="btn" onclick="window.location.href='/sign-out'" style="background:var(--panel-2);border:1px solid var(--line);cursor:pointer">Sign out<\/button>
      <button class="btn" id="setBtn" aria-expanded="false">Name &amp; TL mapping<\/button>
    <\/div>
  <\/div>
<\/header>

<div class="bar">
  <div class="wrap">
    <div class="f"><span class="lab">Stage<\/span>
      <div class="stg" role="group" aria-label="Deal stages to include">
        <label><input type="checkbox" id="sSold" checked><span class="dot sold"><\/span>Sold<\/label>
        <label><input type="checkbox" id="sAllot" checked><span class="dot allotted"><\/span>Allotted<\/label>
        <label><input type="checkbox" id="sBook" checked><span class="dot booked"><\/span>Booked<\/label>
      <\/div>
    <\/div>
    <div class="f"><label for="fLoc">Branch<\/label><select id="fLoc"><\/select><\/div>
    <div class="f"><label for="fEx">Executive<\/label><select id="fEx"><\/select><\/div>
    <div class="f"><label for="fMk">Product<\/label><select id="fMk"><\/select><\/div>
    <div class="spacer"><\/div>
    <nav class="nav" aria-label="Sections">
      <a href="#s-pipe">Pipeline<\/a><a href="#s-sum">Summary<\/a><a href="#s-ex">Executives<\/a><a href="#s-cars">All deals<\/a>
    <\/nav>
  <\/div>
<\/div>

<main class="wrap">
  <div class="kpis" id="kpis"><\/div>

  <section id="s-pipe">
    <div class="sh"><h2>Bookings pipeline<\/h2><\/div>
    <div class="card scroll" id="tPipe"><\/div>
  <\/section>

  <div class="grid3" id="s-sum">
    <section><div class="sh"><h2>Branch<\/h2><\/div><div class="card scroll" id="tLoc"><\/div><\/section>
    <section><div class="sh"><h2>Executive<\/h2><\/div><div class="card scroll" id="tEx"><\/div><\/section>
    <section><div class="sh"><h2>Product<\/h2><\/div><div class="card scroll" id="tMk"><\/div><\/section>
  <\/div>

  <section id="s-cars">
    <div class="sh"><h2>All deals<\/h2><\/div>
    <div class="card scroll" id="tCars" style="max-height:620px;overflow:auto"><\/div>
  <\/section>
<\/main>
<footer class="wrap">Upload the Excel file with the NRM sheet; the tool reads the sheet named "NRM".<\/footer>

<div class="modal" id="carModal" hidden role="dialog" aria-modal="true" aria-labelledby="carTitle">
  <form class="sheet" id="carForm" novalidate autocomplete="off">
    <div class="sheet-h"><h2 id="carTitle">New booking<\/h2><button type="button" class="x" id="carX" aria-label="Close">×<\/button><\/div>
    <div class="stagebar">
      <span class="lab">Stage<\/span>
      <div class="seg" id="cStage" role="radiogroup" aria-label="Deal stage">
        <button type="button" data-v="booked" role="radio">Booked<\/button>
        <button type="button" data-v="allotted" role="radio">Allotted<\/button>
        <button type="button" data-v="sold" role="radio">Sold<\/button>
        <button type="button" data-v="cancelled" role="radio">Cancelled<\/button>
      <\/div>
    <\/div>
    <div class="fs">
      <h3>Details<\/h3>
      <div class="fg">
        <div class="fi"><label for="cBook">Order no.<\/label><input id="cBook" placeholder="SO-1234"><\/div>
        <div class="fi"><label for="cCust">Customer<\/label><input id="cCust" placeholder="Name"><\/div>
        <div class="fi"><label for="cLoc">Branch <span class="req">*<\/span><\/label><input id="cLoc" list="dlLoc" placeholder="DABRI"><\/div>
        <div class="fi"><label for="cEx">Executive <span class="req">*<\/span><\/label><input id="cEx" list="dlEx"><\/div>
        <div class="fi"><label for="cMk">Product <span class="req">*<\/span><\/label><input id="cMk" list="dlMk"><\/div>
        <div class="fi"><label for="cSale">Deal price <span class="req">*<\/span><\/label><input id="cSale" class="money" placeholder="0"><\/div>
        <div class="fi"><label for="cPur">Purchase price <span class="req">*<\/span><\/label><input id="cPur" class="money" placeholder="0"><\/div>
        <div class="fi"><label for="cPod">POD<\/label><input id="cPod" class="money" placeholder="0"><\/div>
        <div class="fi"><label for="cGs">Garud share<\/label><input id="cGs" class="money" placeholder="0"><\/div>
        <div class="fi"><label for="cOth">Other income<\/label><input id="cOth" class="money" placeholder="0"><\/div>
      <\/div>
    <\/div>
    <div class="sheet-f">
      <button type="button" class="btn" id="cCancel">Close<\/button>
      <button type="submit" class="btn primary" id="cSave">Save<\/button>
    <\/div>
  <\/form>
<\/div>
<datalist id="dlLoc"><\/datalist><datalist id="dlEx"><\/datalist><datalist id="dlMk"><\/datalist>

<div class="toast" id="toast" hidden><\/div>

<script>
let appData = {cars:[], currentStage:'booked', filters:{sold:true, allotted:true, booked:true}};

function init(){loadData(); setupEventListeners(); render();}
function loadData(){const stored=localStorage.getItem('nrmData'); if(stored) try{appData.cars=JSON.parse(stored);}catch(e){appData.cars=[];} else appData.cars=[];}
function saveData(){localStorage.setItem('nrmData', JSON.stringify(appData.cars));}
function setupEventListeners(){
  document.getElementById('addBtn').onclick=openModal; 
  document.getElementById('carX').onclick=closeModal; 
  document.getElementById('cCancel').onclick=closeModal; 
  document.getElementById('cSave').onclick=saveDeal;
  document.getElementById('upBtn').onclick=()=>document.getElementById('file').click();
  document.getElementById('file').onchange=uploadFile;
  document.getElementById('setBtn').onclick=()=>{alert('Settings panel disabled');};
  document.getElementById('sSold').onchange=updateFilters;
  document.getElementById('sAllot').onchange=updateFilters;
  document.getElementById('sBook').onchange=updateFilters;
  document.querySelectorAll('#cStage button').forEach(btn=>{btn.onclick=(e)=>{e.preventDefault(); appData.currentStage=btn.dataset.v; document.querySelectorAll('#cStage button').forEach(b=>b.setAttribute('aria-pressed','false')); btn.setAttribute('aria-pressed','true');};});
}
function openModal(){appData.currentStage='booked'; document.querySelectorAll('#cStage button').forEach((b,i)=>b.setAttribute('aria-pressed', i===0?'true':'false')); document.getElementById('carModal').hidden=false; document.getElementById('carForm').reset();}
function closeModal(){document.getElementById('carModal').hidden=true;}
function saveDeal(e){
  if(e) e.preventDefault();
  const newCar=[appData.cars.length, null, new Date().toISOString().split('T')[0], null, document.getElementById('cBook').value||'', '', document.getElementById('cCust').value||'', document.getElementById('cCust').value||'', '', '', document.getElementById('cLoc').value||'', document.getElementById('cEx').value||'', '', document.getElementById('cMk').value||'', 1, '', parseFloat(document.getElementById('cSale').value)||0, parseFloat(document.getElementById('cPur').value)||0, parseFloat(document.getElementById('cPod').value)||0, 0, parseFloat(document.getElementById('cGs').value)||0, 0, 0, 0, 0, 0, 0, 0, 0, 0, parseFloat(document.getElementById('cGs').value)||0, parseFloat(document.getElementById('cGs').value)||0, 0, 0, 0, 0, 0, 0, 0, 0, 0, parseFloat(document.getElementById('cGs').value)||0, (parseFloat(document.getElementById('cSale').value)||0)-(parseFloat(document.getElementById('cPur').value)||0)-(parseFloat(document.getElementById('cPod').value)||0)-(parseFloat(document.getElementById('cGs').value)||0), 0.5, parseFloat(document.getElementById('cOth').value)||0, 0, 0, 0, 0, 0, parseFloat(document.getElementById('cOth').value)||0, (parseFloat(document.getElementById('cSale').value)||0)-(parseFloat(document.getElementById('cPur').value)||0)-(parseFloat(document.getElementById('cPod').value)||0)-(parseFloat(document.getElementById('cGs').value)||0)+(parseFloat(document.getElementById('cOth').value)||0), new Date().toISOString().split('T')[0], ''];
  appData.cars.push(newCar);
  saveData();
  alert('✓ Booking saved!');
  render();
  closeModal();
}
function uploadFile(e){
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=(evt)=>{
    try{
      const data=new Uint8Array(evt.target.result);
      const workbook=XLSX.read(data, {type:'array'});
      const sheet=workbook.Sheets['NRM']||workbook.Sheets[Object.keys(workbook.Sheets)[0]];
      const rows=XLSX.utils.sheet_to_json(sheet);
      rows.forEach(row=>{appData.cars.push(Object.values(row));});
      saveData();
      alert('✓ '+rows.length+' entries uploaded!');
      render();
    }catch(err){alert('Error: '+err.message);}
  };
  reader.readAsArrayBuffer(file);
}
function updateFilters(){appData.filters.sold=document.getElementById('sSold').checked; appData.filters.allotted=document.getElementById('sAllot').checked; appData.filters.booked=document.getElementById('sBook').checked; render();}
function render(){updateDropdowns(); renderKpis(); renderAllTables(); updateSrcinfo();}
function updateDropdowns(){
  const locs=[...new Set(appData.cars.map(c=>c[10]).filter(Boolean))].sort();
  const exs=[...new Set(appData.cars.map(c=>c[11]).filter(Boolean))].sort();
  const mks=[...new Set(appData.cars.map(c=>c[13]).filter(Boolean))].sort();
  document.getElementById('fLoc').innerHTML='<option>All<\/option>'+locs.map(v=>'<option>'+v+'<\/option>').join('');
  document.getElementById('fEx').innerHTML='<option>All<\/option>'+exs.map(v=>'<option>'+v+'<\/option>').join('');
  document.getElementById('fMk').innerHTML='<option>All<\/option>'+mks.map(v=>'<option>'+v+'<\/option>').join('');
  document.getElementById('dlLoc').innerHTML=locs.map(l=>'<option>'+l+'<\/option>').join('');
  document.getElementById('dlEx').innerHTML=exs.map(e=>'<option>'+e+'<\/option>').join('');
  document.getElementById('dlMk').innerHTML=mks.map(m=>'<option>'+m+'<\/option>').join('');
}
function renderKpis(){
  const total=appData.cars.reduce((s,c)=>s+(parseFloat(c[46])||0), 0);
  const count=appData.cars.length;
  document.getElementById('kpis').innerHTML=`<div class="kpi hero"><div class="l">TOTAL NRM<\/div><div class="v">₹\${(total/100000).toFixed(2)} L<\/div><\/div><div class="kpi"><div class="l">ENTRIES<\/div><div class="v">\${count}<\/div><\/div><div class="kpi"><div class="l">AVG PER CAR<\/div><div class="v">₹\${count?(total/count).toFixed(0):0}<\/div><\/div>`;
}
function renderAllTables(){
  renderPipeline(); renderAllDeals(); renderSummaryTables();
}
function renderPipeline(){
  const head=['Booking', 'Customer', 'Branch', 'Executive', 'Vehicle', 'NRM'];
  let html='<table><thead><tr>'+head.map(h=>'<th>'+h+'<\/th>').join('')+'<\/tr><\/thead><tbody>';
  appData.cars.forEach(car=>{
    const nrm=parseFloat(car[46])||0;
    html+='<tr><td>'+(car[4]||'—')+'<\/td><td>'+(car[7]||'—')+'<\/td><td>'+(car[10]||'—')+'<\/td><td>'+(car[11]||'—')+'<\/td><td>'+(car[13]||'—')+'<\/td><td class="nrm">₹'+(nrm/100000).toFixed(2)+'L<\/td><\/tr>';
  });
  html+='<\/tbody><\/table>';
  document.getElementById('tPipe').innerHTML=html||'<div class="empty">No entries<\/div>';
}
function renderAllDeals(){
  const head=['Invoice', 'Customer', 'Branch', 'Executive', 'Vehicle', 'Sale Price', 'NRM'];
  let html='<table><thead><tr>'+head.map(h=>'<th>'+h+'<\/th>').join('')+'<\/tr><\/thead><tbody>';
  appData.cars.forEach(car=>{
    const sale=parseFloat(car[16])||0;
    const nrm=parseFloat(car[46])||0;
    html+='<tr><td>'+(car[5]||'—')+'<\/td><td>'+(car[7]||'—')+'<\/td><td>'+(car[10]||'—')+'<\/td><td>'+(car[11]||'—')+'<\/td><td>'+(car[13]||'—')+'<\/td><td class="n">₹'+(sale/100000).toFixed(2)+'L<\/td><td class="nrm">₹'+(nrm/100000).toFixed(2)+'L<\/td><\/tr>';
  });
  html+='<\/tbody><\/table>';
  document.getElementById('tCars').innerHTML=html||'<div class="empty">No deals<\/div>';
}
function renderSummaryTables(){
  const byLoc={}; appData.cars.forEach(car=>{const loc=car[10]||'Unknown'; if(!byLoc[loc]) byLoc[loc]={nrm:0, count:0}; byLoc[loc].nrm+=parseFloat(car[46])||0; byLoc[loc].count++;});
  let locHtml='<table><thead><tr><th>Branch<\/th><th class="n">NRM<\/th><th class="n">Count<\/th><\/tr><\/thead><tbody>';
  Object.entries(byLoc).forEach(([loc, data])=>{locHtml+='<tr><td>'+loc+'<\/td><td class="nrm n">₹'+(data.nrm/100000).toFixed(2)+'L<\/td><td class="n">'+data.count+'<\/td><\/tr>';});
  locHtml+='<\/tbody><\/table>';
  document.getElementById('tLoc').innerHTML=locHtml||'<div class="empty">No data<\/div>';
  const byEx={}; appData.cars.forEach(car=>{const ex=car[11]||'Unknown'; if(!byEx[ex]) byEx[ex]={nrm:0, count:0}; byEx[ex].nrm+=parseFloat(car[46])||0; byEx[ex].count++;});
  let exHtml='<table><thead><tr><th>Executive<\/th><th class="n">NRM<\/th><th class="n">Count<\/th><\/tr><\/thead><tbody>';
  Object.entries(byEx).forEach(([ex, data])=>{exHtml+='<tr><td>'+ex+'<\/td><td class="nrm n">₹'+(data.nrm/100000).toFixed(2)+'L<\/td><td class="n">'+data.count+'<\/td><\/tr>';});
  exHtml+='<\/tbody><\/table>';
  document.getElementById('tEx').innerHTML=exHtml||'<div class="empty">No data<\/div>';
  const byMk={}; appData.cars.forEach(car=>{const mk=car[13]||'Unknown'; if(!byMk[mk]) byMk[mk]={nrm:0, count:0}; byMk[mk].nrm+=parseFloat(car[46])||0; byMk[mk].count++;});
  let mkHtml='<table><thead><tr><th>Product<\/th><th class="n">NRM<\/th><th class="n">Count<\/th><\/tr><\/thead><tbody>';
  Object.entries(byMk).forEach(([mk, data])=>{mkHtml+='<tr><td>'+mk+'<\/td><td class="nrm n">₹'+(data.nrm/100000).toFixed(2)+'L<\/td><td class="n">'+data.count+'<\/td><\/tr>';});
  mkHtml+='<\/tbody><\/table>';
  document.getElementById('tMk').innerHTML=mkHtml||'<div class="empty">No data<\/div>';
}
function updateSrcinfo(){document.getElementById('srcinfo').innerText=appData.cars.length+' entries';}
document.addEventListener('DOMContentLoaded', init);
<\/script>
<\/body>
<\/html>`);
