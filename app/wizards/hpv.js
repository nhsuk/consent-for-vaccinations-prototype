import { wizard } from 'nhsuk-prototype-rig'

export function hpvWizard (req) {
  const consented = req.session.data.consent !== 'No'

  const journey = {
    '/hpv/start': {},
    '/hpv/consent/school': {},
    '/hpv/consent/parent-guardian': {},
    '/hpv/consent/child': {},
    '/hpv/consent/child-dob': {},
    '/hpv/consent/child-gp': {},
    '/hpv/consent/child-nhs': {},
    '/hpv/consent/consent': {
      '/hpv/consent/health-questions': consented
    },
    '/hpv/consent/no-consent-given': {
      '/hpv/consent/health-questions-mmr': true
    },
    '/hpv/consent/health-questions': {},
    '/hpv/consent/health-allergy': {},
    '/hpv/consent/health-existing-conditions': {},
    '/hpv/consent/health-regular-medication': {},
    '/hpv/consent/health-anything-else': {},
    '/hpv/consent/health-questions-mmr': {},
    '/hpv/consent/health-mmr': {
      '/hpv/check-answers': {
        data: 'health.had-mmr',
        excludedValue: 'No'
      }
    },
    '/hpv/consent/mmr-consent': {},
    '/hpv/check-answers': {
      '/hpv/consent/confirmation-no-consent': !consented
    },
    '/hpv/consent/confirmation': {},
    '/': {}
  }

  return wizard(journey, req)
}
