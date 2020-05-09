import React, {useEffect, useState} from "react";

import api from './services/api'
import "./styles.css";

function App() {

  const [respositories, setRepoList] = useState([])

  useEffect(() => {
    const listRepositories = async () => {
      const response = await api.get('/repositories')
      console.log(response);
      setRepoList(response.data);
    }

    listRepositories();
  }, [respositories])

  async function handleAddRepository() {
    await api.post('/repositories', {
      title: "Desafio React",
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map(repo => 
          <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
