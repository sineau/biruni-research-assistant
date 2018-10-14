import styled from 'styled-components'


const ItemStyled = styled.div`
  width: 70%;
  border: 4px solid #efefef;
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 10px 20px;
  .item-title {
  font-size: 1.8rem;
  padding-bottom: 5px;
  }
  .item-url {
  font-size: 1.2rem;
  padding-bottom: 10px;
  a {
  color: #444;
  }
  }
`
const ItemButton = styled.div`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2rem;
  border: 4px solid #1f1f1f;
  border-radius: 6px;
  cursor: pointer;

`

export { ItemStyled, ItemButton }
