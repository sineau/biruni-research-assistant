import styled from 'styled-components'

const Folder = styled.div`
  font-size: 1.4rem;
  line-height: 3;
  border-bottom: 1px solid #fff;
  padding-left: 10px;
  cursor: pointer;
`
const StyledParent = styled(Folder)`

.folder-title{
display: inline-block
}
`
const StyledChild = styled(Folder)`
background-color: ${props => props.focused ? '#3f3f3f' : '#fff'};
color: #6c6c6c;
`
const StyledDropdown = styled.span`
  &:before {
  display: inline-block;
  transform: ${props => props.toggled ? "rotate(90deg)" : "rotate(0)"};
  content: ">";
  }
  }
`

export { StyledParent, StyledChild, StyledDropdown }
