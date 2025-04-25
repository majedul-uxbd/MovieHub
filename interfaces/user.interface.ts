export interface User {
    id: number;
    f_name: string;
    l_name: string;
    email: string;
    contact_no: string;
    role: string;
    company: string;
    position: string;
    profile_img: string | null;
    is_user_active: number;
    created_at: string;
    updated_at: string;
}