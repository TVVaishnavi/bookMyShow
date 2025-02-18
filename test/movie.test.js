const mongoose = require('mongoose');
const Movie = require('../src/model/movie'); // Adjust path to where your model is

beforeAll(async () => {
    const uri = 'mongodb://localhost/testdb'; // Use a test database URI (e.g., in-memory or local MongoDB)
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

describe('Movie Model Test', () => {
    it('should create & save a movie successfully', async () => {
        const movieData = {
            title: 'Inception',
            description: 'A mind-bending thriller about dreams within dreams.',
            genre: 'Sci-Fi',
            releaseDate: new Date('2010-07-16'),
            director: 'Christopher Nolan',
            cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
            rating: 8.8,
            duration: 148,
            language: 'English',
        };

        const movie = new Movie(movieData);
        const savedMovie = await movie.save();

        expect(savedMovie._id).toBeDefined();
        expect(savedMovie.title).toBe(movieData.title);
        expect(savedMovie.rating).toBe(movieData.rating);
        expect(savedMovie.cast.length).toBeGreaterThan(0);
        expect(savedMovie.createdAt).toBeDefined();
    });

    it('should fail to create a movie without required fields', async () => {
        const movieData = { title: 'No Description' }; // Missing required fields

        let error;
        try {
            const movie = new Movie(movieData);
            await movie.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.description).toBeDefined();
        expect(error.errors.genre).toBeDefined();
        expect(error.errors.releaseDate).toBeDefined();
        expect(error.errors.director).toBeDefined();
        expect(error.errors.language).toBeDefined();
    });

    it('should fail to create a movie with invalid rating', async () => {
        const movieData = {
            title: 'Invalid Rating Movie',
            description: 'Movie with invalid rating.',
            genre: 'Drama',
            releaseDate: new Date(),
            director: 'Director Name',
            cast: ['Actor One'],
            rating: 12,  // Invalid rating (out of bounds)
            duration: 120,
            language: 'English',
        };

        const movie = new Movie(movieData);
        let error;
        try {
            await movie.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.rating).toBeDefined();
    });

    it('should create a movie with default createdAt field', async () => {
        const movieData = {
            title: 'The Dark Knight',
            description: 'Batman faces off against the Joker.',
            genre: 'Action',
            releaseDate: new Date('2008-07-18'),
            director: 'Christopher Nolan',
            cast: ['Christian Bale', 'Heath Ledger'],
            rating: 9.0,
            duration: 152,
            language: 'English',
        };

        const movie = new Movie(movieData);
        const savedMovie = await movie.save();

        expect(savedMovie.createdAt).toBeDefined();
        expect(savedMovie.createdAt).toBeInstanceOf(Date);
    });

    it('should handle empty cast array correctly', async () => {
        const movieData = {
            title: 'No Cast Movie',
            description: 'A movie without a cast.',
            genre: 'Documentary',
            releaseDate: new Date(),
            director: 'Anonymous',
            cast: [],  // Empty cast array
            rating: 5.0,
            duration: 90,
            language: 'English',
        };

        const movie = new Movie(movieData);
        const savedMovie = await movie.save();

        expect(savedMovie.cast).toBeDefined();
        expect(savedMovie.cast.length).toBe(0);
    });
});
