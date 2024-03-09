const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieapp')
    .then(() => {
        console.log("Connected to the Server");
    })
    .catch(err => {
        console.log('error is:-', err)
    })

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9_-]{3,16}$/
    },
    year:
    {
        type: Number,
        max: [2024, 'It is still 2024']
    },
    score:
    {
        type: Number,
        min: 0,
        max: 10
    },
    date:
    {
        type: Date,
        default: Date.now
    },
    category:
    {
        type: [String],
    },
    first: String,
    last: String
})
movieSchema.methods.greet = function () {
    console.log('hello this is object');
    this.score = this.score + 0.1;
    return this.save();
};

movieSchema.statics.zero = function () {
    return this.updateMany({}, { score: 1 }, { runValidators: true });
}
movieSchema.virtual('fullyear')
    .get(function () {
        return this.first + ' ' + this.last;
    })
    .set(function (v) {
        this.first = v.substr(0, v.indexOf(' '));
        this.last = v.substr(v.indexOf(' ') + 1);
    })


const Movie = mongoose.model('Movie', movieSchema);


// Movie.zero().then(res => console.log(res));

// const findProduct = async () => {
//     const found = await Movie.findOne({ title: 'LAra' });
//     await found.greet();
//     console.log(found);
// };

// findProduct();

// Movie.schema.options.findOneAndUpdate = { returnDocument: 'after' };

const dalar = new Movie({
    title: 'Loalar',
    year: 2023,
    score: 9.2,
    date: new Date('2023-10-13'),
    category: ['DANCE', 'CRICKET', 'HOCKER'],
    first: 'gay',
    last: 'hey'
})
dalar.fullyear = 'Surya Bhai';
//dalar.save();
// const Palar = new Movie({
//     title: 'Subah',
//     year: 2030,
//     score: 8.2,
// })


// Movie.findOneAndUpdate(
//     { title: 'LADalar' }, // Filter criteria
//     { $set: { title: 'Loha', 'category.0': 'Surya' } }, // Update object
//     { runValidators: true, new: true } // Options
// )
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

//dalar.save();
// Palar.save().then(res => {
//     console.log(res);
// })


// Movie.find({})
//     .then(data => {
//         console.log(data);
//     })


//Movie.insertMany([{ title: 'LAra', year: 2015, age: 34, score: 8.4 }, { title: 'beemar', year: 2215, age: 44, score: 7.4 }])


// Movie.updateOne({ title: 'Salar' }, { title: 'Lohar', year: 1972 })
//     .then(res => console.log(res));




// Movie.findOneAndUpdate(
//     { title: 'Salaar' }, // Filter criteria
//     { title: 'Salar', year: 2023 }, // Update object
// )
//     .then(res => console.log(res));

