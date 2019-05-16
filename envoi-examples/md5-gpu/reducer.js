// Accepts accumulator, value, inputs

if (value.found && value.input) {
  return { results: value, finished: true };
} else {
  return { results: accumulator };
}