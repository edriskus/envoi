// Accepts index, inputs

const limit = 4;
const symbolSpace = 91 - 65;
const totalBlocks = (symbolSpace ^ inputs.length) / (symbolSpace ^ limit);
const pattern = [];

for (let i = inputs.length; i > 0; i--) {
  if (i > inputs.length - limit) {
    pattern.unshift([65, 91]);
  } else {
    const subs = inputs.length - limit - i + 1;
    pattern.unshift(65 + Math.floor( (index % Math.pow(symbolSpace, subs)) / Math.pow(symbolSpace, subs - 1) ));
  }
}

return { pattern, hash: inputs.hash };