import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Por favor ingresar un título']
    },
    description: {
        type: String,
        required: [true, 'Por favor ingresar una descripción']
    }
})

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);