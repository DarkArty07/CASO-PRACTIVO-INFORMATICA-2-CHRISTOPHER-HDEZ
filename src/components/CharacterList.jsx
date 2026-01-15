import React from 'react';

function CharacterList({ characters, onSelectCharacter }) {
    return (
        <div className="character-grid">
            {characters.map((character) => (
                <div
                    key={character.id}
                    className="character-card"
                    onClick={() => onSelectCharacter(character)}
                >
                    <img src={character.image} alt={character.name} />
                    <h3>{character.name}</h3>
                    <p>{character.race} - {character.gender}</p>
                </div>
            ))}
        </div>
    );
}

export default CharacterList;
