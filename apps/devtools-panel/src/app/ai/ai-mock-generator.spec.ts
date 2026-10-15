import { vi } from 'vitest';
import { generateMock } from './ai-mock-generator.token';
import { DEFAULT_AI_SETTINGS } from './ai-types';
import { extractJson, isSelfContained, schemaForPrompt } from './json-utils';

const schema = {
  type: 'object',
  required: ['id', 'name'],
  properties: { id: { type: 'integer' }, name: { type: 'string' } },
};

describe('generateMock', () => {
  it('feeds validation errors back and returns the corrected value', async () => {
    const call = vi
      .fn()
      .mockResolvedValueOnce('```json\n{"id":"x","name":"Rex"}\n```')
      .mockResolvedValueOnce('{"id":7,"name":"Rex"}');

    const result = await generateMock(
      { schema, prompt: 'a dog' },
      DEFAULT_AI_SETTINGS,
      call,
    );

    expect(result).toEqual({
      value: { id: 7, name: 'Rex' },
      errors: [],
      attempts: 2,
    });
    const repair = call.mock.calls[1][0].messages;
    expect(repair).toHaveLength(3);
    expect(repair[2].content).toContain('/id');
  });

  it('returns the last value with its errors once repairs run out', async () => {
    const call = vi.fn().mockResolvedValue('{"id":"x"}');
    const result = await generateMock(
      { schema, prompt: '', maxRepairs: 1 },
      DEFAULT_AI_SETTINGS,
      call,
    );
    expect(call).toHaveBeenCalledTimes(2);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.value).toEqual({ id: 'x' });
  });

  it('throws when the model never returns JSON', async () => {
    const call = vi.fn().mockResolvedValue('sorry, no');
    await expect(
      generateMock(
        { schema, prompt: '', maxRepairs: 0 },
        DEFAULT_AI_SETTINGS,
        call,
      ),
    ).rejects.toThrow(/not valid JSON/);
  });

  it('only sends the example when given one', async () => {
    const call = vi.fn().mockResolvedValue('{"id":1,"name":"a"}');
    await generateMock({ schema, prompt: 'x' }, DEFAULT_AI_SETTINGS, call);
    expect(call.mock.calls[0][0].messages[0].content).not.toContain(
      'style reference',
    );
    await generateMock(
      { schema, prompt: 'x', example: { id: 9 } },
      DEFAULT_AI_SETTINGS,
      call,
    );
    expect(call.mock.calls[1][0].messages[0].content).toContain(
      'style reference',
    );
  });
});

describe('json-utils', () => {
  it('extracts JSON from prose', () => {
    expect(extractJson('Here you go: {"a":1} enjoy')).toEqual({ a: 1 });
  });

  it('detects $ref', () => {
    expect(isSelfContained(schema)).toBe(true);
    expect(
      isSelfContained({ properties: { a: { $ref: '#/definitions/A' } } }),
    ).toBe(false);
  });

  it('cuts depth to fit the budget', () => {
    const deep = { a: { b: { c: { d: { e: 'x'.repeat(100) } } } } };
    expect(schemaForPrompt(deep, 40).length).toBeLessThan(
      JSON.stringify(deep).length,
    );
  });
});
