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
        userID:String,
        userName:String,
        replies: [
            {
                userID:String,
                replyBody:String,
                userName:String,
                voteToCorrect:[
                    {
                        userID:String,
                        userName:String,
                    },
                    {
                        timestamps: true
                    }

                ],
                voteToWrong:[
                    {
                        userID:String,
                        userName:String,
                    },
                    {
                        timestamps: true
                    }

                ],
                childReplies:[
                    {
                        userID:String,
                        userName:String,
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
                userID:String,
                userName:String,
            },
            {
                timestamps: true
            }
        ],
        reports:[
            {
                userID:String,
                userName:String,
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