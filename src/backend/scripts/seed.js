import bcrypt from "bcrypt";
import connectToDatabase from "../config/mongo.js"; // Importa tu configuración de conexión

// Función para inicializar datos
async function seedDatabase()  {
  try {
    // Conectar a la base de datos
    const db = await connectToDatabase();
    console.log("Connected to MongoDB!");

    // Definir las colecciones
    const usersCollection = db.collection("users");
    const travelsCollection = db.collection("travels");
    const booksCollection = db.collection("books");
    const gamesCollection = db.collection("games");

    // Limpiar las colecciones existentes (opcional)
    await usersCollection.deleteMany({});
    await travelsCollection.deleteMany({});
    await booksCollection.deleteMany({});
    await gamesCollection.deleteMany({});
    console.log("Existing collections cleared.");

    // Insertar datos de usuarios
    const hashedPassword = await bcrypt.hash("password123", 10);

    const userResult = await usersCollection.insertOne({
      name: "Diego Alejandro",
      email: "diego@example.com",
      password: hashedPassword,
      travels: [],
      books: [],
      games: []
    });

    const userId = userResult.insertedId;

    // Insertar datos de viajes
    const travelResult = await travelsCollection.insertMany([
      {
        userId: userId,
        country: "Colombia",
        status: "visited",
        date: "2024-12-18",
        cities: "Bogotá, Medellín, Cartagena",
      },
      {
        userId: userId,
        country: "Argentina",
        status: "to_visit",
        date: null,
        cities: "",
      },
    ]);

    // Update user travel references
    await usersCollection.updateOne(
        { _id: userId },
        { $set: { travels: travelResult.insertedIds } }
    );

    // Insertar datos de libros
    const booksResult = await booksCollection.insertMany([
      {
        userId: userId,
        title: "Dune",
        franchise: "Dune",
        author: "Frank Herbert",
        genre: "Sci-fi, Adventure",
        status: "read",
        favorite: true,
        cover: "https://example.com/dune.jpg",
      },
      {
        userId: userId,
        title: "The Hobbit",
        franchise: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        genre: "Fantasy, Adventure",
        status: "to_read",
        favorite: false,
        cover: null,
      },
    ]);

    await usersCollection.updateOne(
        { _id: userId },
        { $set: { books: booksResult.insertedIds } }
    );

    // Insertar datos de videojuegos
    const gamesResult = await gamesCollection.insertMany([
      {
        userId: userId,
        title: "The Witcher 3",
        franchise: "The Witcher",
        platform: "PC, PS4",
        genre: "RPG, Adventure",
        status: "completed",
        favorite: false,
        playtime_forever: 120,
      },
      {
        userId: userId,
        title: "League of Legends",
        franchise: "League of Legends",
        platform: "PC",
        genre: "MOBA",
        status: "playing",
        favorite: true,
        playtime_forever: 500,
      },
    ]);

    await usersCollection.updateOne(
        { _id: userId },
        { $set: { games: gamesResult.insertedIds } }
    );

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Ejecutar la función
seedDatabase();
