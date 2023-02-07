import { Routes, Route } from 'react-router-dom';
import { PaintingList } from './ paintings/PaintingList';
import {Pain}

const Paintings = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<PaintingsList />} />
                <Route path="/:id" element={<PaintingDetails />} />
            </Routes>
        </div>
    );
};

export { Paintings };
