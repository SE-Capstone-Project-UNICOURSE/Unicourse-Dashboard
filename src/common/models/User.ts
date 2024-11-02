export interface Lecturer {
    id: number;
    full_name: string;
    email: string;
    phone_num: string | null;
    title: string | null;
    date_of_birth: string | null;
    profile_image: string;
    is_blocked: boolean;
    info_description: string;
    skill_json: SkillJson;
    user: User;
}

export interface Mentor {
    id: number;
    info_description: string;
    skill_json: any;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    user?: User;
  }

export interface User {
    id: number;
    full_name: string;
    email: string;
    phone_num: string | null;
    title: string | null;
    date_of_birth: string | null;
    profile_image: string;
    is_blocked: boolean;
}

export interface SkillJson {
    skills: Skill[];
    certifications: Certification[];
}

export interface Skill {
    name: string;
    level: string;
}

export interface Certification {
    name: string;
    year: number;
}