import { wizard } from 'nhsuk-prototype-rig'

export function fluWizard (req) {
  const consented = req.session.data.consent !== 'No'

  const journey = {
    '/flu/start': {},
    '/flu/consent/email': {},
    '/flu/consent/confirm-email': {},
    '/flu/consent/parent-guardian': {},
    '/flu/consent/child': {},
    '/flu/consent/child-dob': {},
    '/flu/consent/school': {},
    '/flu/consent/consent': {
      '/flu/consent/child-gp': consented
    },
    '/flu/consent/no-consent-given': {
      '/flu/consent/check-answers': true
    },
    '/flu/consent/child-gp': {},
    '/flu/consent/child-nhs': {},
    '/flu/consent/health-questions': {},
    '/flu/consent/health-immune-system': {},
    '/flu/consent/health-household-immune-system': {},
    '/flu/consent/health-asthma': {},
    '/flu/consent/health-egg-allergy': {},
    '/flu/consent/health-aspirin': {},
    '/flu/consent/check-answers': {
      '/flu/consent/confirmation-no-consent': !consented
    },
    '/flu/consent/confirmation': {},
    '/': {}
  }

  return wizard(journey, req)
}
