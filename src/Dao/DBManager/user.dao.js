import User from "../../models/user.model.js"

class UserDAO {
  async createUser(userData) {
    try {
      // Crear un nuevo usuario en la base de datos
      return await User.create(userData);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      // Obtener un usuario por su ID desde la base de datos
      return await User.findById(userId);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, newData) {
    try {
      // Actualizar un usuario en la base de datos
      return await User.findByIdAndUpdate(userId, newData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      // Eliminar un usuario de la base de datos
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      // Obtener un usuario por su correo electrónico desde la base de datos
      return await User.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmailOrUsername(email, username) {
    try {
      return await User.findOne({
        $or: [
          { email: email },
          { username: username }
        ]
      });
    } catch (error) {
      throw error;
    }
  }
  
}

export default UserDAO;
