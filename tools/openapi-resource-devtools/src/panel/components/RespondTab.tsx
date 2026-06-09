import { useState, useEffect } from 'preact/hooks';
import type { MockEntry } from '../../shared/types';

interface Props {
  entry: MockEntry;
  onAction: (key: string, action: string, extra?: Record<string, unknown>) => void;
}

export function RespondTab({ entry, onAction }: Props) {
  const [json, setJson]       = useState('');
  const [delay, setDelay]     = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Populate editor when the selected key changes (not on every state update)
  useEffect(() => {
    if (entry.state.value !== undefined) {
      try {
        setJson(JSON.stringify(entry.state.value, null, 2));
      } catch {
        setJson('');
      }
    } else {
      setJson('');
    }
    setJsonError(null);
  }, [entry.key]);

  function handleJsonInput(value: string) {
    setJson(value);
    if (!value.trim()) { setJsonError(null); return; }
    try {
      JSON.parse(value);
      setJsonError(null);
    } catch (e) {
      setJsonError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  }

  function parsedValue(): unknown {
    if (!json.trim()) return undefined;
    return JSON.parse(json); // caller guards with !jsonError
  }

  function handleResolve() {
    if (jsonError) return;
    const value = parsedValue();
    const ms = parseInt(delay, 10);
    if (!isNaN(ms) && ms > 0) {
      onAction(entry.key, 'resolveAfter', { delayMs: ms, value });
    } else {
      onAction(entry.key, 'resolve', { value });
    }
  }

  function handleFail() {
    let error: unknown = 'Error';
    if (json.trim() && !jsonError) {
      try { error = parsedValue(); } catch { /* keep default */ }
    }
    onAction(entry.key, 'fail', { value: error });
  }

  return (
    <div class="respond-tab">
      <div class="respond-header">
        <span class="respond-title" title={entry.key}>{entry.key}</span>
      </div>
      <div class="respond-body">
        <div>
          <label class="field-label">Value (JSON)</label>
          <textarea
            class={`json-editor${jsonError ? ' has-error' : ''}`}
            value={json}
            onInput={(e) => handleJsonInput((e.target as HTMLTextAreaElement).value)}
            placeholder="null"
            spellcheck={false}
            rows={8}
          />
          {jsonError && <div class="json-error">{jsonError}</div>}
        </div>

        <div class="delay-row">
          <label class="field-label" style="margin:0">Delay</label>
          <input
            class="delay-input"
            type="number"
            min="0"
            placeholder="0"
            value={delay}
            onInput={(e) => setDelay((e.target as HTMLInputElement).value)}
          />
          <span class="delay-unit">ms</span>
        </div>

        <div class="action-row">
          <button class="btn-primary" onClick={handleResolve} disabled={!!jsonError}>
            Resolve
          </button>
          <button class="btn-secondary" onClick={() => onAction(entry.key, 'setLoading')}>
            Loading
          </button>
          <button class="btn-danger" onClick={handleFail}>
            Fail
          </button>
          <button class="btn-secondary" onClick={() => onAction(entry.key, 'reset')}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
