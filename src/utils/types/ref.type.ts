import mongoose from "mongoose";

interface RefType {
        userId: mongoose.Types.ObjectId,
        ref: string,
        refId: mongoose.Types.ObjectId,
}

export default RefType