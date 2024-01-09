const fs = require("fs");
const path = require("path");

// Get file path from command line arguments
const filePath = process.argv[2];

// List of stop words
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "i",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "that",
  "the",
  "to",
  "were",
  "will",
  "with",
]);

// Read file content asynchronously
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

// Count word frequency, excluding stop words
function countWordFrequency(text) {
  const wordCount = {};
  text
    .toLowerCase()
    .split(/\W+/)
    .forEach((word) => {
      if (!STOP_WORDS.has(word) && word) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
  return wordCount;
}

// Main function to process the file and print word frequency
async function processFile(filePath) {
  try {
    const data = await readFileAsync(filePath);
    const wordCount = countWordFrequency(data);
    console.log("Word Frequencies:", wordCount);
  } catch (error) {
    console.error("Error reading the file:", error.message);
  }
}

// Execute the main function with the provided file path
processFile(filePath);
