'use client';
import React from 'react';

interface CardProps {
    headerClasses: string;
    bodyClasses: string;
    footerClasses: string;
}

const Card = ({headerClasses, bodyClasses, footerClasses}: CardProps) => {
    return (
        <>
            <div>
                <div id="header" className={ headerClasses } ></div>
                <div id="body" className={ bodyClasses }></div>
                <div id="footer" className={ footerClasses }></div>
            </div>
        </>
    )
}