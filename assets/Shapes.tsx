import React from 'react';

type ShapeProps = React.SVGProps<SVGSVGElement>;

export const ShapeLeftDown: React.FC<ShapeProps> = (props) => (
    <svg width="189" height="79" viewBox="0 0 189 79" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M46.3901 79H-34V-4H90.58C71.3857 3.86667 46.3901 27.6 46.3901 79Z" fill="currentColor"/>
    </svg>
);


export const ShapeRightUp: React.FC<ShapeProps> = (props) => (
    <svg width="222" height="80" viewBox="0 0 222 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M152.17 0H252V83H128.59C147.784 75.1333 172.779 51.4 172.779 0H152.17Z" fill="currentColor"/>
    </svg>
);