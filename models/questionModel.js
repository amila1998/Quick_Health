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
        replies: [
            {
                userID:String,
                replyBody:String,
                voteToCorrect:[
                    {
                        userID:String,
                    },
                    {
                        timestamps: true
                    }

                ],
                voteToWrong:[
                    {
                        userID:String,
                    },
                    {
                        timestamps: true
                    }

                ],
                childReplies:[
                    {
                        userID:String,
                replyBody:String,
                    },
                    {
                        timestamps: true
                    }

                ]
            },
            {
                timestamps: true
            }
        ],
        stars: [
            {
                userID:String
            },
            {
                timestamps: true
            }
        ],
        reports:[
            {
                userID:String,
                message:String,
                reportedDate:Date
            
            },
            {
                timestamps: true
            }

        ],

    },
    { timestamps: true }
);

const Questions = model("Questions", questionsSchema);
module.exports = Questions;