export type ListenerEvents = {
  'get-flow-schema': (ASchema: unknown, done?: () => void) => void
  'set-field-data': (AData: unknown, done?: () => void) => void
  'create-flow': (AFlow: unknown, done?: () => void) => void
}

export type EmitterEvents = {
  'get-flow-schema': (data: { flowSchemaId: string }, done?: () => void) => void
  'set-field-data': (
    data: { value: unknown; path: string },
    done?: () => void,
  ) => void
  'create-flow': (data: void, done?: () => void) => void
}
