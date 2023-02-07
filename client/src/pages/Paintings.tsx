import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getPageCount } from '../store';
import { useAppDispatch } from '../utility/hooks';
import { PaintingsList, PaintingDetails } from './ paintings';

export const Paintings = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPageCount());
    }, []);
    return (
        <div>
            <Routes>
                <Route path="/" element={<PaintingsList />} />
                <Route path="/:id" element={<PaintingDetails />} />
            </Routes>
        </div>
    );
};
