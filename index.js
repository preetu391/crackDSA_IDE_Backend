const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors())
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");

app.listen(5000, () => {
  console.log("listening port 5000");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("hello world");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  console.log(language, "Length:", code.length);

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  try {
    const filepath = await generateFile(language, code);

    const output = await executeCpp(filepath);

    res.send({ filepath, output });

    console.log(output);
  } catch (error) {
    res.status(500).json({ error });
  }

  
});
