const Problem = require("../models/problem.js");
const generateContest = async (req, res) => {
  try {
    const easy = await Problem.aggregate([
      { $match: { difficulty: "easy" } },
      { $sample: { size: 1 } },
    ]);

    const medium = await Problem.aggregate([
      { $match: { difficulty: "medium" } },
      { $sample: { size: 2 } },
    ]);

    const hard = await Problem.aggregate([
      { $match: { difficulty: "hard" } },
      { $sample: { size: 1 } },
    ]);
    if (easy.length < 1 || medium.length < 2 || hard.length < 1) {
      return res.status(400).json({
        error: "Not enough questions in database",
      });
    }
    const question = [...easy, ...medium, ...hard];
    const startTime = new Date();
    const duration = 60 * 60;
    res.json({ question, startTime, duration });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addQuestion = async (req, res) => {
  try {
    const { title, difficulty, externalLink, tags } = req.body;
    if (!title || !difficulty || !externalLink) {
      return res.status(400).json({ error: "All Fields Required" });
    }
    const newProblem = await Problem.create({
      title,
      difficulty,
      externalLink,
      tags,
    });
    res.status(201).json({ message: "Problem added successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { generateContest, addQuestion };
