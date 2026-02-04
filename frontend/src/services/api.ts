import type {User} from "../types/user"

export const getProfile = async(): Promise<User> =>{
    const res = await fetch ('/api/profile');
    return res.json();
}