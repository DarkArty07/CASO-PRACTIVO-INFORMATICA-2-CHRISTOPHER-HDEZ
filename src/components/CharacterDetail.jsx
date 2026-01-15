import React from 'react';

function CharacterDetail({ character, onBack }) {
    return (
        <div className="character-detail">
            <img src={character.image} alt={character.name} />

            <div className="detail-info">
                <h2>{character.name}</h2>
                <p className="ki">KI: {character.ki}</p>
                <p><strong>Descripción:</strong></p>
                <p>{character.description}</p>

                <p><strong>Raza:</strong> {character.race}</p>
                <p><strong>Género:</strong> {character.gender}</p>

                <button className="back-button" onClick={onBack}>
                    Regresar a la lista
                </button>
            </div>
        </div>
    );
}

export default CharacterDetail;
