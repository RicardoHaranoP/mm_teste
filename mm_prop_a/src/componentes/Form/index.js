import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';
import apiurl from "../../service/apiurl";


const FormContainer = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;


const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ onEdit, setOnEdit, getPessoas }) => {
    const ref = useRef()
    const [auxiliarTelefone, setAuxiliarTelefone] = useState('')
    let valid = true;
    function isCamposValid(pessoa) {

        validarTelefone(pessoa.telefone.value)
        validarEmail(pessoa.email.value,);
        camposVazios(pessoa);


        return valid
    }

    function camposVazios(pessoa) {
        //verifica se campos estão preenchidos
        if (
            !pessoa.nome.value ||
            !pessoa.email.value ||
            !pessoa.telefone.value
        ) {

            Swal.fire({
                icon: 'error',
                text: "Preencha todos os campos!!"
            })
            valid = false
        }

    }

    function validarEmail(email) {
        const emailRegex = /^[^@\s]+@[^@\s]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                text: "Email invalido!!"
            })
            valid = false
        }

    }

    function validarTelefone(telefone) {
        const apenasNumeros =  telefone.replace(/\D/g,'');
        console.log('tel tam', apenasNumeros.length)
        if (apenasNumeros.length !== 11) {
            Swal.fire({
                icon: 'error',
                text: "Telefone não está com todos os números!!"
            })
            valid = false
        }
    }

    useEffect(() => {
        if (onEdit) {
            const pessoa = ref.current;

            pessoa.nome.value = onEdit.nome;
            pessoa.email.value = onEdit.email;
            pessoa.telefone.value = onEdit.telefone;

            setAuxiliarTelefone(onEdit.telefone)
        }
    }, [onEdit]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const pessoa = ref.current;
        const camposValidos = isCamposValid(pessoa)

        if (camposValidos) {

            if (onEdit) {

                await apiurl
                    .put("" + onEdit.id, {
                        nome: pessoa.nome.value,
                        telefone: auxiliarTelefone,
                        email: pessoa.email.value
                    })
                    .then(({ data }) => console.log(data))
                    .catch(({ data }) => console.log(data))
            } else {
                await apiurl
                    .post("", {

                        nome: pessoa.nome.value,
                        telefone: pessoa.telefone.value,
                        email: pessoa.email.value
                    })
                    .then(({ data }) => {
                        console.log('criacao deu certo!!')
                        console.log(data)
                    })
                    .catch(({ data }) => console.log(data))
            }
        }
        pessoa.nome.value = '';
        pessoa.telefone.value = '';
        setAuxiliarTelefone('');
        pessoa.email.value = '';


        setOnEdit(null)
        getPessoas();
    }

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                {onEdit && <InputMask name="telefone" mask='(99)99999-9999' value={auxiliarTelefone}
                    onChange={(e) => (setAuxiliarTelefone(e.target.value))}
                    style={{
                        width: '120px',
                        padding: '0 10px',
                        border: '1px solid #bbb',
                        borderRadius: '5px',
                        height: '40px'
                    }} />}
                {!onEdit && <InputMask name="telefone" mask='(99)99999-9999'
                    style={{
                        width: '120px',
                        padding: '0 10px',
                        border: '1px solid #bbb',
                        borderRadius: '5px',
                        height: '40px'
                    }} />}
            </InputArea>
            <InputArea>
                <Label>Email</Label>
                <Input name="email" />
            </InputArea>
            <Button type='Submit'>Salvar</Button>
        </FormContainer>
    )
}

export default Form;