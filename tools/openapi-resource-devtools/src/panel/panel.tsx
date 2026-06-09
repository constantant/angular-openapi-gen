import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import type { MockEntry, MockState, PanelMessage } from '../shared/types';
import { MockTable } from './components/MockTable';
import { RespondTab } from './components/RespondTab';

function applyEvent(
  entry: MockEntry,
  ev: { type: string; value?: unknown; error?: unknown; ts: number },
): MockEntry {
  const next: MockEntry = { ...entry, lastEventType: ev.type, lastEventTs: ev.ts };
  switch (ev.type) {
    case 'resolve':
      next.state = { ...entry.state, status: 'resolved', value: ev.value };
      break;
    case 'loading':
      next.state = { ...entry.state, status: 'loading' };
      break;
    case 'reloading':
      next.state = { ...entry.state, status: 'reloading' };
      break;
    case 'error':
      next.state = { ...entry.state, status: 'error', error: ev.error };
      break;
    case 'reset':
      next.state = { status: 'idle', value: undefined, error: undefined, progress: undefined };
      break;
  }
  return next;
}

const BLANK_STATE: MockState = { status: 'idle', value: undefined, error: undefined, progress: undefined };

function blankEntry(key: string): MockEntry {
  return { key, state: BLANK_STATE, lastEventType: null, lastEventTs: null };
}

function App() {
  const [mocks, setMocks]           = useState<Map<string, MockEntry>>(new Map());
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [filter, setFilter]         = useState('');
  const [port, setPort]             = useState<chrome.runtime.Port | null>(null);

  useEffect(() => {
    const tabId = chrome.devtools.inspectedWindow.tabId;
    const p = chrome.runtime.connect({ name: `devtools-${tabId}` });

    p.onMessage.addListener((msg: PanelMessage) => {
      setMocks((prev) => {
        const next = new Map(prev);
        if (msg.type === 'mock-keys') {
          for (const key of msg.keys) {
            if (!next.has(key)) next.set(key, blankEntry(key));
          }
        } else if (msg.type === 'mock-state') {
          const existing = next.get(msg.key) ?? blankEntry(msg.key);
          next.set(msg.key, { ...existing, state: msg.state });
        } else if (msg.type === 'mock-event') {
          const existing = next.get(msg.key);
          if (existing) next.set(msg.key, applyEvent(existing, msg.event));
        }
        return next;
      });
    });

    p.onDisconnect.addListener(() => setPort(null));
    setPort(p);
    p.postMessage({ type: 'get-keys' });

    return () => p.disconnect();
  }, []);

  function sendControl(key: string, action: string, extra?: Record<string, unknown>) {
    port?.postMessage({ type: 'control', detail: { key, action, ...extra } });
    // Ask for fresh state shortly after the action lands
    setTimeout(() => port?.postMessage({ type: 'get-state', key }), 120);
  }

  const filteredEntries = [...mocks.values()].filter(
    (e) => !filter || e.key.toLowerCase().includes(filter.toLowerCase()),
  );

  const selectedEntry = selectedKey ? (mocks.get(selectedKey) ?? null) : null;

  return (
    <div class="panel">
      <div class="toolbar">
        <span class="mock-count">
          {mocks.size === 0 ? 'No mocks' : `${mocks.size} mock${mocks.size !== 1 ? 's' : ''}`}
        </span>
        <button class="btn-secondary" onClick={() => port?.postMessage({ type: 'get-keys' })}>
          ↺ Refresh
        </button>
        <button
          class="btn-secondary"
          onClick={() => {
            setMocks(new Map());
            setSelectedKey(null);
          }}
        >
          Clear
        </button>
        <button
          class="btn-secondary"
          onClick={() => mocks.forEach((_, key) => sendControl(key, 'reset'))}
        >
          Reset All
        </button>
        <input
          class="filter-input"
          type="text"
          placeholder="Filter by key…"
          value={filter}
          onInput={(e) => setFilter((e.target as HTMLInputElement).value)}
        />
      </div>

      <div class="main">
        <MockTable
          entries={filteredEntries}
          selectedKey={selectedKey}
          onSelect={setSelectedKey}
          onAction={sendControl}
        />
        {selectedEntry && (
          <RespondTab entry={selectedEntry} onAction={sendControl} />
        )}
      </div>
    </div>
  );
}

render(<App />, document.getElementById('app')!);
