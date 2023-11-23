import { wizard } from 'nhsuk-prototype-rig'
import { checkForContraindications } from './check-for-contraindications.js'

export function hpvWizard (req) {
  const consented = req.session.data.consent !== 'No'
  const anyContraindications = checkForContraindications(req.session.data.health)
  const noParentalResponsibility = req.session.data.parent?.relationship === 'Other' && req.session.data.parent['has-responsibility'] === 'No'
  const haveTelephone = req.session.data.parent?.telephone !== ''

  const journey = {
    '/hpv/start': {},
    '/hpv/consent/child': {},
    '/hpv/consent/child-dob': {},
    '/hpv/consent/school': {
      '/hpv/consent/school-not-in-pilot': {
        data: 'child.school',
        value: 'No, they go to a different school'
      }
    },
    '/hpv/consent/parent-guardian': {
      '/hpv/consent/no-parental-responsibility': noParentalResponsibility
    },
    ...haveTelephone
      ? {
          '/hpv/consent/telephone-contact-method': {}
        }
      : {},
    '/hpv/consent/consent': {
      '/hpv/consent/child-gp': consented
    },
    '/hpv/consent/no-consent-given': {
      '/hpv/consent/check-answers': true
    },
    '/hpv/consent/child-gp': {},
    '/hpv/consent/address': {},
    '/hpv/consent/health-allergy': {},
    '/hpv/consent/health-medical-conditions': {},
    '/hpv/consent/health-previous-reaction': {},
    '/hpv/consent/check-answers': {
      '/hpv/consent/confirmation-no-consent': !consented,
      '/hpv/consent/confirmation-contraindications': anyContraindications
    },
    '/hpv/consent/confirmation': {},
    '/': {}
  }

  return wizard(journey, req)
}
