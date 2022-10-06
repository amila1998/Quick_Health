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
                createdDate:Date,
                updatedDate:Date,
                isDeleted:{
                    type:Number,
                    Default:0,
                },
                vote: [
                    {
                        userID: String,
                        userName: String,
                        createdDate:Date,
                        updatedDate:Date,
                        voteStatus:Number,
                    }

                ],

                childReplies: [
                    {
                        userID: String,
                        userName: String,
                        replyBody: String,
                        createdDate:Date,
                        updatedDate:Date,
                        isDeleted:{
                            type:Number,
                            Default:0,
                        },
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