'use client'

import { useSession } from "next-auth/react";
import { USER } from "@/app/utils/types";
import { useState, useEffect } from "react";
import { axiosInstance } from '@/app/hooks/useAxios';

export default function useClientUser(): USER | null | undefined {
    const { data: session, status } = useSession({
        required: false
    });
    const [user, setUser] = useState<USER | null | undefined>(undefined);

    useEffect(() => {
        
        if (status === 'loading') return;
        
        if (!session?.user) {
            setUser(null);
            return;
        }
        // if (user) {
        //     console.log("User profile data:", user);
        //   }
        // }, [user]);
        
        // Fetch the complete user profile from your API
        const fetchUserProfile = async () => {
            try {
                const baseUrl = window.location.origin;
                // const response = await axiosInstance.get('/api/users/profile', {
                //     headers: {
                //         'Authorization': `Bearer ${session.user.token}`
                //     }
                // });
                const response = await fetch(`${baseUrl}/api/users/profile`, {
                    headers: {
                        'Authorization': `Bearer ${session.user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                setUser(data);
                // setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                
                // Fallback to session data if API call fails
                setUser({
                    _id: session.user.id,
                    firstName: session.user.name?.split(' ')[0] || '',
                    lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
                    email: session.user.email,
                    role: session.user.role,
                    createdAt: new Date().toISOString()
                });
            }
        };
        
        fetchUserProfile();
    }, [session, status]);

    return user;
}