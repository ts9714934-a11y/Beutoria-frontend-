
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full text-center py-4 border-t border-gray-200 mt-auto">
            <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Beutoria. All rights reserved. Analysis is for entertainment purposes only.
            </p>
        </footer>
    );
}
