import { Button } from '../../components/Button';
import { useState } from 'react';
export const AdminPainters = () => {
    return (
        <div>
            <AddPainter />
        </div>
    );
};

const AddPainter = () => {
    const [name, setName] = useState<string>('');
    return (
        <div>
            <h1>Nieuwe schilder</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <Button text="Voeg toe" />
        </div>
    );
};
