import { wizard } from 'nhsuk-prototype-rig'

export function consentWizard (req) {
  const journey = {
    '/start': {},
    '/consent/school': {},
    '/consent/parent-guardian': {},
    '/consent/child': {},
    '/consent/child-dob': {},
    '/consent/child-gp': {},
    '/consent/child-nhs': {},
    '/consent/consent': {
      '/consent/no-consent-given': {
        data: 'consent',
        value: 'No'
      }
    },
    '/consent/health-questions': {},
    '/consent/health-immune-system': {},
    '/consent/health-household-immune-system': {},
    '/consent/health-asthma': {},
    '/consent/health-allergy': {},
    '/consent/health-aspirin': {},
    '/consent/check-answers': {},
    '/consent/confirmation': {},
    '/': {}
  }

  return wizard(journey, req)
}
