export interface TransactionData {
    id: number;
    total_amount: number;
    final_amount: number;
    description: string;
    transaction_code: string;
    transaction_date: string;
    status: string;
    transactionLineItem: TransactionLineItem[];
  }
  
  export interface TransactionLineItem {
    id: number;
    purchase_price: number;
    transaction_id: number;
    course_mentor_id: number;
    course_mentor: CourseMentor;
  }
  
  export interface CourseMentor {
    id: number;
    title: string;
    image: string;
    amount: number;
    status: string;
    start_date: string;
    end_date: string;
  }
  