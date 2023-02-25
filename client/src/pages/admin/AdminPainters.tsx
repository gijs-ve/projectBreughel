import { Button } from '../../components/Button';
import { addPainter } from '../../utility/functions';
import axios from 'axios';
import { selectToken } from '../../store';
import { useAppSelector } from '../../utility/hooks';
import { useState } from 'react';
export const AdminPainters = () => {
    return (
        <div>
            <AddPainter />
        </div>
    );
};

const AddPainter = () => {
    const token = useAppSelector(selectToken);
    const [name, setName] = useState<string>('');
    const placePainter = () => {
        if (!token) return;
        const newPainter = addPainter(token, name);
    };
    return (
        <div>
            <h1>Nieuwe schilder</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <Button text="Voeg toe" onClickEvent={() => placePainter()} />
        </div>
    );
};
