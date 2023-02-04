import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Filter,
    Painter,
    Painting,
    PaintingFilter,
    Props,
} from '../../../../types/types';
import {
    getPaintingById,
    addFilterToPainting,
    addFilter,
    editPaintingById,
} from '../../utility/functions';
import { useAppSelector } from '../../utility/hooks';
import { selectToken } from '../../store';
import { Button } from '../../components/Button';

export const AdminPainting = () => {
    const { id } = useParams();
    const token = useAppSelector(selectToken);
    const [painting, setPainting] = useState<Painting | null>(null);
    const [painters, setPainters] = useState<Painter[] | undefined>(undefined);
    const [filters, setFilters] = useState<Filter[] | null>(null);

    const fetchPainting = async (token: string, id: string) => {
        if (!token || !id) return;
        const data = await getPaintingById(token, +id);
        if (!data || !data.painting) return;
        setPainting(data.painting);
        if (!data.painters) return;
        setPainters(data.painters);
        if (!data.filters) return;
        setFilters(data.filters);
        console.log('fetchPainting');
    };
    useEffect(() => {
        if (!token || !id) return;
        fetchPainting(token, id);
    }, []);
    if (!painting) return <>Geen schilderij gevonden met dit ID!</>;

    const handleSaveClick = (
        token: string | null,
        id: string | undefined,
        painting: Painting,
    ) => {
        if (!token || !id) return;
        const adjustedPainting: Painting = {
            name: painting.name,
            id: painting.id,
            isApproved: painting.isApproved,
            isPurchaseable: painting.isPurchaseable,
            isSold: painting.isSold,
            height: painting.height,
            width: painting.width,
            price: painting.price,
            painterId: painting.painterId,
        };
        editPaintingById(token, Number(id), adjustedPainting);
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
                    <PainterOptions painters={painters} />
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
                    defaultChecked={painting.isPurchaseable}
                    onChange={() =>
                        setPainting({
                            ...painting,
                            isApproved: !painting.isPurchaseable,
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
            <Button
                text="Opslaan"
                onClickEvent={() => handleSaveClick(token, id, painting)}
            />
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs space-x-5">
                {filters ? (
                    <FilterOptions
                        filters={filters}
                        painting={painting}
                        functions={{ fetchPainting }}
                        id={id}
                    />
                ) : (
                    <></>
                )}
            </div>
            <h1>Afbeeldingen</h1>
        </div>
    );
};

const VisibleOnMain = (p: Props) => {
    const token = useAppSelector(selectToken);
    // const { painting, id, favorites } = p;
    // const [isFavorite, setIsFavorite] = useState<boolean>(false);
    // const currentFavorites = favorites.map((i: number))
    // useEffect(() => {
    //     setIsFavorite(favorite
};

const PainterOptions = (p: Props) => {
    const { painters } = p;
    if (!painters) return <option value={1}>{'Default'}</option>;
    const options = painters.map((i: Painter) => {
        return (
            <option key={i.id} value={i.id}>
                {i.name}
            </option>
        );
    });
    return <>{options}</>;
};

const FilterOptions = (p: Props) => {
    const token = useAppSelector(selectToken);
    const [newFilters, setNewFilters] = useState<Filter[] | null>(null);
    const [filtersOnPainting, setFiltersOnPainting] = useState<string[] | null>(
        null,
    );
    const { filters, painting, functions, id } = p;
    useEffect(() => {
        if (!painting || !filters || !painting.paintingfilters) return;
        const currentOptions = painting.paintingfilters.map(
            (i: PaintingFilter) => {
                return i.filter.name;
            },
        );
        const newOptions = filters
            .filter((i: Filter) => {
                if (currentOptions.length === 0) return true;
                return !currentOptions.includes(i.name);
            })
            .map((i: Filter) => {
                return { ...i, status: false };
            });
        setNewFilters(newOptions);
        setFiltersOnPainting(currentOptions);
    }, [filters]);
    console.log(painting);
    if (
        !painting ||
        !filters ||
        !painting.paintingfilters ||
        !filtersOnPainting ||
        !newFilters
    )
        return <></>;

    const currentOptions = filtersOnPainting.map((i: string) => {
        return <div key={i}>{i}</div>;
    });
    const handleOnChange = (id: number) => {
        const modifiedFilters = newFilters.map((i: Filter) => {
            if (i.id === id) return { ...i, status: !i.status };
            return i;
        });
        setNewFilters(modifiedFilters);
    };
    const options = newFilters.map((i: Filter) => {
        return (
            <div key={i.id}>
                <input
                    type="checkbox"
                    defaultChecked={i.status}
                    onChange={() => handleOnChange(i.id)}
                />
                {i.name}
            </div>
        );
    });

    const addFilterAndFetch = async () => {
        if (
            !token ||
            !painting.id ||
            !newFilters ||
            !functions ||
            !functions.fetchPainting
        )
            return;
        const newPainting = await addFilterToPainting(
            token,
            painting.id,
            newFilters,
        );
        console.log(newPainting);
        if (!newPainting) return;
        functions.fetchPainting(token, id);
    };
    return (
        <div className="flex-col inline-flex justify-center">
            {' '}
            <div className="flex-col inline-flex justify-center">
                <h1>Huidige filters</h1>
                {currentOptions}
            </div>
            <h1>Voeg filter toe</h1>
            {options}
            <Button text="Toevoegen" onClickEvent={() => addFilterAndFetch()} />
        </div>
    );
};
