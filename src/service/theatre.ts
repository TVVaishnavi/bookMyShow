import Theatre from "../models/theatre";

interface TheatreData {
    name: string;
    location: string;
}

const createTheatre = async (theatreData: TheatreData) => {
    const theatre = new Theatre(theatreData);
    await theatre.save();
};

const getAllTheatres = async (): Promise<typeof Theatre[]> => {
    return await Theatre.find();
};

const getTheatreById = async (theatreId: string): Promise<typeof Theatre | null> => {
    return await Theatre.findById(theatreId);
};

const updateTheatre = async (theatreId: string, updateData: Partial<TheatreData>): Promise<typeof Theatre | null> => {
    return await Theatre.findByIdAndUpdate(theatreId, updateData, { new: true });
};

const deleteTheatre = async (theatreId: string): Promise<typeof Theatre | null> => {
    return await Theatre.findByIdAndDelete(theatreId);
};

const searchTheatres = async (searchQuery: string): Promise<typeof Theatre[]> => {
    return await Theatre.find({
        $or: [
            { name: { $regex: searchQuery, $options: 'i' } }, 
            { location: { $regex: searchQuery, $options: 'i' } },
        ], 
    });
};
const theatreService = {
    createTheatre,
    getAllTheatres,
    getTheatreById,
    updateTheatre,
    deleteTheatre,
    searchTheatres
};
export default theatreService