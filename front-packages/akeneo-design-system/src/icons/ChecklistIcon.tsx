import React from 'react';
import {IconProps} from './IconProps';

const ChecklistIcon = ({title, size = 24, color = 'currentColor', ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
    {title && <title>{title}</title>}
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M9.48723 4.21967C9.78012 4.51256 9.78012 4.98744 9.48723 5.28033L6.0564 8.71115C5.37299 9.39457 4.26495 9.39457 3.58153 8.71115L2.21967 7.3493C1.92678 7.0564 1.92678 6.58153 2.21967 6.28864C2.51256 5.99574 2.98744 5.99574 3.28033 6.28864L4.64219 7.65049C4.73982 7.74812 4.89811 7.74813 4.99574 7.65049L8.42657 4.21967C8.71946 3.92678 9.19433 3.92678 9.48723 4.21967ZM12 6.68066C12 6.40452 12.2239 6.18066 12.5 6.18066H21.5C21.7761 6.18066 22 6.40452 22 6.68066C22 6.95681 21.7761 7.18066 21.5 7.18066H12.5C12.2239 7.18066 12 6.95681 12 6.68066ZM10 12.6807C10 12.4045 10.2239 12.1807 10.5 12.1807H21.5C21.7761 12.1807 22 12.4045 22 12.6807C22 12.9568 21.7761 13.1807 21.5 13.1807H10.5C10.2239 13.1807 10 12.9568 10 12.6807ZM10 18.6807C10 18.4045 10.2239 18.1807 10.5 18.1807H21.5C21.7761 18.1807 22 18.4045 22 18.6807C22 18.9568 21.7761 19.1807 21.5 19.1807H10.5C10.2239 19.1807 10 18.9568 10 18.6807ZM6.47409 18.681C6.47409 17.9954 5.91831 17.4396 5.23271 17.4396C4.54712 17.4396 3.99133 17.9954 3.99133 18.681C3.99133 19.3666 4.54712 19.9224 5.23271 19.9224C5.91831 19.9224 6.47409 19.3666 6.47409 18.681ZM6.47409 12.6807C6.47409 11.9951 5.91831 11.4393 5.23271 11.4393C4.54712 11.4393 3.99133 11.9951 3.99133 12.6807C3.99133 13.3663 4.54712 13.922 5.23271 13.922C5.91831 13.922 6.47409 13.3663 6.47409 12.6807Z"
        stroke={color}
      />
    </g>
  </svg>
);

export {ChecklistIcon};
