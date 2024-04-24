const deadlineDate = 'Thursday 23 November'
const sessionDate = 'Monday 27 November'
const fullName = 'Jamie Doe'
const url = 'https://give-or-refuse-consent.nhs.uk'
const email = 'team@local-sais.nhs.uk'
const tel = '0117 496 0999'
const reason = 'they were absent from the session'

export default {
  children: [
    {
      name: 'Text confirmation that consent has been given',
      text: `Your parent or guardian has agreed for you to have the human papillomavirus (HPV) vaccination at school on ${sessionDate}.`
    },
    {
      name: 'Text reminder (to go out the day before the vaccination)',
      text: `You’re due to get your human papillomavirus (HPV) vaccination at school tomorrow (${sessionDate}). Please wear a short-sleeved shirt and make sure you eat something before the session.`
    }
  ],
  parents: [
    {
      name: 'Text inviting parents to give or refuse consent',
      text: `Give or refuse consent for your child’s human papillomavirus (HPV) vaccination by going to ${url}. You need to do this by ${deadlineDate}.\n\nResponding will take less than 5 minutes.`
    },
    {
      name: 'Text reminder to parents to give or refuse consent',
      text: `We recently asked for your consent to vaccinate your child against the human papillomavirus (HPV).\n\nGo to ${url} to submit a response. This will take less than 5 minutes.`
    },
    {
      name: 'Text confirmation that consent has been given',
      text: `You’ve given consent for ${fullName} to get their HPV vaccination at school on ${sessionDate}. Please let them know what to expect.`
    },
    {
      name: 'Text confirmation that consent has been refused',
      text: `You’ve refused to give consent for ${fullName} to have their HPV vaccination. Please let them know they will not be vaccinated at school.`
    },
    {
      name: 'Text reminder (to go out the day before the vaccination)',
      text: `${fullName} will get their HPV vaccination at school tomorrow (${sessionDate}). Please make sure they have breakfast and encourage them to wear a short-sleeved shirt.`
    },
    {
      name: 'Text that child has been vaccinated',
      text: `${fullName} had their HPV vaccination at school today. They might have some side effects, including bruising or itching at the injection site, a high temperature, nausea, or pain in the arms, hands, or fingers.\n\nIf you’re concerned, contact your GP in the usual way.`
    },
    {
      name: 'Text that child did not get their vaccination despite having consent',
      text: `${fullName} did not have their HPV vaccination at school today. This was because ${reason}.\n\nIf you’d still like them to be vaccinated on a different date, contact the local health team by calling ${tel}, or email ${email}.`
    }
  ]
}
