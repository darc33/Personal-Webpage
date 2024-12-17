import readJSONFile from "../utils/fileReader.js";

export const getTravelsData = () => {
    const travels = readJSONFile('travels.json');
    if (!Array.isArray(travels)) {
        throw new Error("Invalid data format: Expected an array of travels");
    }
    return travels; // Returns all books
};