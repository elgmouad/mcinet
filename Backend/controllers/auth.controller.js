import {connectSQL} from '../database/connectDB.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';


export const login = async (req, res) => {
    const {username, password} = req.body; 
    try {
        const  connection = await connectSQL();
        const [rows] = await connection.query(`
            SELECT *, p.nom_profile
            FROM Utilisateur u
            LEFT JOIN Profile p ON u.id_profile = p.id_profile
            WHERE username = ?
            `, [username])
        
        console.log("Logged user : ", rows)
        
        if(rows.length === 0) {
            return res.status(400).json({
                success: false, 
                message: "Identifiants non valides"
            })}

        const userData = rows[0]
        console.log(userData)

        const isPasswordValid = await bcryptjs.compare(password, userData.mot_de_passe)
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "Identifiants non valides"})
        }

        const token = generateTokenAndSetCookie(res, userData.id_utilisateur, userData.id_profile);
        // console.log(token)

        await connection.execute(
            'UPDATE Utilisateur SET lastLogin = ? WHERE id_utilisateur = ?', 
            [new Date(), userData.id_utilisateur])

        const user = {
            id_utilisateur: userData.id_utilisateur,
            nom: userData.nom,
            prenom: userData.prenom,
            username: userData.username,
            email: userData.email,
            statut: userData.statut,
            profile: userData.nom_profile,
            lastLogin: new Date(),
        }
        console.log(
            {
                userData,
                token: token
            }
        )
        return res.status(200).json({
            success: true,
            message: "Logged succefully",
            user: user,
            token: token
        })

    }catch (e) {
        console.log("Error in login: ", e);
        return res.status(400).json({success: false, message: e})
    }
}


export const logout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({success: true, message: "logged out successfully"})
}


export const signup = async (req, res) => {
    const {username, email, password, first_name, last_name, phone, status, profile} = req.body
    try {

        const  connection = await connectSQL();

        const [existingUser] = await connection.query(
            'SELECT * from Utilisateur WHERE username = ? OR email = ?',
            [username, email]
        );

        if(existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'User aleady exists'
            })
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

        const checkProfile = () => {
            switch (profile) {
                case 'Directeur':
                    return 1;
                case 'Cadre':
                    return 2;
                case 'Chef de Service':
                    return 3;
                case 'Secritaire':
                    return 4;
                default:
                    throw new Error('Invalid profile type');
            }
        }

        await connection.execute(
            'INSERT INTO Utilisateur (nom, prenom, username, email, Numero_tel, mot_de_passe, statut, verification_code, verification_code_expires_at, id_profile, date_creation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, username, email, phone, hashPassword, status, verificationToken, verificationTokenExpiredAt, checkProfile(), new Date()]
        )
        // generateVerificationCode(res, )

        return res.status(201).json({
            success: true,
            message: "User created successfully"
        })

    }catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}


export const verifyToken = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        return res.status(401).json({
            message: 'Access denied, no token found'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        res.json({
            valid: true,
            user: req.user
        })
    } catch (error) {
        res.status(400).json({
            message: 'Invalid token'
        })
    }
}







