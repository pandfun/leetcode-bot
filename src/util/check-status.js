const axios = require("axios");

const CheckStatus = async (username) => {
    try {
        const graphqlQuery = `
            query {
                recentSubmissionList(username: "${username}") {
                    title
                    timestamp
                    statusDisplay
                }
            }
        `;

        const graphqlEndpoint = "https://leetcode.com/graphql";

        const response = await axios.post(graphqlEndpoint, {
            query: graphqlQuery,
        });
        const resultData = response.data;
        const recentSubmissions = resultData.data.recentSubmissionList;

        const midnightUTC = new Date();
        midnightUTC.setUTCHours(0, 0, 0, 0);

        const TargetTitle = await GetDailyProblemTitle();
        if (TargetTitle == null)
            return "Unable to fetch the daily problem title!";

        for (const submission of recentSubmissions) {
            if (
                submission.title === TargetTitle &&
                submission.statusDisplay === "Accepted"
            ) {
                const timestamp = parseInt(submission.timestamp);
                const submissionDatetime = new Date(timestamp * 1000);

                if (submissionDatetime > midnightUTC)
                    return "User has solved the Daily Problem! 🎉 🎉";
            }
        }

        return "User has not solved the problem!";
    } catch (error) {
        return "An error occurred while processing the request.";
    }
};

const GetDailyProblemTitle = async () => {
    try {
        const graphqlQuery = `
            query questionOfToday {
                activeDailyCodingChallengeQuestion {
                    question {
                        title
                    }
                }
            }
        `;

        const graphqlEndpoint = "https://leetcode.com/graphql";

        const response = await axios.post(graphqlEndpoint, {
            query: graphqlQuery,
        });
        const resultData = response.data;
        const ProblemTitle =
            resultData.data.activeDailyCodingChallengeQuestion.question.title;

        return ProblemTitle;
    } catch (error) {
        return null;
    }
};

// (async () => {
//     const status = await CheckStatus("krishna1034");
//     console.log(status);
// })();

module.exports = {
    CheckStatus,
};
