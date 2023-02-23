import { wizard } from 'nhsuk-prototype-rig'
import { checkForContraindications } from './check-for-contraindications.js'

export function fluWizard (req) {
  const consentedNasal = req.session.data.consent !== 'No'
  const consentedJab = req.session.data['im-consent'] !== 'No'
  const anyContraindications = checkForContraindications(req.session.data.health)

  const journey = {
    '/flu/start': {},
    '/flu/consent/email': {},
    '/flu/consent/confirm-email': {},
    '/flu/consent/child': {},
    '/flu/consent/child-dob': {},
    '/flu/consent/school': {},
    '/flu/consent/parent-guardian': {},
    '/flu/consent/consent': {
      '/flu/consent/child-gp': consentedNasal
    },
    '/flu/consent/no-consent-given': {
      '/flu/im-consent': true,
      '/flu/consent/check-answers': true
    },
    '/flu/im-consent': {
      '/flu/consent/check-answers': !consentedJab
    },
    '/flu/consent/child-gp': {},
    '/flu/consent/address': {},
    '/flu/consent/child-nhs': {},
    '/flu/consent/health-questions': {},
    '/flu/consent/health-immune-system': {},
    ...consentedNasal
      ? {
          '/flu/consent/health-household-immune-system': {},
          '/flu/consent/health-asthma': {
            '/flu/consent/health-egg-allergy': {
              data: 'health.asthma',
              value: 'No'
            }
          },
          '/flu/consent/health-asthma-steroids': {},
          '/flu/consent/health-aspirin': {}
        }
      : {},
    '/flu/consent/health-egg-allergy': {},
    '/flu/consent/health-anything-else': {},
    '/flu/consent/check-answers': {
      '/flu/consent/confirmation-no-consent': !consentedNasal && !consentedJab,
      '/flu/consent/confirmation-contraindications': anyContraindications
    },
    '/flu/consent/confirmation': {},
    '/': {}
  }

  return wizard(journey, req)
}
