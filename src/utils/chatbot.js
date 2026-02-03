export const Chatbot = {
  defaultResponses: {
    "hello hi": `Hello! How can I help you?`,
    "how are you": `I'm doing great! How can I help you?`,
    "flip a coin": function () {
      const randomNumber = Math.random();
      return randomNumber < 0.5 ? "Sure! You got heads" : "Sure! You got tails";
    },
    "roll a dice": function () {
      const diceResult = Math.floor(Math.random() * 6) + 1;
      return `Sure! You got ${diceResult}`;
    },
    "what is the date today": function () {
      const now = new Date();
      const dateToday = now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        weekday: "long",
      });
      return `Today is ${dateToday}`;
    },
    thank: "No problem! Let me know if you need help with anything else!",
  },

  additionalResponses: {
    Goodbye: "Goodbye. Have a great day!",
    "Beautiful Roxane": "Ganda ni roxane super!",
    "Say badwords": "Fuck you! Tang ina mo!",
    "give me a unique id": () =>
      `Sure! Here's a unique ID ${crypto.randomUUID()}`,
    "Napakagkaganda ni roxane!": "Truee parang anghel ganda pa super",
    "suntukan tayo": "Sige kahit sama mo pa si lx",
    "bat kaya ang ganda ni roxane?":
      "Ewan ko nga eh napaka unique, and one of a kind hayss napaka rare galing gumawa ng magulang nya",
  },

  unsuccessfulResponse: `Sorry, I didn't quite understand that. Currently, I only know how to flip a coin, roll a dice, or get today's date. Let me know how I can help!`,

  addResponses: function (additionalResponses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...additionalResponses,
    };
  },

  getResponse: function (message) {
    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses,
    };

    const { ratings, bestMatchIndex } = this.stringSimilarity(
      message,
      Object.keys(responses),
    );
    const bestResponseRating = ratings[bestMatchIndex].rating;

    // Threshold: Only reply if we are 30% sure (0.3)
    if (bestResponseRating <= 0.3) {
      return this.unsuccessfulResponse;
    }

    const bestResponseKey = ratings[bestMatchIndex].target;
    const response = responses[bestResponseKey];

    if (typeof response === "function") {
      return response();
    } else {
      return response;
    }
  },

  getResponseAsync: function (message) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getResponse(message));
      }, 2000);
    });
  },

  // --- MATH MAGIC (Dice Coefficient Algorithm) ---
  compareTwoStrings: function (first, second) {
    first = first.replace(/\s+/g, "").toLowerCase();
    second = second.replace(/\s+/g, "").toLowerCase();

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
      firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  },

  stringSimilarity: function (mainString, targetStrings) {
    const ratings = [];
    let bestMatchIndex = 0;

    for (let i = 0; i < targetStrings.length; i++) {
      const currentTargetString = targetStrings[i];
      const currentRating = this.compareTwoStrings(
        mainString,
        currentTargetString,
      );
      ratings.push({ target: currentTargetString, rating: currentRating });
      if (currentRating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i;
      }
    }

    return { ratings, bestMatch: ratings[bestMatchIndex], bestMatchIndex };
  },
};
