import { connectSQL } from "../database/connectDB.js"

export const fetchProducts = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    // let connect;

    try {
        // Establish connection
        // connect = await connectSQL();

        // Query to fetch the Product by ID
        const query = `
        SELECT * FROM defaultdb.produit;
        `;

        const [products] = await connect.query(query);

        if (products.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No Products found!!'
            });
        }

        // Return the fetched Product
        return res.status(200).json({
            success: true,
            message: 'Produits fetched successfully',
            products : products
        });

    } catch (error) {
        console.error("Error in fetchProducts:", error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the Products.'
        });

    } finally {
        connect.release(); // Toujours libérer la connexion
      }
};