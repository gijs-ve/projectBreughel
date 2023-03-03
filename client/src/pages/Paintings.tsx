import { Routes, Route } from 'react-router-dom';
import { PaintingsList, PaintingDetails } from './paintings';

export const Paintings = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<PaintingsList />} />
                <Route path="/:id" element={<PaintingDetails />} />
            </Routes>
        </div>
    );
};
