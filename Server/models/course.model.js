import { model, Schema } from "mongoose";

/**
 * @courseSchema - Mongoose schema for Course.
 */
const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [8, "Title must be at least 8 characters"],
        maxLength: [60, "Title should be less than 60 characters"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [8, "Description must be at least 8 characters"],
        maxLength: [200, "Description should be less than 200 characters"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    thumbnail: {
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        }
    },
    lectures: [
        {
            title: String,
            description: String,
            lecture: {
                public_id: { type: String, required: true },
                secure_url: { type: String, required: true }
            }
        }
    ],
    notes: [
        {
            title: String,
            description: String,
            file: {
                public_id: String,
                secure_url: String
            },
            // Track who uploaded the specific note (useful if you have multiple admins/instructors)
            createdBy: {
                type: Schema.Types.ObjectId,
                ref: 'User' 
            }
        }
    ],
    numberOfLectures: {
        type: Number,
        default: 0,
    },
    // 👇 CRITICAL UPDATE: References the User model for ownership checks
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    }

}, {
    timestamps: true
});

const Course = model('Course', courseSchema);

export default Course;