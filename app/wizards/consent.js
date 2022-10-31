import { wizard } from 'nhsuk-prototype-rig'

export function consentWizard (req) {
  const journey = {
    '/start': {},
    '/consent/vaccination': {},
    '/consent/school': {},
    '/consent/child': {},
    '/consent/parent-guardian': {},
    '/consent/consent': {},
    '/consent/history': {},
    '/consent/check-answers': {},
    '/consent/confirmation': {},
    '/': {}
  }

  return wizard(journey, req)
}
