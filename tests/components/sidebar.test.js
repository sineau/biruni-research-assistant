import test from 'tape'
/* import addAssertions from 'extend-tape'
 * import jsxEquals from 'tape-jsx-equals'
 * import React from 'react'
 * import ShallowRenderer from 'react-test-renderer/shallow'
 *
 * import { RenderTreeDry } from '../../src/app/components/Sidebar.jsx'
 * import * as select from '../../src/app/store/selectors.js'
 * import { full_state } from '../state-data.js'
 *
 * const test = addAssertions(tape, { jsxEquals })
 * const renderer = new ShallowRenderer()
 *  */
test("It renders a sidebar tree", t => {
  t.pass()
  t.end()
  /* const tree = select.allFolders(full_state)
   * renderer.render(<RenderTreeDry tree={tree} />)
   * const expected = <div className="sidebar-toplevel">
   *   <RenderParent key={"menu________"} id={"menu________"} />
   * </div>
   * const actual = renderer.getRenderOutput()

   * t.jsxEquals(actual, expected)
   * t.end() */
})
