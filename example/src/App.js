import React from 'react';
import './App.css';
import OrgChart from './orgChart';

function App() {
  const treeData = {
    name: 'John Doe',
    show_children: false,
    children: [
      {
        name: 'Joe Bloggs',
        show_children: false,
        children: [
          {
            name: 'Richard Roe',
            show_children: false
          }
        ]
      },
      {
        name: 'Jane Doe',
        show_children: false
      },
      {
        name: 'John Smith',
        show_children: false
      }
    ]
  };

  const expandCollapseChildrenNode = e => {
    const targetElement = e.target.parentNode.parentNode.offsetParent.lastChild;

    let classname = '';
    if (targetElement.className !== ' hidden') {
      classname = ' hidden';
    }

    return (targetElement.className = classname);
  };

  const MyNodeComponent = ({ node }) => {
    return (
      <div className="treeNode">
        {node.name}
        {node.children && <div onClick={expandCollapseChildrenNode}>Click</div>}
      </div>
    );
  };

  return (
    <div className="App" id="treeOrgChart">
      <OrgChart tree={treeData} NodeComponent={MyNodeComponent} />
    </div>
  );
}

export default App;
