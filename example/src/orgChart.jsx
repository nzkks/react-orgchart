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
    if (node.show_children === false) {
      extra_class = ' hidden';
    }

    const nodeLineBelow = (
      <td colSpan={(node.children || []).length * 2} className="nodeGroupCellLines">
        <table className="nodeLineTable" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td colSpan={2} className={'nodeLineCell nodeGroupLineVerticalMiddle'} />
              <td colSpan={2} className="nodeLineCell" />
            </tr>
          </tbody>
        </table>
      </td>
    );

    const childrenLinesAbove = (node.children || []).map((child, childIndex) => (
      <td colSpan="2" className="nodeGroupCellLines" key={childIndex}>
        <table className="nodeLineTable" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td
                colSpan={2}
                className={
                  'nodeLineCell nodeGroupLineVerticalMiddle ' + (hasSiblingLeft(childIndex) ? ' nodeLineBorderTop' : '')
                }
              />
              <td colSpan={2} className={'nodeLineCell ' + (hasSiblingRight(childIndex) ? ' nodeLineBorderTop' : '')} />
            </tr>
          </tbody>
        </table>
      </td>
    ));

    const children = (node.children || []).map((child, childIndex) => (
      <td colSpan="2" className="nodeGroupCell" key={childIndex}>
        {renderChildren(child)}
      </td>
    ));

    return (
      <table className="orgNodeChildGroup" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td className="nodeCell" colSpan={(node.children || []).length * 2}>
              <NodeComponent node={node} />
            </td>
          </tr>
        </tbody>
        <tbody className={extra_class}>
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
