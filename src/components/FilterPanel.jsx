import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter, setPopulationRange } from '../store/filterSlice';
import styled, { keyframes } from 'styled-components';

const slideOut = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
`;

const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

const PanelWrapper = styled.div`
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
    display: flex;
    align-items: center;
`;

const Panel = styled.div`
    background-color: ${({ theme }) => theme.popupBackground};
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    color: ${({ theme }) => theme.popupText};
    transform: translateX(${({ isCollapsed }) => (isCollapsed ? '-100%' : '0')});
    animation: ${({ isCollapsed }) => (isCollapsed ? slideOut : slideIn)} 0.3s ease-in-out;
    position: relative;
`;

const Input = styled.input`
    width: calc(100% - 16px);
    padding: 6px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.textColor};
    box-sizing: border-box;
`;

const Slider = styled.input`
    width: 100%;
    margin-bottom: 8px;
`;

const RangeText = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
`;

const ToggleButton = styled.button`
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.buttonHover};
    }
`;

export const FilterPanel = () => {
    const dispatch = useDispatch();
    const { nameFilter, populationRange } = useSelector((state) => state.filter);
    const cities = useSelector((state) => state.map.cities);

    const [localNameFilter, setLocalNameFilter] = useState(nameFilter);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const populationValues = cities
        .map((city) => city.population)
        .filter((population) => population > 0);

    const minPopulation = populationValues.length > 0 ? Math.min(...populationValues) : 0;
    const maxPopulation = populationValues.length > 0 ? Math.max(...populationValues) : 0;

    const [localPopulationRange, setLocalPopulationRange] = useState([0, Infinity]);

    useEffect(() => {
        if (minPopulation !== 0 && maxPopulation !== 0) {
            setLocalPopulationRange([minPopulation, maxPopulation]);
            dispatch(setPopulationRange([minPopulation, maxPopulation]));
        }
    }, [minPopulation, maxPopulation, dispatch]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(setNameFilter(localNameFilter));
        }, 200);

        return () => clearTimeout(timeoutId);
    }, [localNameFilter, dispatch]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(setPopulationRange(localPopulationRange));
        }, 200);

        return () => clearTimeout(timeoutId);
    }, [localPopulationRange, dispatch]);

    return (
        <PanelWrapper>
            <Panel isCollapsed={isCollapsed}>
                <Input
                    type="text"
                    placeholder="Enter city name..."
                    value={localNameFilter}
                    onChange={(e) => setLocalNameFilter(e.target.value)}
                />
                {minPopulation !== 0 && maxPopulation !== 0 ? (
                    <>
                        <Slider
                            type="range"
                            min={minPopulation}
                            max={maxPopulation}
                            value={localPopulationRange[1]}
                            onChange={(e) =>
                                setLocalPopulationRange([minPopulation, parseInt(e.target.value, 10)])
                            }
                        />
                        <RangeText>
                            <span>Population:</span>
                            <span>
                                {localPopulationRange[0]} - {localPopulationRange[1]}
                            </span>
                        </RangeText>
                    </>
                ) : (
                    <RangeText>Loading population data...</RangeText>
                )}
                <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? '➡️' : '⬅️'}
                </ToggleButton>
            </Panel>
        </PanelWrapper>
    );
};