import { wizard } from 'nhsuk-prototype-rig'
import { checkForContraindications } from './check-for-contraindications.js'

export function dptWizard (req) {
  const data = req.session.data
  const noConsent = data['3-in-1-consent'] === 'No' && data['men-acwy-consent'] === 'No'
  const anyContraindications = checkForContraindications(data.health)

  const journey = {
    '/dpt/start': {},
    '/dpt/consent/child': {},
    '/dpt/consent/child-dob': {},
    '/dpt/consent/school': {},
    '/dpt/consent/parent-guardian': {},
    '/dpt/3-in-1-consent': {
      '/dpt/men-acwy-consent': {
        data: '3-in-1-consent',
        excludedValue: 'No'
      }
    },
    '/dpt/3-in-1-no-consent-given': {},
    '/dpt/men-acwy-consent': {
      '/dpt/consent/child-gp': {
        data: 'men-acwy-consent',
        excludedValue: 'No'
      }
    },
    '/dpt/consent/no-consent-given': {
      '/dpt/consent/check-answers': noConsent
    },
    '/dpt/consent/child-gp': {},
    '/dpt/consent/address': {},
    '/dpt/consent/health-allergy': {},
    '/dpt/consent/health-existing-conditions': {},
    '/dpt/consent/health-immunosuppressant-medication': {},
    '/dpt/consent/health-anything-else': {},
    '/dpt/consent/check-answers': {
      '/dpt/consent/confirmation-no-consent': noConsent,
      '/dpt/consent/confirmation-contraindications': anyContraindications
    },
    '/dpt/consent/confirmation': {},
    '/': {}
  }

  return wizard(journey, req)
}
