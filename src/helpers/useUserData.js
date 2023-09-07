import { useQuery } from 'react-query';

export const useUserData = (userId) => {
    const userData = useQuery(['user', userId], async () => {
        const res = await fetch(`/api/users/${userId}`);
        return res.json();
    })
    return userData;
}