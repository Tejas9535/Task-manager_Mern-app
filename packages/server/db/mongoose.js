import mongoose from 'mongoose'

mongoose.connect(`mongodb+srv://${process.env.URL_API}?retryWrites=true&w=majority`)