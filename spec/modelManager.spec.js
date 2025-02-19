const CohortManager = require(`../src/CohortManager.js`)
const Cohort = require(`../src/Cohort.js`)

describe('Model Manager Class', () => {
  let cohortManager
  let cohort1
  let cohort2

  beforeEach(() => {
    cohortManager = new CohortManager()
    cohort1 = new Cohort('Cohort 1')
    cohort2 = new Cohort('Cohort 5')
  })

  it('should create a new cohort', () => {
    // setup
    const expectedResult = [cohort1, cohort2]
    // execute
    cohortManager.createCohort('Cohort 1')
    cohortManager.createCohort('Cohort 5')
    // verify
    expect(cohortManager.getAllCohorts()).toEqual(expectedResult)
  })
  it('should return the correct cohort', () => {
    // setup
    const expectedResult = cohort2
    cohortManager.createCohort('Cohort 1')
    cohortManager.createCohort('Cohort 5')
    // execute
    const result = cohortManager.searchCohort('Cohort 5')
    // verify
    expect(result).toEqual(expectedResult)
  })

  it('should add a student to a cohort', () => {
    // setup
    cohortManager.createCohort('Cohort 9')
    // execute
    cohortManager.addStudentToCohort(
      'Kevin',
      'Goffin',
      'Jenocke',
      'Jenocke@gmail.com',
      'Cohort 9'
    )
    // verify
    expect(cohortManager.searchCohort('Cohort 9').getStudents()).toEqual([
      {
        firstName: 'Kevin',
        lastName: 'Goffin',
        id: 0,
        username: 'Jenocke',
        email: 'Jenocke@gmail.com'
      }
    ])
  })

  it('should remove a cohort', () => {
    // setup
    cohortManager.createCohort('Cohort 1')
    cohortManager.createCohort('Cohort 5')
    // execute
    cohortManager.removeCohort('Cohort 1')
    // verify
    expect(cohortManager.getAllCohorts()).toEqual([cohort2])
  })

  it('should remove the student from the cohort', () => {
    // setup
    cohortManager.createCohort('Cohort 9')
    cohortManager.addStudentToCohort(
      'Kevin',
      'Goffin',
      'Jenocke',
      'Jenocke@gmail.com',
      'Cohort 9'
    )
    cohortManager.addStudentToCohort(
      'Ahmed',
      'Missouri',
      'Ahmedmissouri',
      'ahmed@gmail.com',
      'Cohort 9'
    )
    // execute
    cohortManager.removeStudentFromCohort(1, 'Cohort 9')
    // verify
    expect(cohortManager.searchCohort('Cohort 9').getStudents()).toEqual([
      {
        firstName: 'Kevin',
        lastName: 'Goffin',
        id: 0,
        username: 'Jenocke',
        email: 'Jenocke@gmail.com'
      }
    ])
  })

  it('should throw an error', () => {
    // setup
    cohortManager.createCohort('Cohort 1')
    // execute

    // verify
    expect(() => {
      cohortManager.searchCohort('Cohort 7')
    }).toThrow(new Error('Cohort not found'))
    expect(() => {
      cohortManager.removeStudentFromCohort(0, 'Cohort 1')
    }).toThrow(new Error('Student not found'))
  })
})
