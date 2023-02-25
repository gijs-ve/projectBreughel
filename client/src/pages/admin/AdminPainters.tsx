import { addPainter, getPainters } from '../../utility/functions';
import { useEffect, useState } from 'react';

import { Button } from '../../components/Button';
import { Painter } from '../../../../types/types';
import axios from 'axios';
import { selectToken } from '../../store';
import { useAppSelector } from '../../utility/hooks';

export const AdminPainters = () => {
    const token = useAppSelector(selectToken);
    const [painters, setPainters] = useState<any[]>([]);
    useEffect(() => {
        if (!token) return;
        const fetchPainters = async (token: string) => {
            const response: any = await getPainters(token);
            console.log(response);
            setPainters(response.data.painters);
        };
        fetchPainters(token);
    }, []);

    console.log(painters);
    return (
        <div>
            <AddPainter />
            <PainterList painters={painters} />
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

const PainterList = (p: { painters: Painter[] }) => {
    const { painters } = p;
    const mappedPainters = painters.map((i: Painter) => {
        return (
            <>
                <h1>{i.name}</h1>
                <RemoveButton id={i.id} />
            </>
        );
    });
    const RemoveButton = (p: { id: number }) => {
        const { id } = p;
        return <Button text="Verwijder schilder" onClickEvent={() => {}} />;
    };
    return <>{mappedPainters}</>;
};
