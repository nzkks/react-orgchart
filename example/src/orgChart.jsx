import React from 'react';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';

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
      extra_class = ' hidden';
    }

    const nodeLineBelow = (
      <TableCell colSpan={(node.children || []).length * 2} className={'nodeGroupCellLines ' + extra_class}>
        <Table className={'nodeLineTable ' + extra_class}>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} className={'nodeLineCell nodeGroupLineVerticalMiddle ' + extra_class} />
              <TableCell colSpan={2} className={'nodeLineCell ' + extra_class} />
            </TableRow>
          </TableBody>
        </Table>
      </TableCell>
    );

    const childrenLinesAbove = (node.children || []).map((child, childIndex) => (
      <TableCell colSpan="2" className={'nodeGroupCellLines ' + extra_class} key={childIndex}>
        <Table className={'nodeLineTable ' + extra_class}>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={2}
                className={
                  'nodeLineCell nodeGroupLineVerticalMiddle ' +
                  extra_class +
                  (hasSiblingLeft(childIndex) ? ' nodeLineBorderTop' : '')
                }
              />
              <TableCell
                colSpan={2}
                className={'nodeLineCell ' + extra_class + (hasSiblingRight(childIndex) ? ' nodeLineBorderTop' : '')}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableCell>
    ));

    const children = (node.children || []).map((child, childIndex) => (
      <TableCell colSpan="2" className={'nodeGroupCell ' + extra_class} key={childIndex}>
        {renderChildren(child)}
      </TableCell>
    ));

    return (
      <Table className="orgNodeChildGroup">
        <TableBody>
          <TableRow>
            <TableCell className="nodeCell" colSpan={(node.children || []).length * 2}>
              <NodeComponent node={node} />
            </TableCell>
          </TableRow>
          <TableRow>{(node.children || []).length > 0 && nodeLineBelow}</TableRow>
          <TableRow>{childrenLinesAbove}</TableRow>
          <TableRow>{children}</TableRow>
        </TableBody>
      </Table>
    );
  };

  return <div className="reactOrgChart">{renderChildren(tree)}</div>;
};

export default OrgChart;
