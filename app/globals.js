import _ from 'lodash'

/**
 * Prototype specific global functions for use in Nunjucks templates.
 *
 * You can override Prototype Rig globals by creating global methods
 * with the same name.
 *
 * You can delete this file if you don’t need your own globals.
 */
export default () => {
  const globals = {}

  /**
   * Add your methods to the globals object below this comment block.
   *
   * @example
   * globals.sayHello = function (name) {
   *   return `Hello, ${name}!`
   * }
   *
   * Which in your templates would be used as:
   *
   * {{ sayHello("World") }} => Hello, World!
   */

  globals.d = function (keyPath) {
    const data = this.ctx.data
    return _.get(data, _.toPath(keyPath))
  }

  globals.healthAnswer = function (keyPath) {
    const data = this.ctx.data
    const answer = _.get(data, _.toPath(keyPath)) || 'No'
    const answerDetails = _.get(data, _.toPath(`${keyPath}-details`))

    return (answer === 'Yes' && answerDetails)
      ? `Yes – ${answerDetails}`
      : answer
  }

  const evaluateCondition = (data, condition) => {
    if (typeof condition === 'function' && condition()) {
      return true
    }

    if (typeof condition === 'string') {
      return !!_.get(data, _.toPath(condition))
    }

    if (typeof condition === 'object' && condition.data) {
      const sessionData = _.toPath(_.get(data, condition.data))

      if (condition.value || condition.values) {
        const includedValues = _.toPath(condition.value ? condition.value : condition.values)
        if (includedValues.some(v => sessionData.indexOf(v) >= 0)) {
          return true
        }
      }

      if (condition.excludedValue || condition.excludedValues) {
        const excludedValues = _.toPath(condition.excludedValue ? condition.excludedValue : condition.excludedValues)
        if (!excludedValues.some(v => sessionData.indexOf(v) >= 0)) {
          return true
        }
      }
    }

    return false
  }

  globals.decorateRows = function (rows) {
    const data = this.ctx.data

    rows = rows
      .filter(r => typeof r === 'object')
      .filter(r => typeof r.condition === 'undefined' || evaluateCondition(data, r.condition))
      .map(r => {
        if (typeof r.key === 'string') {
          if (!r.visuallyHiddenText) {
            r.visuallyHiddenText = r.key.toLowerCase()
          }

          r.key = {
            text: r.key
          }
        }

        if (typeof r.data === 'string' && !r.value) {
          r.value = _.get(data, _.toPath(r.data))
          delete r.data
        }

        if (typeof r.value === 'string') {
          r.value = {
            text: r.value
          }
        }

        if (r.href && !r.actions) {
          r.actions = {
            items: [{
              text: r.action || 'Change',
              visuallyHiddenText: r.visuallyHiddenText,
              href: r.href
            }]
          }

          delete r.visuallyHiddenText
          delete r.href
        }

        return r
      })

    return rows
  }

  // Keep the following line to return your globals to the app
  return globals
}
