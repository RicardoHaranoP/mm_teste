
import styled from 'styled-components'

const ContainerHeader = styled.header`
    background-color: #ea4234;
    height: 14vh;
    width: 100vw;
    display: flex;
    margin-bottom: 30px;
    justify-content: center;
`

const TituloHeader = styled.div`
    display: flex;
    font-size: 30px;
    margin-left: 10px;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
    color: white;
`

const MM = styled.strong`
    color: black;
`

const Header = () => {
    return (
        <ContainerHeader>
            <TituloHeader>
                <p>Time <MM>MM</MM>Tech</p>
            </TituloHeader>
        </ContainerHeader>
    )
}

export default Header;