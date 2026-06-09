import type { MockEntry } from '../../shared/types';

const STATUS_CLASS: Record<string, string> = {
  idle:      'status-idle',
  loading:   'status-loading',
  reloading: 'status-loading',
  resolved:  'status-resolved',
  error:     'status-error',
  local:     'status-local',
};

function ago(ts: number): string {
  const ms = Date.now() - ts;
  if (ms < 1000) return `${ms}ms ago`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s ago`;
  return `${Math.floor(ms / 60_000)}m ago`;
}

interface Props {
  entries: MockEntry[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  onAction: (key: string, action: string, extra?: Record<string, unknown>) => void;
}

export function MockTable({ entries, selectedKey, onSelect, onAction }: Props) {
  if (entries.length === 0) {
    return (
      <div class="empty-state">
        <p>No mocks registered yet.</p>
        <p>
          Make sure your Angular app calls <code>provideMockResourceBus()</code>
          {' '}and at least one component with <code>provideMockResource()</code> has rendered.
        </p>
      </div>
    );
  }

  return (
    <div class="mock-table-wrap">
      <table class="mock-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Status</th>
            <th>Last event</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.key}
              class={`mock-row${selectedKey === entry.key ? ' selected' : ''}`}
              onClick={() => onSelect(entry.key)}
            >
              <td class="key-cell" title={entry.key}>{entry.key}</td>
              <td>
                <span class={`status-badge ${STATUS_CLASS[entry.state.status] ?? ''}`}>
                  {entry.state.status}
                </span>
              </td>
              <td class="event-cell">
                {entry.lastEventType && entry.lastEventTs
                  ? `${entry.lastEventType} · ${ago(entry.lastEventTs)}`
                  : '—'}
              </td>
              <td class="actions-cell" onClick={(e) => e.stopPropagation()}>
                <button
                  class="action-btn"
                  title="Set loading"
                  onClick={() => onAction(entry.key, 'setLoading')}
                >⏳</button>
                <button
                  class="action-btn"
                  title="Fail"
                  onClick={() => onAction(entry.key, 'fail', { value: 'Error' })}
                >✗</button>
                <button
                  class="action-btn"
                  title="Reset to idle"
                  onClick={() => onAction(entry.key, 'reset')}
                >↺</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
