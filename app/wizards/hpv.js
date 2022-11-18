import { wizard } from 'nhsuk-prototype-rig'

export function hpvWizard (req) {
  const journey = {
    '/hpv/start': {},
    '/hpv/consent/school': {},
    '/hpv/consent/parent-guardian': {},
    '/hpv/consent/child': {},
    '/hpv/consent/child-dob': {},
    '/hpv/consent/child-gp': {},
    '/hpv/consent/child-nhs': {},
    '/hpv/consent/consent': {
      '/hpv/consent/no-consent-given': {
        data: 'consent',
        value: 'No'
      }
    },
    '/hpv/consent/health-questions': {},
    '/hpv/consent/health-allergy': {},
    '/hpv/consent/health-existing-conditions': {},
    '/hpv/consent/health-regular-medication': {},
    '/hpv/consent/health-anything-else': {},
    '/hpv/check-answers': {},
    '/hpv/consent/confirmation': {},
    '/': {}
  }

  return wizard(journey, req)
}
