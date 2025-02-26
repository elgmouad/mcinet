import { connectSQL } from "../database/connectDB.js"

export const getUser = async (req, res)=> {
    try {
        const connect = await connectSQL();

        const query = `
            SELECT 
                u.*,
                p.nom_profile AS profile,
                s.nom_service

            FROM Utilisateur u
            JOIN Profile p ON u.id_profile = p.id_profile
            JOIN Service s ON u.id_service = s.id_service
        `
        // const [user] = await connect.query('SELECT * FROM Utilisateur;')
        const [user] = await connect.query(query)
        console.log(user)

        res.status(200).json({
            success: true,
            message: "users fetched!",
            users: user
        })

    } catch (error) {
        console.log("error getting users: ", error)
    }
}

export const updateUser = async (req, res) => {
    res.send('updating rout works!!')
}