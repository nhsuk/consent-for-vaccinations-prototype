import { wizard } from 'nhsuk-prototype-rig'
import { checkForContraindications } from './check-for-contraindications.js'

export function dptWizard (req) {
  const data = req.session.data
  const noConsent = data['3-in-1-consent'] === 'No' && data['men-acwy-consent'] === 'No'
  const anyContraindications = checkForContraindications(data.health)
  const noParentalResponsibility = req.session.data.parent?.relationship === 'Other' && req.session.data.parent['has-responsibility'] === 'No'
  const haveTelephone = req.session.data.parent?.telephone !== ''

  const journey = {
    '/dpt/start': {},
    '/dpt/consent/child': {},
    '/dpt/consent/child-dob': {},
    '/dpt/consent/school': {
      '/dpt/consent/school-not-in-pilot': {
        data: 'child.school',
        value: 'No, they go to a different school'
      }
    },
    '/dpt/consent/parent-guardian': {
      '/dpt/consent/no-parental-responsibility': noParentalResponsibility
    },
    ...haveTelephone
      ? {
          '/dpt/consent/telephone-contact-method': {}
        }
      : {},
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
    '/dpt/consent/health-medical-conditions': {},
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
