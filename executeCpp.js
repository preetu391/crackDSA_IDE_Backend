const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);

  const promise1 = new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });

  promise1.catch((error) => {
    console.error(error);
  });
  return promise1;
};

module.exports = {
  executeCpp,
};
