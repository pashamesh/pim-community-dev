import React, {ReactNode, Ref, SyntheticEvent, HTMLAttributes, forwardRef, useContext, useState} from 'react';
import styled, {css} from 'styled-components';
import {AkeneoThemedProps, getColor} from '../../../theme';
import {Checkbox} from '../../../components';
import {Override} from '../../../shared';
import {TableContext} from '../TableContext';
import {TableCell} from '../TableCell/TableCell';
import {RowIcon} from 'icons';
import {useBooleanState} from 'hooks';

type TableRowProps = Override<
  HTMLAttributes<HTMLTableRowElement>,
  {
    /**
     * Content of the row
     */
    children?: ReactNode;

    /**
     * Function called when the user clicks on the row checkbox, required when table is selectable
     */
    onSelectToggle?: (isSelected: boolean) => void;

    /**
     * Define if the row is selected, required when table is selectable
     */
    isSelected?: boolean;

    /**
     * Function called when the user clicks on the row
     */
    onClick?: (event: SyntheticEvent) => void;
  } & {
    /**
     * @private
     */
    'data-draggable-index': number;

    /**
     * @private
     */
    canBeDraggedOver: boolean;
  }
>;

const RowContainer = styled.tr<{isSelected: boolean; isClickable: boolean; isDraggedOver: boolean} & AkeneoThemedProps>`
  ${({isSelected}) =>
    isSelected &&
    css`
      > td {
        background-color: ${getColor('blue', 20)};
      }
    `};

  ${({isClickable}) =>
    isClickable &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}

  ${({isDraggedOver}) =>
    isDraggedOver &&
    css`
      border-bottom: 2px solid red;
    `}

  &:hover > td {
    opacity: 1;
    ${({isClickable}) =>
      isClickable &&
      css`
        background-color: ${getColor('grey', 20)};
      `}
  }

  &:hover > td > div {
    opacity: 1;
  }
`;

const CheckboxContainer = styled.td<{isVisible: boolean}>`
  background: none !important;
  opacity: ${({isVisible}) => (isVisible ? 1 : 0)};
  cursor: auto;

  > div {
    justify-content: center;
  }
`;

const HandleContainer = styled.div`
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;

  :active {
    cursor: grabbing;
  }
`;

const useDragOver = () => {
  const [overingCount, setOveringCount] = useState(0);

  return [
    overingCount > 0,
    () => {
      setOveringCount(count => count + 1);
    },
    () => {
      setOveringCount(count => count - 1);
    },
    () => {
      setOveringCount(0);
    },
  ] as const;
};

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {isSelected, canBeDraggedOver, onSelectToggle, onClick, children, ...rest}: TableRowProps,
    forwardedRef: Ref<HTMLTableRowElement>
  ) => {
    const [isDragged, drag, drop] = useBooleanState();
    const [isDraggedOver, dragEnter, dragLeave, dragEnd] = useDragOver();

    const {isSelectable, displayCheckbox, isOrderable} = useContext(TableContext);
    if (isSelectable && (undefined === isSelected || undefined === onSelectToggle)) {
      throw Error('A row in a selectable table should have the prop "isSelected" and "onSelectToggle"');
    }

    const handleCheckboxChange = (e: SyntheticEvent) => {
      e.stopPropagation();
      undefined !== onSelectToggle && onSelectToggle(!isSelected);
    };

    return (
      <RowContainer
        ref={forwardedRef}
        isClickable={undefined !== onClick}
        isSelected={!!isSelected}
        onClick={onClick}
        isDraggedOver={isDraggedOver}
        draggable={isOrderable && isDragged}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDragEnd={() => {
          drop();
          dragEnd();
        }}
        {...rest}
      >
        {isSelectable && (
          <CheckboxContainer
            aria-hidden={!displayCheckbox && !isSelected}
            isVisible={displayCheckbox || !!isSelected}
            onClick={handleCheckboxChange}
          >
            <Checkbox
              checked={!!isSelected}
              onChange={(_value, e) => {
                handleCheckboxChange(e);
              }}
            />
          </CheckboxContainer>
        )}
        {isOrderable && (
          <TableCell onMouseDown={drag} onMouseUp={drop}>
            <HandleContainer>
              <RowIcon size={16} />
            </HandleContainer>
          </TableCell>
        )}
        {children}
      </RowContainer>
    );
  }
);

export {TableRow};
export type {TableRowProps};
