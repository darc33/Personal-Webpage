export const getUserByEmail = async (db, email) => {
    const usersCollection = db.collection('users');
    return await usersCollection.findOne({ email });
};

export const createUser = async (db, user) => {
    const usersCollection = db.collection('users');
    const result = await usersCollection.insertOne(user);
    const createdUser = { ...user, _id: result.insertedId };
    return createdUser;
};
