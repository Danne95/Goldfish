export function nullable(value) {
  return value === '' || value === undefined ? null : value
}

export function nullableNumber(value) {
  if (value === '' || value === undefined || value === null) return null
  return Number(value)
}

export function cleanRecord(record) {
  return Object.fromEntries(Object.entries(record).filter(([, value]) => value !== undefined))
}

export function ensureData({ data, error }) {
  if (error) throw error
  return data
}

export function hasField(record, field) {
  return Object.prototype.hasOwnProperty.call(record, field)
}
