import styled from 'styled-components';

export const Box = styled.div`


position: relative;
bottom: 0;
width: 100%;


@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
    width:100%;
    height:400px;
	background: black;
`

export const Container1 = styled.div`
	display: flex;
	flex-direction: column;
	width:100%;
    height:300px;
	 background: #ecf0f1; 
`


export const Container2 = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
    width:100%;
    height:300px;
	//  background: yellow; 
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
width:300px;
margin-left:70%;
margin-top:10px;
font-Size:20px;

`;

export const Row = styled.div`
display: grid;
width:100%;    
grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));
grid-gap: -200px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: #fff;
margin-bottom: 20px;
font-size: 18px;
text-decoration: none;

&:hover {
	color: green;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 24px;
color: #fff;
margin-bottom: 40px;
font-weight: bold;
`;
export const img=styled.div`
width:20;
height:20;
`;