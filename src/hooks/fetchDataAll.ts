import { AUTH_API } from "_apis/api-endpoint";
import { useEffect, useState } from "react"
import axios from 'utils/axios';

export const GetAllUser = (refresh?:any) => {
    const [dataUser, setDataUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/showAllUser`);
                setDataUser([...res.data.data]);
                setLoading(false);
            } catch (e) { }
        };
        fetchData()
      }, [])

    return { dataUser, loading }
}

export const GetRole = () => {
    const [dataRole, setRole] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.post(`/viewRole`);
                setRole(res.data.data);
                setLoading(false);
            } catch (e) { }
        };
        fetchData()
      }, [])

    return { dataRole, loading }
}


    export const DeleteUser = (id_user: number , handleCloseDelete: (status: boolean) => void) => {

    const hanldDelete = async () => {
        try {
            await axios.post(`${AUTH_API.DeleteUser}?id_user=${id_user}`);
            handleCloseDelete(true)
        } catch (e) { }
    };

    return { hanldDelete }
}