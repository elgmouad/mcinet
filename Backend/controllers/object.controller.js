import { connectSQL } from "../database/connectDB.js"

export const fetchObjectById = async (req, res) => {
    const { id } = req.query;
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    // let connect;
    
    try {
        // Establish connection
        // connect = await connectSQL();

        // Query to fetch the object by ID
        const query = `
        SELECT o.* FROM defaultdb.Object o
        WHERE o.Id_object = ? ;
        `;
        
        const [object] = await connect.query(query, [id]);

        if (object.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No Object found!!'
            });
        }

        // Return the fetched object
        return res.status(200).json({
            success: true,
            message: 'Object fetched successfully',
            object: object
        });

    } catch (error) {
        console.error("Error in fetchObjectById:", error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the object.'
        });

    } finally {
        connect.release(); // Toujours libérer la connexion
      }
};