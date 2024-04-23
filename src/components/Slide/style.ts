import styled from "styled-components";

export const divHidden = styled.div`
    height: 300px;
    background-color: var(--laranjaPrincipal);
    display: flex;
    overflow: hidden;
`

export const divSlider = styled.div`
    height: 100%;
    display: flex;
`

export const divSlide = styled.div`
    height: 100%;
    width: var(--larguraFotoSlide);
`

export const imgSlide = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;    
`