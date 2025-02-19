const Cohort = require('./Cohort.js')

class CohortManager {
  constructor() {
    this.cohortsList = []
    this.studentsList = []
  }

  createCohort(name) {
    this.cohortsList.push(new Cohort(name))
  }

  getAllCohorts() {
    return this.cohortsList
  }

  searchCohort(name) {
    let result
    this.cohortsList.forEach((element) => {
      if (element.getName() === name) {
        result = element
      }
    })
    console.log(result)
    if (result === undefined) throw new Error('Cohort not found')
    return result
  }

  addStudentToCohort(firstName, lastName, username, email, cohortName) {
    this.searchCohort(cohortName).addStudent(
      firstName,
      lastName,
      username,
      email
    )
  }

  removeCohort(name) {
    const i = this.cohortsList.findIndex((cohort) => cohort.name === name)
    if (i === -1) {
      throw new Error('Cohort not found')
    }
    this.cohortsList.splice(i, 1)
  }

  removeStudentFromCohort(studentID, cohortName) {
    const cohort = this.searchCohort(cohortName)
    cohort.removeStudent(studentID)
  }
}

module.exports = CohortManager
