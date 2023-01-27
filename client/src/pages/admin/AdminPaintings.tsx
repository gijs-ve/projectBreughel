import { Painting } from '../../../../types/types';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { addPainting } from '../../utility/functions';
import { useAppSelector } from '../../utility/hooks';
import { selectToken } from '../../store';
export const AdminPaintings = () => {
    const token = useAppSelector(selectToken);

    return <div>ALLE SCHILDERIJEN</div>;
};
