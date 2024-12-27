export const isFetchResponse = (value: unknown): value is Response =>
  !!value && typeof value === 'object' && 'status' in value;
