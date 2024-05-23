import './estilo.css'
import 'rsuite/dist/rsuite.min.css';
import { useEffect } from 'react';
import { Table } from 'rsuite';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import apiurl from '../../service/apiurl';

const { Column, HeaderCell, Cell } = Table;


const Tabela = ({ query, setOnEdit, getPessoas, pessoas, setPessoas }) => {



    const handleEdit = async (item) => {
        console.log('handle edit', item.id);
        console.log('handle edit', item.nome);
        console.log('handle edit', item.telefone);
        console.log('handle edit', item.email);
        setOnEdit(item)
    }

    const deletarPessoa = async (pessoa) => {
            await apiurl
            .delete('' + pessoa.id)
            .then(({ data }) => {
                const vetor = pessoas.filter((pessoas) => pessoas.id !== pessoa.id);
                setPessoas(vetor);

            })
            .catch(({ data }) => console.log(data))
        
    }

    const handleDelete = async (pessoa) => {
        console.log('estamos no handleDelete', pessoa.id);

            Swal.fire({
                title: `Deseja excluir ${pessoa.nome}?`,
                showCancelButton: true,
                confirmButtonText: "Sim",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    console.log('result',result)
                    deletarPessoa(pessoa)
                    Swal.fire("Pessoa excluída", "", "success");
                }
            })


        setOnEdit(null);
    }

    useEffect(() => {
        getPessoas();
    }, [getPessoas]);

    return (
        <>
            <Table
                className='tabela'
                height={400}
                width={820}
                data={pessoas.filter(elementos => {
                    if (query === '') {
                        return elementos
                    } else if (elementos.nome.toLowerCase().includes(query.toLowerCase())) {
                        return elementos
                    } else if (elementos.telefone.includes(query)) {
                        return elementos
                    }
                })

                }
                onRowClick={rowData => {
                    console.log('rowData: ', rowData);
                }}
            >
                <Column width={60} align="center" fixed>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={150}>
                    <HeaderCell>Nome</HeaderCell>
                    <Cell dataKey="nome" />
                </Column>


                <Column width={150}>
                    <HeaderCell>telefone</HeaderCell>
                    <Cell dataKey="telefone" />
                </Column>

                <Column width={300}>
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column width={80} fixed="right">
                    <HeaderCell>...</HeaderCell>

                    <Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <FaEdit onClick={() => {
                                handleEdit(rowData)
                            }} />
                        )}
                    </Cell>
                </Column>
                <Column width={80} fixed="right">
                    <HeaderCell>...</HeaderCell>

                    <Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <FaTrash onClick={() => {
                                handleDelete(rowData);

                            }} />
                        )}
                    </Cell>
                </Column>
            </Table>
        </>
    )
}

export default Tabela