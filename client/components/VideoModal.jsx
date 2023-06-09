import React, { useEffect, useState } from 'react';

const AddLessons = ({ isOpen, onClose, children }) => {
    const [modalOpen, setModalOpen] = useState(isOpen);

    const closeModal = () => {
        setModalOpen(false);
        onClose();
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    if (!modalOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default AddLessons;
