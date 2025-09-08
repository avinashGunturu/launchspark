
import React, { createContext, useContext, useState, ReactNode } from 'react';
import SuccessPopup from './SuccessPopup';
import FailureModal from './FailureModal';

interface NotificationContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const showSuccess = (message: string) => {
        setSuccessMessage(message);
    };

    const showError = (message: string) => {
        setErrorMessage(message);
    };

    const closeSuccess = () => setSuccessMessage(null);
    const closeError = () => setErrorMessage(null);

    return (
        <NotificationContext.Provider value={{ showSuccess, showError }}>
            {children}
            {successMessage && <SuccessPopup message={successMessage} onClose={closeSuccess} />}
            {errorMessage && <FailureModal message={errorMessage} onClose={closeError} />}
        </NotificationContext.Provider>
    );
};

export const useNotifications = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
