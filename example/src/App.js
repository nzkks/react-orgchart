import React from 'react';
import './App.css';
import OrgChart from './orgChart';

function App() {
  const initechOrg = {
    name: 'Bill Lumbergh',
    show_children: false,
    children: [
      {
        name: 'Peter Gibbons',
        show_children: false,
        children: [
          {
            name: 'And More!!',
            show_children: false
          }
        ]
      },
      {
        name: 'Milton Waddams',
        show_children: false
      },
      {
        name: 'Bob Slydell',
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
      <div className="initechNode">
        {node.name}
        {node.children && <div onClick={expandCollapseChildrenNode}>Click</div>}
      </div>
    );
  };

  return (
    <div className="App" id="initechOrgChart">
      <OrgChart tree={initechOrg} NodeComponent={MyNodeComponent} />
    </div>
  );
}

export default App;
