const BlinkDiff = require('blink-diff')

async function compareScreenshots({currentPath, goldenPath, diffPath}) {
  return new Promise((resolve, reject) => {
    var diff = new BlinkDiff({
      imageAPath: currentPath,
      imageBPath: goldenPath,

      thresholdType: BlinkDiff.THRESHOLD_PERCENT,
      threshold: 0.01, // 1% threshold

      imageOutputPath: diffPath,
      composeLeftToRight: true
    });

    diff.run(function (error, result) {
      if (error) {
        reject(error)
      } else {
        resolve(diff.hasPassed(result.code))
      }
    })
  })
}

module.exports = {
  compareScreenshots
}
