import React from 'react';

const OrgChart = ({ tree, NodeComponent }) => {
  const renderChildren = node => {
    const hasSiblingRight = childIndex => {
      return (node.children || []).length > childIndex + 1;
    };

    const hasSiblingLeft = childIndex => {
      return childIndex > 0;
    };

    let extra_class = '';
    if (node.hide_children === true) {
      debugger;
      extra_class = ' hidden';
    }

    const nodeLineBelow = (
      <td colSpan={(node.children || []).length * 2} className={'nodeGroupCellLines ' + extra_class}>
        <table className={'nodeLineTable ' + extra_class}>
          <tbody>
            <tr>
              <td colSpan={2} className={'nodeLineCell nodeGroupLineVerticalMiddle ' + extra_class} />
              <td colSpan={2} className={'nodeLineCell ' + extra_class} />
            </tr>
          </tbody>
        </table>
      </td>
    );

    const childrenLinesAbove = (node.children || []).map((child, childIndex) => (
      <td colSpan="2" className={'nodeGroupCellLines ' + extra_class} key={childIndex}>
        <table className={'nodeLineTable ' + extra_class}>
          <tbody>
            <tr>
              <td
                colSpan={2}
                className={
                  'nodeLineCell nodeGroupLineVerticalMiddle ' +
                  extra_class +
                  (hasSiblingLeft(childIndex) ? ' nodeLineBorderTop' : '')
                }
              />
              <td
                colSpan={2}
                className={'nodeLineCell ' + extra_class + (hasSiblingRight(childIndex) ? ' nodeLineBorderTop' : '')}
              />
            </tr>
          </tbody>
        </table>
      </td>
    ));

    const children = (node.children || []).map((child, childIndex) => (
      <td colSpan="2" className={'nodeGroupCell ' + extra_class} key={childIndex}>
        {renderChildren(child)}
      </td>
    ));

    return (
      <table className="orgNodeChildGroup">
        <tbody>
          <tr>
            <td className="nodeCell" colSpan={(node.children || []).length * 2}>
              <NodeComponent node={node} />
            </td>
          </tr>
          <tr>{(node.children || []).length > 0 && nodeLineBelow}</tr>
          <tr>{childrenLinesAbove}</tr>
          <tr>{children}</tr>
        </tbody>
      </table>
    );
  };

  return <div className="reactOrgChart">{renderChildren(tree)}</div>;
};

export default OrgChart;
