import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Filter,
    Painter,
    Painting,
    PaintingFilter,
} from '../../../../types/types';
import { getPaintingById } from '../../utility/functions';
import { useAppSelector } from '../../utility/hooks';
import { selectToken } from '../../store';
import { Button } from '../../components/Button';

export const AdminPainting = () => {
    const { id } = useParams();
    const token = useAppSelector(selectToken);
    const [painting, setPainting] = useState<Painting | null>(null);
    const [painters, setPainters] = useState<Painter[] | null>(null);
    const [filters, setFilters] = useState<Filter[] | null>(null);
    const [newFilter, setNewFilter] = useState<number | null>(null);

    useEffect(() => {
        if (!token || !id) return;
        const fetchAllPaintings = async () => {
            const data = await getPaintingById(token, +id);
            if (!data || !data.painting) return;
            setPainting(data.painting);
            if (!data.painters) return;
            setPainters(data.painters);
            if (!data.filters) return;
            setFilters(data.filters);
        };
        fetchAllPaintings();
    }, []);
    if (!painting) return <>Geen schilderij gevonden met dit ID!</>;

    const PainterOptions = () => {
        if (!painters) return <option value={1}>{'Default'}</option>;
        const options = painters.map((i: Painter) => {
            return (
                <option key={i.id} value={i.id}>
                    {i.name}
                </option>
            );
        });
        return options;
    };

    const FilterOptions = () => {
        console.log(painting);
        if (!filters || !painting.paintingfilters) return;

        const filtersOnPainting = painting.paintingfilters.map(
            (i: PaintingFilter) => {
                return i.filter.name;
            },
        );
        console.log(filtersOnPainting);
        const newOptions = filters.filter((i: Filter) => {
            if (filtersOnPainting.length === 0) return true;
            return !filtersOnPainting.includes(i.name);
        });
        const currentOptions = filtersOnPainting.map((i: string) => {
            return <>{i}</>;
        });
        const options = newOptions.map((i: Filter) => {
            return (
                <option key={i.id} value={i.id}>
                    {i.name}
                </option>
            );
        });

        return (
            <div className="flex-col inline-flex justify-center">
                {' '}
                <h1>Huidige filters</h1>
                {currentOptions}
                <h1>Voeg filter toe</h1>
                <select onChange={(e) => setNewFilter(+e.target.value)}>
                    {options}
                </select>
                <Button text="Toevoegen" />
            </div>
        );
    };

    return (
        <div className="flex-col inline-flex justify-center">
            <h1>
                {painting.name} {`(ID ${painting.id}) `}
                door{' '}
                {painting.painter ? painting.painter.name : painting.painterId}
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
                <h1>Schilder</h1>
                <select
                    onChange={(e) =>
                        setPainting({ ...painting, painterId: +e.target.value })
                    }
                >
                    {PainterOptions()}
                </select>
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
            <Button text="Opslaan" onClickEvent={() => console.log(painting)} />
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs space-x-5">
                {FilterOptions()}
            </div>
            <h1>Afbeeldingen</h1>
        </div>
    );
};
