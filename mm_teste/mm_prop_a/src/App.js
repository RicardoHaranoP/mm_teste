import GlobalStyle from "./styles/global.js"
import styled from "styled-components";
import { useState } from "react";
import Header from './componentes/Header'
import Tabela from './componentes/Tabela'
import Form from './componentes/Form'
import QueryBusca from "./componentes/QueryBusca/index.js";
import apiurl from './service/apiurl.js'

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;  
`
const ContainerTabela = styled.div`
  display: flex;
  justify-content: center;
`
const ContainerBusca = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`

const Title = styled.h2``

function App() {
  const [onEdit, setOnEdit] = useState(null);

  const [pessoas, setPessoas] = useState([]);
  const [query, setQuery] = useState("")

  const getPessoas = async () => {
    try {
      const res = await apiurl.get()
      setPessoas(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header />
      <Container>
        <Title>CADASTRO</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getPessoas={getPessoas} />
      </Container>
      <ContainerBusca>
        <QueryBusca setQuery={setQuery} />
      </ContainerBusca>
      <ContainerTabela>

        <Tabela query={query} setOnEdit={setOnEdit} getPessoas={getPessoas} pessoas={pessoas} setPessoas={setPessoas} />
      </ContainerTabela>
      <GlobalStyle />
    </div>
  );
}

export default App;
