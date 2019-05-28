function split(text) {
  return text.split('<!---- splitter ---->').map(chunk => chunk.trim())
}

module.exports = {
  split
}
