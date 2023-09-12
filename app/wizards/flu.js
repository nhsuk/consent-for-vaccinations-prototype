import { wizard } from 'nhsuk-prototype-rig'
import { checkForContraindications } from './check-for-contraindications.js'

export function fluWizard (req) {
  const consentedNasal = req.session.data.consent !== 'No'
  const consentedJabContact = req.session.data['im-consent'] !== 'No'
  const anyContraindications = checkForContraindications(req.session.data.health)
  const noParentalResponsibility = req.session.data.parent.relationship === 'Other' && req.session.data.parent['has-responsibility'] === 'No'

  const journey = {
    '/flu/start': {},
    '/flu/consent/child': {},
    '/flu/consent/child-dob': {},
    '/flu/consent/school': {
      '/flu/consent/school-not-in-pilot': {
        data: 'child.school',
        value: 'No, they go to a different school'
      }
    },
    '/flu/consent/parent-guardian': {
      '/flu/consent/no-parental-responsibility': noParentalResponsibility,
      '/flu/consent/telephone-contact-method': () =>
        !noParentalResponsibility && req.session.data.parent.telephone !== ''
    },
    '/flu/consent/consent': {
      '/flu/consent/child-gp': consentedNasal
    },
    '/flu/consent/no-consent-given': {
      '/flu/im-consent': true,
      '/flu/consent/check-answers': true
    },
    '/flu/im-consent': {
      '/flu/consent/check-answers': true
    },
    '/flu/consent/child-gp': {},
    '/flu/consent/address': {},
    ...consentedNasal
      ? {
          '/flu/consent/health-asthma': {
            '/flu/consent/health-recent-flu-vaccination': {
              data: 'health.asthma',
              value: 'No'
            }
          },
          '/flu/consent/health-asthma-steroids': {},
          '/flu/consent/health-asthma-admitted': {}
        }
      : {},
    '/flu/consent/health-recent-flu-vaccination': {},
    '/flu/consent/health-immune-system': {},
    '/flu/consent/health-household-immune-system': {},
    '/flu/consent/health-egg-allergy': {},
    '/flu/consent/health-medication-allergies': {},
    '/flu/consent/health-previous-reaction': {},
    '/flu/consent/health-aspirin': {},
    '/flu/consent/check-answers': {
      '/flu/consent/confirmation-no-consent': !consentedNasal && !consentedJabContact,
      '/flu/confirmation-jab-contact': !consentedNasal && consentedJabContact,
      '/flu/consent/confirmation-contraindications': anyContraindications
    },
    '/flu/consent/confirmation': {},
    '/': {}
  }

  return wizard(journey, req)
}
