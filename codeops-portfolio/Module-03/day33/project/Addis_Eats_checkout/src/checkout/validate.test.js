import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { NOTES_LIMIT, normalizePhone, validate } from './validate.js'

const valid = { name: 'Abel', phone: '0911223344', area: 'Bole', notes: '' }

describe('validate', () => {
  it('returns an empty object for a valid form', () => {
    assert.deepEqual(validate(valid), {})
  })

  it('asks for a name', () => {
    assert.ok(validate({ ...valid, name: '   ' }).name)
  })

  it('accepts 09 and +2519 numbers', () => {
    assert.equal(validate({ ...valid, phone: '0911223344' }).phone, undefined)
    assert.equal(validate({ ...valid, phone: '+251911223344' }).phone, undefined)
  })

  it('ignores spaces and dashes in the phone number', () => {
    assert.equal(validate({ ...valid, phone: '091 122-3344' }).phone, undefined)
    assert.equal(normalizePhone('+251 91 122 3344'), '+251911223344')
  })

  it('rejects numbers that are not TeleBirr shaped', () => {
    assert.ok(validate({ ...valid, phone: '0711223344' }).phone)
    assert.ok(validate({ ...valid, phone: '091122334' }).phone)
  })

  it('only allows the four delivery areas', () => {
    assert.ok(validate({ ...valid, area: 'Mexico' }).area)
    assert.equal(validate({ ...valid, area: 'Piassa' }).area, undefined)
  })

  it('limits the notes length', () => {
    assert.equal(validate({ ...valid, notes: 'a'.repeat(NOTES_LIMIT) }).notes, undefined)
    assert.ok(validate({ ...valid, notes: 'a'.repeat(NOTES_LIMIT + 1) }).notes)
  })
})
