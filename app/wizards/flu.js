import { wizard } from 'nhsuk-prototype-rig'

export function fluWizard (req) {
  const journey = {
    '/flu/start': {},
    '/flu/consent/school': {},
    '/flu/consent/parent-guardian': {},
    '/flu/consent/child': {},
    '/flu/consent/child-dob': {},
    '/flu/consent/child-gp': {},
    '/flu/consent/child-nhs': {},
    '/flu/consent/consent': {
      '/flu/consent/no-consent-given': {
        data: 'consent',
        value: 'No'
      }
    },
    '/flu/consent/health-questions': {},
    '/flu/consent/health-immune-system': {},
    '/flu/consent/health-household-immune-system': {},
    '/flu/consent/health-asthma': {},
    '/flu/consent/health-egg-allergy': {},
    '/flu/consent/health-aspirin': {},
    '/flu/consent/check-answers': {},
    '/flu/consent/confirmation': {},
    '/': {}
  }

  return wizard(journey, req)
}
