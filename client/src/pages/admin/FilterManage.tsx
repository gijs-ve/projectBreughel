import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../../config/constants';

const FilterManage = () => {
    const [filters, setFilters] = useState<[] | string[]>([]);
    useEffect(() => {
        const data = axios.get<string | undefined>(
            `${apiUrl}/painting/getFilters`,
        );
    }, []);
    return <></>;
};
