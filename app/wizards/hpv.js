import { wizard } from 'nhsuk-prototype-rig'
import { checkForContraindications } from './check-for-contraindications.js'

export function hpvWizard (req) {
  const consented = req.session.data.consent !== 'No'
  const anyContraindications = checkForContraindications(req.session.data.health)

  const journey = {
    '/hpv/start': {},
    '/hpv/consent/child': {},
    '/hpv/consent/child-dob': {},
    '/hpv/consent/school': {},
    '/hpv/consent/parent-guardian': {},
    '/hpv/consent/consent': {
      '/hpv/consent/child-gp': consented
    },
    '/hpv/consent/no-consent-given': {
      '/hpv/consent/check-answers': true
    },
    '/hpv/consent/child-gp': {},
    '/hpv/consent/address': {},
    '/hpv/consent/health-allergy': {},
    '/hpv/consent/health-existing-conditions': {},
    '/hpv/consent/health-regular-medication': {},
    '/hpv/consent/health-anything-else': {},
    '/hpv/consent/check-answers': {
      '/hpv/consent/confirmation-no-consent': !consented,
      '/hpv/consent/confirmation-contraindications': anyContraindications
    },
    '/hpv/consent/confirmation': {},
    '/': {}
  }

  return wizard(journey, req)
}
