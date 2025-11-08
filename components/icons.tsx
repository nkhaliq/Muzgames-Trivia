
import React from 'react';

export const TriangleIcon = () => (
    <svg width="40" height="40" viewBox="0 0 100 100">
        <polygon points="50,15 100,85 0,85" fill="white" />
    </svg>
);

export const DiamondIcon = () => (
    <svg width="40" height="40" viewBox="0 0 100 100">
        <polygon points="50,0 100,50 50,100 0,50" fill="white" />
    </svg>
);

export const CircleIcon = () => (
    <svg width="40" height="40" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="white" />
    </svg>
);

export const SquareIcon = () => (
    <svg width="40" height="40" viewBox="0 0 100 100">
        <rect width="80" height="80" x="10" y="10" fill="white" />
    </svg>
);

export const ShapeIcon = ({ shape }: { shape: string }) => {
    switch (shape) {
        case 'triangle': return <TriangleIcon />;
        case 'diamond': return <DiamondIcon />;
        case 'circle': return <CircleIcon />;
        case 'square': return <SquareIcon />;
        default: return null;
    }
};
