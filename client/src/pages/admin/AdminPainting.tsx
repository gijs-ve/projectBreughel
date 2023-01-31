import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Painting } from '../../../../types/types';
import { getPaintingById } from '../../utility/functions';
import { useAppSelector } from '../../utility/hooks';
import { selectToken } from '../../store';

export const AdminPainting = () => {
    const { id } = useParams();
    const token = useAppSelector(selectToken);
    const [painting, setPainting] = useState<Painting | null>(null);
    useEffect(() => {
        if (!token || !id) return;
        const fetchAllPaintings = async () => {
            const data = await getPaintingById(token, +id);
            if (!data || !data.painting) return;
            setPainting(data.painting);
        };
        fetchAllPaintings();
    }, []);
    if (!painting) return <>Geen schilderij gevonden met dit ID!</>;
    return (
        <div className="flex-col inline-flex justify-center">
            <h1>
                {painting.name} {`(ID ${painting.id}) `}
                door {painting.painterId}
            </h1>
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs space-x-5">
                <h1>Naam</h1>
                <input
                    type="text"
                    value={painting.name}
                    onChange={(e) =>
                        setPainting({ ...painting, name: e.target.value })
                    }
                />
            </div>
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs space-x-5">
                <h1>Lengte</h1>
                <input
                    type="number"
                    value={painting.height}
                    onChange={(e) =>
                        setPainting({ ...painting, height: +e.target.value })
                    }
                />
            </div>
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs space-x-5">
                <h1>Breedte</h1>
                <input
                    type="number"
                    value={painting.width}
                    onChange={(e) =>
                        setPainting({ ...painting, width: +e.target.value })
                    }
                />
            </div>
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs space-x-5">
                <h1>Prijs</h1>
                <input
                    type="number"
                    value={painting.price}
                    onChange={(e) =>
                        setPainting({ ...painting, price: +e.target.value })
                    }
                />
            </div>
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs pr-36">
                <h1 className="pr-12">Zichtbaar?</h1>
                <input
                    type="checkbox"
                    defaultChecked={painting.isApproved}
                    onChange={() =>
                        setPainting({
                            ...painting,
                            isApproved: !painting.isApproved,
                        })
                    }
                />
            </div>
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs pr-36">
                <h1 className="pr-12">Te koop?</h1>
                <input
                    type="checkbox"
                    defaultChecked={painting.isPurchasable}
                    onChange={() =>
                        setPainting({
                            ...painting,
                            isApproved: !painting.isPurchasable,
                        })
                    }
                />
            </div>
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs pr-36">
                <h1 className="pr-12">Verkocht?</h1>
                <input
                    type="checkbox"
                    defaultChecked={painting.isSold}
                    onChange={() =>
                        setPainting({
                            ...painting,
                            isApproved: !painting.isSold,
                        })
                    }
                />
            </div>

            <h1>Afbeeldingen</h1>
        </div>
    );
};
