
import styled from "styled-components"

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const QueryBusca = ({ setQuery }) => {

    return (
        <div>
            <Input placeholder=" Busque a Pessoa" onChange={event => setQuery(event.target.value)} />
            <span>  Busque a partir do nome ou telefone    </span>
        </div>
    )
}

export default QueryBusca