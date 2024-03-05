export const generateUserErrorInfo = (user) => {
  return `Una o más propiedades fueron enviadas incompletas o no son validas. Lista de propiedades requeridas: -> first_name: typeString, recibido ${user.first_name} -> email: type String, recibido: ${user.email}`
};
