const process = require("process");
const { isNumber } = require("util");
const { extractTestMetric } = require("./test-metric-util");
let data = "";

process.stdin.on("readable", () => {
	let chunk;
	while (null !== (chunk = process.stdin.read())) {
		data += chunk;
	}
});

process.stdin.on("end", () => {
	// process all the data and write it back to stdout

	// "numFailedTestSuites": 0,
	// "numFailedTests": 0,
	const jsonObj = JSON.parse(data) || {};
	if (isEmptyObject(jsonObj)) {
		process.exit(-1);
	}

	const failedTestSuites = jsonObj.numFailedTestSuites;
	const failedTests = jsonObj.numFailedTests;
	if (!isNumber(failedTestSuites) || !isNumber(failedTests)) {
		// data is broken
		console.error("Failed to get failed data from jest");
		process.exit(-1);
	}
	if (failedTests > 0 || failedTestSuites > 0) {
		process.exit(-1);
	}

  let extractedTestInfo = extractTestMetric(jsonObj)
  Object.entries(extractedTestInfo).forEach(([k, v]) => {
    console.log(`${k}: ${v}`)
  })
});

const isEmptyObject = (obj) => {
	return (
		obj != undefined && typeof obj === "object" && Object.keys(obj).length === 0
	);
};

