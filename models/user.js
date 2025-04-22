// models/user.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/**
 * Ajoute un nouvel utilisateur dans la base.
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe en clair.
 * @param {string} nom - Le nom de l'utilisateur.
 * @param {string} prenom - Le prénom de l'utilisateur.
 * @param {string} username - Le nom d'utilisateur.
 * @returns {Promise<Object>} L'utilisateur créé.
 */
export const addUser = async (email, password, nom, prenom, username) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, password: hashedPassword, nom, prenom, username, type: "USER" }
  });
};


/**
 * Récupère un utilisateur en fonction de son email.
 * @param {string} email - L'email de l'utilisateur à rechercher.
 * @returns {Promise<Object|null>} L'utilisateur trouvé ou null.
 */
export const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Récupère un utilisateur par son ID.
 * @param {number} id - L'identifiant de l'utilisateur.
 * @returns {Promise<Object|null>} L'utilisateur trouvé ou null.
 */
export const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

/**
 * Met à jour les informations d'un utilisateur.
 * @param {number} id - L'ID de l'utilisateur à mettre à jour.
 * @param {Object} newData - L'objet contenant les nouvelles informations.
 * @returns {Promise<Object>} L'utilisateur mis à jour.
 */
export const updateUser = async (id, newData) => {
  return prisma.user.update({
    where: { id: id },
    data: newData,
  });
};

/**
 * Supprime un utilisateur par son ID.
 * @param {number} id
 * @returns {Promise<Object>}
 */
export const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id },
  });
};