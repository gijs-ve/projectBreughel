import { AdminPainting } from './AdminPainting';
import { PaintingTable } from '../../components/PaintingTable';
import {Route, Routes} from 'react-router-dom'


export const AdminPaintings = () => {
    
    

    return (
        <div>
            
            <Routes>
        <Route
          path="/"
          element={<PaintingTable />}
        />
        <Route
          path="/:id"
          element={<AdminPainting />}
        />
      </Routes>
        </div>
    );
};
