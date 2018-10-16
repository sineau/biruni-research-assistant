import React from 'react'
import { connect } from 'react-redux'

import { doToggleFolder, doFocusFolder } from '../store/actions'
import * as select from '../store/selectors'

import { StyledParent, StyledChild, StyledDropdown } from '../styles/sidebar-styled'
import { TreeStyled } from '../styles/app-styled'

export const RenderTreeDry = ({ tree }) => {
  /* in chrome bookmark node ids are numbers starting at zero */
  const root = tree ? (tree["root________"] || tree[0]) : null
  return(
    <TreeStyled>
      {root ? root.subfolders.map((t) => <RenderFolder key={t} id={t} />) : ""
      }
    </TreeStyled>
  )
}

const RenderFolderDry = ({ folder }) => {
  return folder ?
         folder.subfolders.length !== 0 ? <RenderParent folder={folder} />
       : <RenderChild folder={folder} />
       : ""
}

const folderStateToProps = (state, { id }) => ({
  folder: select.currentFolder(state, id)
})

const RenderFolder = connect(folderStateToProps)(RenderFolderDry)

const RenderParentDry = ({ onToggle, onFocus, folder, toggled }) => {
  let { id, subfolders: children } = folder
  let isToggled = toggled.indexOf(id) !== -1
  return(
    <StyledParent>
      <StyledDropdown onClick={() => onToggle(id)} toggled={isToggled} />
      <div onClick={() => onFocus(id)}
           id={id}
           className="folder-title">
        {folder.title}
      </div>
      {(isToggled) ?
       (<div>
         {children.map((i) => <RenderFolder key={i} id={i} />)}
       </div>) : ""
      }
    </StyledParent>
  )
}

const RenderChildDry =({ folder, onFocus }) =>  {
  const { id } = folder
  return(
    <StyledChild>
      <div id={id} onClick={() => onFocus(id)} >
        {folder.title}
      </div>
    </StyledChild>
  )
}

const TreeStateToProps = (state) => ({
  tree: select.allFolders(state)
})
const ParentStateToProps = (state) =>({
  toggled: select.toggleState(state)
})
const ParentDispatchToProps = (dispatch) => ({
  onToggle: id => dispatch(doToggleFolder(id)),
  onFocus: id => dispatch(doFocusFolder(id))
})
const ChildDispatchToProps = (dispatch) => ({
  onFocus: id => dispatch(doFocusFolder(id))
})

const RenderParent = connect(ParentStateToProps, ParentDispatchToProps)(RenderParentDry)
const RenderChild = connect(null, ChildDispatchToProps)(RenderChildDry)
const RenderTree = connect(TreeStateToProps)(RenderTreeDry)

export default RenderTree
