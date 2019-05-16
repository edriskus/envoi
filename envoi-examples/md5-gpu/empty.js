const kernel = gpu.createKernel(function() {
  const array2 = [0.08, 2, 0.1, 3];
  return array2;
}).setOutput([100]);

console.log(kernel());

return { found: false };