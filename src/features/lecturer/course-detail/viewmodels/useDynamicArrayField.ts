import { useEffect, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@app/stores';
import {
  setDynamicArrayItems,
  addDynamicArrayItem,
  removeDynamicArrayItem,
  updateDynamicArrayItem,
} from '../slices';

interface UseDynamicArrayFieldProps {
  fieldName: string;
  initialValues?: string[];  // Initial values to set
  onValueChange?: (values: string[]) => void;  // Callback to notify the parent about updates
  notifyIsValid?: (isValid: boolean) => void;  // Notify parent of validation state
}

const useDynamicArrayField = ({
  fieldName,
  initialValues = [],
  onValueChange,
  notifyIsValid,
}: UseDynamicArrayFieldProps) => {
  const dispatch = useAppDispatch();
  
  // Select the field state from Redux
  const field = useAppSelector(
    (state) => state.courseDetailLecture.dynamicArrayFields[fieldName]
  );

  // Store initialValues in a ref to avoid re-initialization
  const initialValuesRef = useRef(initialValues);

  // First effect: Initialize the dynamic array field only when it is undefined
  useEffect(() => {
    // Only dispatch to set initial values if the field is undefined
    if (field === undefined && initialValuesRef.current.length > 0) {
      dispatch(setDynamicArrayItems({ fieldName, items: initialValuesRef.current }));
    }
  }, [dispatch, fieldName, field]);  // Ensure effect is tied to fieldName and field state

  // Second effect: Notify parent on changes to field items or validation state
  useEffect(() => {
    if (field) {
      onValueChange?.(field.items);
      notifyIsValid?.(field.isValid);
    }
  }, [field?.items, field?.isValid, onValueChange, notifyIsValid]); // Optimized dependencies

  // Memoized handlers to avoid re-renders
  const handleInputChange = useCallback((index: number, value: string) => {
    dispatch(updateDynamicArrayItem({ fieldName, index, value }));
  }, [dispatch, fieldName]);

  const addItem = useCallback(() => {
    dispatch(addDynamicArrayItem(fieldName));
  }, [dispatch, fieldName]);

  const removeItem = useCallback((index: number) => {
    dispatch(removeDynamicArrayItem({ fieldName, index }));
  }, [dispatch, fieldName]);

  return {
    items: field?.items || [],
    errors: field?.errors || [],
    isValid: field?.isValid || false,
    handleInputChange,
    addItem,
    removeItem,
  };
};

export default useDynamicArrayField;