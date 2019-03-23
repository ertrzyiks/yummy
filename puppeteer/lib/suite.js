class Suite {
  constructor() {
    this.snapshots = []
    this.failure = false
  }

  each (cb) {
    this.snapshots.forEach(cb)
  }

  add(name) {
    const testCase = {
      name,
      status: 'pending'
    }

    this.snapshots.push(testCase)

    return {
      success: () => testCase.status = 'success',
      failure: (message) => {
        testCase.status = 'failure'
        testCase.message = message
        this.failure = true
      }
    }
  }
}

module.exports = {
  Suite
}
