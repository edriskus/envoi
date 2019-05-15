var exec;

function receiveCode(code) {
  // eslint-disable-next-line no-new-func
  exec = new Function("inputs", "updateProgress", code);
}

function receiveBlock(inputs) {
  if (exec) {
    const data = exec(inputs, registerProgress);
    postMessage({ type: "PUSH_BLOCK", data });
  }
}

function registerProgress(progress) {
  postMessage({ type: "PUSH_PROGRESS", data: progress });
}

onmessage = function (message) {
  const payload = message.data;  
  switch (payload.type) {
    case "PUSH_CODE":
      receiveCode(payload.data);
      break;
    case "PUSH_BLOCK":
      receiveBlock(payload.data);
      break;
    default:
      break;
  }
}