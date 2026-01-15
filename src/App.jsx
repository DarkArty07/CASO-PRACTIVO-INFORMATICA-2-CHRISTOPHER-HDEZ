import { useState, useEffect } from 'react';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import Pagination from './components/Pagination';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Estado para la vista (lista o detalle)
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Si es null, mostramos lista. Si tiene objeto, mostramos detalle.

  // Efecto para cargar personajes cuando cambia la página
  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    setLoading(true);
    setError(null);
    try {
      // Endpoint con paginación (Puntos extra: limit=10)
      const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=10`);

      if (!response.ok) {
        throw new Error('Error al cargar datos');
      }

      const data = await response.json();

      // La API devuelve { items: [], meta: {}, links: {} }
      setCharacters(data.items);
      setTotalPages(data.meta.totalPages);

    } catch (err) {
      console.error(err);
      setError('Hubo un error al conectar con la API de Dragon Ball.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar click en personaje para ir a detalles
  const handleSelectCharacter = async (character) => {
    // Requerimiento: Mostrar detalles incluyendo KI y Descripción.
    // La lista ya trae estos datos, pero si quisiéramos ser estrictos con el endpoint /characters/id:
    setLoading(true);
    try {
      const response = await fetch(`https://dragonball-api.com/api/characters/${character.id}`);
      const detailedData = await response.json();
      setSelectedCharacter(detailedData);
    } catch (err) {
      console.error(err);
      // Si falla el detalle, usamos los datos que ya teníamos de la lista como fallback
      setSelectedCharacter(character);
    } finally {
      setLoading(false);
    }
  };

  // Manejar botón regresar
  const handleBack = () => {
    setSelectedCharacter(null);
  };

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="App">
      <h1>Dragon Ball API</h1>

      {loading && <p>Cargando Kames...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          {selectedCharacter ? (
            // VISTA DETALLE
            <CharacterDetail
              character={selectedCharacter}
              onBack={handleBack}
            />
          ) : (
            // VISTA LISTA
            <>
              <CharacterList
                characters={characters}
                onSelectCharacter={handleSelectCharacter}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
