import React, { ChangeEvent } from 'react';
import { Pagination } from '@mui/material';
import './CoursesPagination.scss';
import SearchRequest from '@app/common/models/SearchRequest';

interface CoursesPaginationProps {
  totalPages: number;
  pageOption: SearchRequest;
  onChange: (event: ChangeEvent<unknown>, page: number) => void;
}

const CoursesPagination: React.FC<CoursesPaginationProps> = ({ totalPages, pageOption, onChange }) => {


  return (
    <div className="courses-pagination">
      <Pagination 
        page={pageOption.page}   // Set the current page
        onChange={onChange} 
        count={totalPages} 
        color="primary" 
      />
    </div>
  );
};


export default CoursesPagination;