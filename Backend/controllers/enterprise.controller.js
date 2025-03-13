import { connectSQL } from "../database/connectDB.js"

export const getEnterpriseList = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT * 
            FROM defaultdb.entreprise;
        `;
        const [result] = await connect.query(query)
        console.log(result)

        res.status(200).json({
            success: true,
            message: 'All enterprises fetchd successfully!!',
            enterprises: result
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal server error !!',
            Error: error
        })
    }finally {
        connect.release(); // Toujours libérer la connexion
      }
}

export const getEnterpriseById = async (req, res) => {
    const {id} = req.body
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT *
            FROM defaultdb.entreprise
            WHERE ICE = ?
            ;
        `;
        const [result] = await connect.query(query, id)

        if(result.length > 0) {
            res.status(200).json({
                success: true,
                message: 'enterprise fetchd successfully!!',
                enterprise: result
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'enterprise not found!!'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error!!'
        })
    }finally {
        connect.release(); // Toujours libérer la connexion
      }
}

export const addEnterprise = async (req, res) => {
    const {
        ICE,
        raison_sociale,
        adresse_siege,
        region,
        province_prefecture,
        taille_entreprise,
        forme_juridique,
        numero_rc,
        identifiant_fiscal,
        numero_cnss,
        point_contact_nom,
        email,
        telephone,
        secteur_entreprise,
        zone_industrielle
    } = req.body
    
    
    if( 
        !ICE ||
        !raison_sociale ||
        !adresse_siege ||
        !region ||
        !province_prefecture ||
        !taille_entreprise ||
        !forme_juridique ||
        !numero_rc ||
        !identifiant_fiscal ||
        !numero_cnss ||
        !telephone ||
        !secteur_entreprise ||
        !zone_industrielle
    ){res.status(400).json({
        success: false,
        message: "All fields are required!"
    })}
    
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL()
        const query = `
        INSERT INTO entreprise(
            ICE, raison_sociale, adresse_siege, region, province_prefecture, taille_entreprise,
            forme_juridique, numero_rc, identifiant_fiscal, numero_cnss, point_contact_nom,
            email, telephone, secteur_entreprise, zone_industrielle
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [response] = await connect.execute(query, 
            [ICE,
            raison_sociale,
            adresse_siege,
            region,
            province_prefecture,
            taille_entreprise,
            forme_juridique,
            numero_rc,
            identifiant_fiscal,
            numero_cnss,
            point_contact_nom,
            email,
            telephone,
            secteur_entreprise,
            zone_industrielle]
        )

        if(response.affectedRows === 1) {
            res.status(201).json({
                success: true,
                message: 'Enterprise added successfully'
            })
        }else {
            res.status(400).json({
                success: false,
                message: 'Error adding Enterprise!'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server Error'
        })
        throw error
    }finally {
        connect.release(); // Toujours libérer la connexion
      }
}

export const updateEnterprise = async (req, res) => {
    const {
        ICE, // This will be the unique identifier to update the enterprise
        raison_sociale,
        adresse_siege,
        region,
        province_prefecture,
        taille_entreprise,
        forme_juridique,
        numero_rc,
        identifiant_fiscal,
        numero_cnss,
        point_contact_nom,
        email,
        telephone,
        secteur_entreprise,
        zone_industrielle
    } = req.body;

    // Ensure that ICE is provided, as it is required to find the enterprise to update
    if (!ICE) {
        return res.status(400).json({
            success: false,
            message: "ICE is required to identify the enterprise",
        });
    }

    // Validate if required fields are present
    if (
        !raison_sociale ||
        !adresse_siege ||
        !region ||
        !province_prefecture ||
        !taille_entreprise ||
        !forme_juridique ||
        !numero_rc ||
        !identifiant_fiscal ||
        !numero_cnss ||
        !point_contact_nom ||
        !email ||
        !telephone ||
        !secteur_entreprise ||
        !zone_industrielle
    ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }

    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion

    try {
        // const connect = await connectSQL(); // Establish database connection
        const query = `
            UPDATE entreprise
            SET 
                raison_sociale = ?, 
                adresse_siege = ?, 
                region = ?, 
                province_prefecture = ?, 
                taille_entreprise = ?, 
                forme_juridique = ?, 
                numero_rc = ?, 
                identifiant_fiscal = ?, 
                numero_cnss = ?, 
                point_contact_nom = ?, 
                email = ?, 
                telephone = ?, 
                secteur_entreprise = ?, 
                zone_industrielle = ?
            WHERE ICE = ?
        `;
        const [response] = await connect.execute(query, [
            raison_sociale,
            adresse_siege,
            region,
            province_prefecture,
            taille_entreprise,
            forme_juridique,
            numero_rc,
            identifiant_fiscal,
            numero_cnss,
            point_contact_nom,
            email,
            telephone,
            secteur_entreprise,
            zone_industrielle,
            ICE, // Identifying the record with ICE to update
        ]);

        if (response.affectedRows === 1) {
            return res.status(200).json({
                success: true,
                message: "Enterprise updated successfully",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Error updating enterprise! The enterprise may not exist.",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }finally {
        connect.release(); // Toujours libérer la connexion
      }
};
