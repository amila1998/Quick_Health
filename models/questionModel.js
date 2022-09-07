const { Schema, model } = require("mongoose");

const questionsSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        body: {
            type: String,
        },
        lables: {
            type: Array,
        },
        userID: String,
        userName: String,
        replies: [
            {
                userID: String,
                replyBody: String,
                userName: String,
                voteToCorrect: [
                    {
                        userID: String,
                        userName: String,
                        createdDate:Date,
                        updatedDate:Date,
                    }

                ],
                voteToWrong: [
                    {
                        userID: String,
                        userName: String,
                        createdDate:Date
                    }

                ],
                childReplies: [
                    {
                        userID: String,
                        userName: String,
                        replyBody: String,
                        createdDate:Date,
                        updatedDate:Date,
                    }

                ]
            }
        ],
        stars: [
            {
                userID: String,
                userName: String,
                createdDate: Date,
                updatedDate:Date,
            }
        ],
        reports: [
            {
                userID: String,
                userName: String,
                message: String,
                reportedDate: Date,
            }
        ],

    },
    { timestamps: true }
);

const Questions = model("Questions", questionsSchema);
module.exports = Questions;