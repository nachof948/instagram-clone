export interface IFormData{
    username?: string
    email?: string
    completeName?: string
    password?: string
}
export interface ISideBarItem {
    icon: JSX.Element;
    text: string;
}
// Definición de la interfaz IUser para el frontend
export interface IUser {
    _id?: string; 
    username?: string;
    email?: string;
    completeName?: string;
    password?: string; 
    profilePicture?: string;
    bio?: string;
    gender?: "male" | "female" | "other";
    followers?: string[]; 
    following?: string[]; 
    posts?: string[]; 
    bookmarks?: string[]; 
    createdAt?: string;
    updatedAt?: string; 
}
