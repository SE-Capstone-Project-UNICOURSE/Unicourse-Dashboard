interface User {
  id: number;
  email: string;
  full_name: string;
  date_of_birth: string | null;
  role: 'STUDENT' | 'LECTURER' | 'MENTOR' | 'ADMIN';
  profile_image: string;
  title: string | null;
  phone_num: string | null;
  address: string | null;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
  password: string | null;
  lecturer: any | null;
  mentor: any | null;
  student: Student | null;
  admin: any | null;
  wallet: Wallet;
  iat: number;
  exp: number;
}

interface Wallet {
  balance: number;
  created_at: string;
  updated_at: string;
}

interface Student {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  device_token: string | null;
  wishlist: any[]; // Adjust type if the structure of wishlist items is known
}

export default User;
