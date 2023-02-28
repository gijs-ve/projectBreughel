import {
    Filter,
    Painter,
    Painting,
    PaintingFilter,
    Props,
} from '../../../../types/types';
import {
    addFilterToPainting,
    editPaintingById,
    getPaintingById,
} from '../../utility/functions';
import { useEffect, useRef, useState } from 'react';

import { Button } from '../../components/Button';
import { Cloudinary } from './Cloudinary';
import { selectToken } from '../../store';
import { useAppSelector } from '../../utility/hooks';
import { useParams } from 'react-router-dom';

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
        <div className="flex flex-inline px-96">
            <table className="table-fixed">
                <tr>
                    {painting.name} {`(ID ${painting.id}) `}
                    door{' '}
                    {painting.painter
                        ? painting.painter.name
                        : painting.painterId}
                </tr>
                <tr className="">
                    <td className="w-40">Naam</td>
                    <td className="w-32">
                        <input
                            type="text"
                            value={painting.name}
                            onChange={(e) =>
                                setPainting({
                                    ...painting,
                                    name: e.target.value,
                                })
                            }
                        />
                    </td>
                </tr>
                <tr className="">
                    <td>Schilder</td>
                    <td>
                        <select
                            defaultValue={painting.painterId}
                            onChange={(e) =>
                                setPainting({
                                    ...painting,
                                    painterId: +e.target.value,
                                })
                            }
                        >
                            <PainterOptions painters={painters} />
                        </select>
                    </td>
                </tr>

                <tr className="">
                    <td>Lengte</td>
                    <td>
                        <input
                            type="number"
                            value={painting.height}
                            onChange={(e) =>
                                setPainting({
                                    ...painting,
                                    height: +e.target.value,
                                })
                            }
                        />
                    </td>
                </tr>
                <tr className="">
                    <td>Breedte</td>
                    <td>
                        <input
                            type="number"
                            value={painting.width}
                            onChange={(e) =>
                                setPainting({
                                    ...painting,
                                    width: +e.target.value,
                                })
                            }
                        />
                    </td>
                </tr>
                <tr className="">
                    <td>Prijs</td>
                    <td>
                        <input
                            type="number"
                            value={painting.price}
                            onChange={(e) =>
                                setPainting({
                                    ...painting,
                                    price: +e.target.value,
                                })
                            }
                        />
                    </td>
                </tr>
                <tr className="">
                    <td>Zichtbaar?</td>
                    <td>
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
                    </td>
                </tr>
                <tr>
                    <td>Te koop?</td>
                    <td>
                        <input
                            type="checkbox"
                            defaultChecked={painting.isPurchaseable}
                            onChange={() =>
                                setPainting({
                                    ...painting,
                                    isPurchaseable: !painting.isPurchaseable,
                                })
                            }
                        />
                    </td>
                </tr>
                <tr>
                    <td>Verkocht?</td>
                    <td>
                        <input
                            type="checkbox"
                            defaultChecked={painting.isSold}
                            onChange={() =>
                                setPainting({
                                    ...painting,
                                    isSold: !painting.isSold,
                                })
                            }
                        />
                    </td>
                </tr>
                <tr>
                    <Button
                        text="Opslaan"
                        onClickEvent={() =>
                            handleSaveClick(token, id, painting)
                        }
                    />
                </tr>
                <tr>
                    <td>
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
                    </td>
                </tr>
                <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs space-x-5">
                    <ImageSection />
                </div>
            </table>
        </div>
    );
};

const PainterOptions = (p: Props) => {
    const { painters } = p;
    if (!painters)
        return <option value={1}>{'Geen schilders gevonden!'}</option>;
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

const ImageSection = () => {
    const [file, setFile] = useState<any>(null);
    const handleFileInput = (e: any) => {
        setFile(e.target.files[0]);
    };
    return (
        <>
            <Cloudinary />
            {/* <h1>Afbeeldingen</h1>
            <div className="file-uploader">
                <input type="file" onChange={(e) => handleFileInput(e)} />
            </div>
            <Button
                text="Voeg afbeelding toe"
                onClickEvent={() => console.log(file)}
            /> */}
        </>
    );
};
