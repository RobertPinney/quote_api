const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  console.log(randomQuote);
  res.send({ quote: randomQuote });
});

app.get("/api/quotes", (req, res, next) => {
  const author = req.query;
  if (author?.person) {
    const filteredQuotes = quotes.filter(
      (quote) => quote.person === author.person
    );

    res.send({ quotes: filteredQuotes });
  } else {
    res.send({ quotes: quotes });
  }
});

app.post("/api/quotes", (req, res, next) => {
  if (req.query.quote && req.query.person) {
    const newQuote = { quote: req.query.quote, person: req.query.person };
    quotes.push(newQuote);
    res.status(201).send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is litening on port ${PORT}`);
});
