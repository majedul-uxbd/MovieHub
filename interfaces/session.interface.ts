export interface UserSession {
    id: string,
    user_id: string,
    firstName: string,
    lastName: string,
    position: string,
    role: string,
    profile_img: string | null,
}