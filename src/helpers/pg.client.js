import pg from 'pg';

// Pool permet d'ouvrir des connexion multiple utilisable en parallèle
const client = new pg.Pool();

export default client;